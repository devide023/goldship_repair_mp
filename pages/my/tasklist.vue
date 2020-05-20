<template>
	<view>
		<repair-item v-for="item in list" :key="item.id" :repairitem="item">
			<template #buttons>
				<repair-btns :repairitem="item" @audit="audithandle" @sendbill="sendbillhandle"></repair-btns>
			</template>
		</repair-item>
	</view>
</template>

<script>
	import RepairFn from '../../api/repair/index.js';
	import ProcessFn from '../../api/process/index.js';
	import repairitem from '../../components/repair-item/repairitem.vue';
	import repairbtns from '../../components/repair-button/repair-button.vue';
	export default {
		components: {
			"repair-item": repairitem,
			"repair-btns": repairbtns
		},
		data() {
			return {
				form: {
					pagesize: 15,
				},
				list: []
			}
		},
		onShow() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepairFn.mytasklist(this.form).then(res => {
					this.list = res.data.result.data;
				});
			},
			agree(repairitem) {
				const that = this;
				ProcessFn.bill_next({
					billid: repairitem.id
				}).then(res => {
					uni.showToast({
						title:res.data.msg
					});
					if(res.data.code === 1){
						that.getlist();
					}
				});
			},
			disgree(repairitem) {
				const that = this;
				ProcessFn.disgreebill({
					billid:repairitem.id
				}).then(res=>{
					uni.showToast({
						title:res.data.msg
					});
					if(res.data.code === 1){
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
			sendbillhandle(repairitem){
				uni.navigateTo({
					url:'/pages/repair/send_bill?id='+repairitem.id
				});
			}
		},
	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}
</style>
