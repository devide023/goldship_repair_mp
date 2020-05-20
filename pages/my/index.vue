<template>
	<view>
		<repair-item v-for="item in list" :repairitem="item" :key="item.id"></repair-item>
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
				form:{
					pagesize:15
				},
				list:[]
			}
		},
		mounted() {
			this.getlist();
		},
		methods: {
			getlist(){
				RepairFn.myrepairlist(this.form).then(res=>{
					this.list = res.data.result.data;
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
</style>
