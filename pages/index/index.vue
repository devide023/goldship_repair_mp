<template>
	<view class="container">
		<uni-grid :column="4" :showBorder="false" @change="selectitem">
		    <uni-grid-item v-for="(item,index) in menulist" :index="index" :key="item.id">
		        <uni-icons :type="item.icon" :size="item.size" :color="item.color"></uni-icons>
				<view :style="{color: item.color,fontSize: item.fontsize}">{{item.name}}</view>
		    </uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import UserFn from '../../api/user/index.js'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			"uni-grid":uniGrid,
			"uni-grid-item":uniGridItem,
			"uni-icons":uniIcons
		},
		data() {
			return {
				menulist:[]
			}
		},
		mounted() {
			this.getlist();
		},
		onLoad() {
			UserFn.userinfo().then(res => {
				uni.hideLoading();
				let  result = res;
				console.log(result);
				if (result.data.code === 1) {
					uni.setStorageSync('userinfo',result.data.result);
				}
			});
		},
		methods: {
			getlist(){
				UserFn.usermenus().then(res=>{
					this.menulist = res.data.result;
				})
			},
			selectitem(e){
				const index = e.detail.index;
				let path = this.menulist[index].pagepath;
				console.log(path);
				uni.navigateTo({
					url:path
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		padding: 0rpx 10rpx;
		margin: 10rpx auto;
	}
	.uni-grid-item{
		text-align: center;
		align-items: center;
	}
</style>
