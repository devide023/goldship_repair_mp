<template>
	<view>
		<repair-item v-for="item in list" :repairitem="item" :key="item.id">
			<template #buttons>
				<view-detail :repairid="item.id"></view-detail>
			</template>
		</repair-item>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import RepairFn from '../../api/repair/index.js'
	import repairitem from '../../components/repair-item/repairitem.vue'
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	import viewdetail from '../../components/view-detail/view-detail.vue'
	export default {
		components: {
			'repair-item': repairitem,
			"uni-load-more": uniLoadMore,
			"view-detail":viewdetail
		},
		data() {
			return {
				more: 'loading',
				queryform: {
					page: 1,
					pagesize: 15
				},
				list: [],
				total: 0,
				lastpage: 0
			}
		},
		mounted() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepairFn.myrepairlist(this.queryform).then(res => {
					this.queryform.page = 1;
					this.list = res.data.result.data;
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
					this.more = 'nomore';
					uni.stopPullDownRefresh();
				})
			}
		},
		onPullDownRefresh() {
			this.queryform.page = 1;
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
		background-color: #f3f3f3;
	}
</style>
