<template>
	<view>
		<repair-item v-for="item in list" :key="item.id" :repairitem="item">
			<template #buttons>
				<repair-btns :repairitem="item" @audit="audithandle" @sendbill="sendbillhandle" @deal="dealhandle" @check="checkhandle"></repair-btns>
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
				more:'',
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
				});
			},
			agree(repairitem) {
				const that = this;
				ProcessFn.bill_next({
					billid: repairitem.id
				}).then(res => {
					uni.showToast({
						title: res.data.msg
					});
					if (res.data.code === 1) {
						that.getlist();
					}
				});
			},
			disgree(repairitem) {
				const that = this;
				ProcessFn.disgreebill({
					billid: repairitem.id
				}).then(res => {
					uni.showToast({
						title: res.data.msg
					});
					if (res.data.code === 1) {
						that.getlist();
					}
				});
			},
			audithandle(repairitem) {
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
								that.agree(repairitem);
								break;
							case 1:
								that.disgree(repairitem);
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
			sendbillhandle(repairitem) {
				uni.navigateTo({
					url: '/pages/repair/send_bill?id=' + repairitem.id
				});
			},
			dealhandle(repairitem) {
				uni.navigateTo({
					url: '/pages/repair/deal_detail?id=' + repairitem.id
				})
			},
			checkhandle(repairitem) {
				RepairFn.checkrepair({
					billid: repairitem.id
				}).then(res => {
					uni.showToast({
						title: res.data.msg,
						duration: 3000
					});
					if (res.data.code === 1) {
						this.getlist();
					}
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
