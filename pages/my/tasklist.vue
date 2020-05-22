<template>
	<view>
		<repair-item v-for="item in list" :key="item.id" :repairitem="item">
			<template #buttons>
				<repair-btns :repairid="item.id" :status="item.status" @audit="audithandle(item.id)" @send="sendbillhandle(item.id)" @deal="dealhandle(item.id)"
				 @dealover="dealoverhandle(item.id)" @check="checkhandle(item.id)" @viewdetail="viewdetailhandle(item.id)"></repair-btns>
			</template>
		</repair-item>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import RepairFn from '../../api/repair/index.js';
	import ProcessFn from '../../api/process/index.js';
	import repairitem from '../../components/repair-item/repairitem.vue';
	import repairbtns from '../../components/repair-button/repair-button.vue';
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			"repair-item": repairitem,
			"repair-btns": repairbtns,
			'uni-load-more': uniLoadMore
		},
		data() {
			return {
				more: 'loading',
				form: {
					page: 1,
					pagesize: 15,
				},
				list: [],
				total: 0,
				lastpage: 0
			}
		},
		onShow() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepairFn.mytasklist(this.form).then(res => {
					this.list = res.data.result.data;
					this.form.page = 1;
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
					this.more = 'nomore';
				});
			},
			agree(id) {
				const that = this;
				ProcessFn.bill_next({
					billid: id
				}).then(res => {
					uni.showToast({
						title: res.data.msg
					});
					if (res.data.code === 1) {
						that.getlist();
					}
				});
			},
			disgree(id) {
				const that = this;
				ProcessFn.disgreebill({
					billid: id
				}).then(res => {
					uni.showToast({
						title: res.data.msg
					});
					if (res.data.code === 1) {
						that.getlist();
					}
				});
			},
			audithandle(id) {
				const that = this;
				uni.showActionSheet({
					itemList: [
						'同意',
						'拒绝'
					],
					success: function(res) {
						const index = res.tapIndex;
						switch (index) {
							case 0:
								that.agree(id);
								break;
							case 1:
								that.disgree(id);
								break;
							default:
								break;
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			sendbillhandle(id) {
				uni.navigateTo({
					url: '/pages/repair/send_bill?id=' + id
				});
			},
			dealhandle(id) {
				uni.navigateTo({
					url: '/pages/repair/deal_detail?id=' + id
				})
			},
			dealoverhandle(id) {
				const that = this;
				uni.showModal({
					title: '提示',
					content: '你确定要完工该任务?',
					success(result) {
						if (result.confirm) {
							RepairFn.dealoverbill({
								billid: id
							}).then(res => {
								uni.showToast({
									title: res.data.msg,
									duration: 3000
								});
								if (res.data.code === 1) {
									that.getlist();
								}
							});
						}
					}
				});
			},
			checkhandle(id) {
				const that = this;
				uni.showModal({
					title: '提示',
					content: '你确定要验收该项目?',
					success(result) {
						if (result.confirm) {
							RepairFn.checkrepair({
								billid: id
							}).then(res => {
								uni.showToast({
									title: res.data.msg,
									duration: 3000
								});
								if (res.data.code === 1) {
									that.getlist();
								}
							});
						}
					}
				});
			},
			viewdetailhandle(id) {
				uni.navigateTo({
					url: '/pages/repair/repair_detail?id=' + id
				});
			}
		},
		onPullDownRefresh() {
			this.form.page = 1;
			this.getlist();
		},
		onReachBottom() {
			this.form.page++;
			if (this.form.page <= this.lastpage) {
				this.more = 'loading';
				RepairFn.mytasklist(this.form).then(res => {
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
</style>
