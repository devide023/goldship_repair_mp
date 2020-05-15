<template>
	<view>
		<repair-item v-for="item in list" :key="item.id" :repairitem="item" @dealrepair="dealhandle" @repairdetail="detailhandle"></repair-item>
	</view>
</template>

<script>
	import RepairFn from '../../api/repair/index.js'
	import repairitem from '../../components/repair-item/repairitem.vue'
	export default {
		components: {
			'repair-item':repairitem
		},
		data() {
			return {
				userinfo:{},
				list: [],
				pageindex:1,
				total:0,
				lastpage:0
			}
		},
		mounted() {
			this.init();
			this.getlist();
		},
		onPullDownRefresh() {
			this.getlist();
		},
		methods: {
			getlist() {
				RepairFn.list({
					pagesize:15,
					dealuserid:this.userinfo.id
				}).then(res=>{
					this.list = res.data.result.data;
					this.pageindex = 1;
					this.total = res.data.result.total;
					this.lastpage = res.data.result.last_page;
				})
			},
			init(){
				const userinfo = uni.getStorageSync('userinfo');
				this.userinfo = userinfo;
			},
			dealhandle(data){
				uni.navigateTo({
					url:'/pages/repair/deal_detail?id='+data.id,
				})
			},
			detailhandle(data){
				uni.navigateTo({
					url:'/pages/repair/detail_info?id='+data.id,
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