<template>
	<view>
		<repair-item v-for="item in list" :key="item.id" :repairitem="item">
			<template #buttons>
				<view class="btnitem" @click="view_repair_detail(item.id)">
					<uni-icons type="info" color="#007AFF"></uni-icons>详情
				</view>
			</template>
		</repair-item>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import RepairItem from '../../components/repair-item/repairitem.vue'
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	import RepairFn from '../../api/repair/index.js'
	export default {
		components: {
			'repair-item': RepairItem,
			'uni-load-more': uniLoadMore
		},
		data() {
			return {
				more: '',
				list: [],
				queryform: {
					page: 1,
					pagesize: 15
				},
				total: 0,
				lastpage: 0
			}
		},
		mounted() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepairFn.orgrepairlist(this.queryform).then(res => {
					this.queryform.page = 1;
					this.list = res.data.result.data;
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
				});
			},
			view_repair_detail(billid){
				uni.navigateTo({
					url:'/pages/repair/repair_detail?id='+billid
				});
			}
		},
		onPullDownRefresh() {
			this.queryform.page=1;
			this.getlist();
		},
		onReachBottom() {
			this.queryform.page++;
			if (this.queryform.page <= this.lastpage) {
				this.more = 'loading';
				RepairFn.orgrepairlist(this.queryform).then(res => {
					this.list.push(...res.data.result.data);
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
				});
			} else {
				this.more = 'noMore';
				uni.stopPullDownRefresh();
			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}
	/*.btncontainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 50rpx auto 30rpx auto;
		flex-wrap: nowrap;
	}*/
	
	.btnitem {
		font-size: 13px;
		color: #007AFF;
		text-align: center;
	}
</style>
