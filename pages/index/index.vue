<template>
	<view class="container">
		<uni-grid :column="4" :showBorder="false" @change="selectitem">
			<uni-grid-item v-for="(item,index) in menulist" :index="index" :key="item.id">
				<uni-icons :type="item.icon" :size="item.size" :color="item.color"></uni-icons>
				<view :style="{color: item.color,fontSize: item.fontsize}">{{item.name}}</view>
				<view class="grid-dot" v-if="item.taskcnt>0">
					<uni-badge :text="item.taskcnt" type="error" size="small"></uni-badge>
				</view>
			</uni-grid-item>
			<uni-grid-item v-for="(item,index) in closemenu" :index="totalcnt-(index+1)" :key="item.id">
				<uni-icons :type="item.icon" :size="item.size" :color="item.color"></uni-icons>
				<navigator open-type="exit" target="miniProgram" :style="{color: item.color,fontSize: item.fontsize}">{{item.name}}</navigator>
			</uni-grid-item>
		</uni-grid>

		<view class="nomenus" v-if="totalcnt===0">
			<text>{{tip}}</text>
		</view>

	</view>
</template>

<script>
	import UserFn from '../../api/user/index.js'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import unibadge from '../../components/uni-badge/uni-badge.vue';
	export default {
		components: {
			"uni-grid": uniGrid,
			"uni-grid-item": uniGridItem,
			"uni-icons": uniIcons,
			'uni-badge':unibadge
		},
		data() {
			return {
				tip:'',
				totalcnt: 0,
				menulist: [],
				closemenu: []
			}
		},
		mounted() {
			this.getlist();
		},
		onLoad() {
			UserFn.userinfo().then(res => {
				if (res.data.code === 1) {
					uni.setStorageSync('userinfo', res.data.result);
				}
			});
		},
		methods: {
			getlist() {
				UserFn.usermenus().then(res => {
					this.totalcnt = res.data.result.length;
					if(this.totalcnt === 0){
						this.tip='暂未分配菜单，请联系管理员开通';
					}
					this.menulist = res.data.result.filter(function(i) {
						return i.pagepath !== '#';
					});
					this.closemenu = res.data.result.filter(function(i) {
						return i.pagepath === '#';
					});
				})
			},
			selectitem(e) {
				const index = e.detail.index;
				if (index !== this.totalcnt - 1) {
					let path = this.menulist[index].pagepath;
					console.log(path);
					uni.navigateTo({
						url: path
					})
				} else {
					//退出
					uni.clearStorageSync('userinfo');
					uni.clearStorageSync('token');
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>

<style>
	.container {
		padding: 0rpx 10rpx;
		margin: 10rpx auto;
	}

	.uni-grid-item {
		text-align: center;
		align-items: center;
	}

	.nomenus {
		color: #ff0206;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
	}
	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
</style>
