<template>
	<view class="container">
		<deal-item v-for="item in list" :key="item.id" :detailitem="item"></deal-item>
	</view>
</template>

<script>
	import dealitem from '../../components/repair-detail-item/dealitem.vue'
	import RepaireFn from '../../api/repair/index.js'
	export default {
		components: {
			"deal-item":dealitem
		},
		data() {
			return {
				repairid:0,
				list: []
			}
		},
		mounted() {
			this.getlist();
		},
		onLoad(e) {
			console.log(e);
			this.repairid = e.id;
		},
		onPullDownRefresh() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepaireFn.repairinfo_list({
					repairid:this.repairid,
					pagesize:15
				}).then(res=>{
					this.list = res.data.result.data;
				});
			}
		},
	}
</script>

<style>
	page {
		background-color: #f3f3f3;
	}
</style>
