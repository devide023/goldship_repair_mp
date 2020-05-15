<template>
	<view>
		<list-card v-for="item in list" :key="item.id" :cardinfo="item"></list-card>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import cardlist from '../../components/list-card/list-card.vue'
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	import RepairFn from '../../api/repair/index.js'
	export default {
		components: {
			'list-card': cardlist,
			'uni-load-more': uniLoadMore
		},
		data() {
			return {
				more: 'more',
				list: [],
				queryform: {
					pageindex: 1,
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
				RepairFn.list(this.queryform).then(res => {
					this.queryform.pageindex = 1;
					this.list = res.data.result.data;
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
				});
			}
		},
		onLoad() {},
		onReachBottom() {
			this.queryform.pageindex++;
			if (this.queryform.pageindex <= this.lastpage) {
				this.more = 'loading';
				RepairFn.list(this.queryform).then(res => {
					this.list.push(res.data.result.data);
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
