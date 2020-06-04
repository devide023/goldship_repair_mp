<template>
	<view class="container">
		<split-bar>
			<template #title>报修流程</template>
		</split-bar>
		<uni-steps :options="options" :active="active_stepno" activeColor="#005500"></uni-steps>
		<split-bar>
			<template #title>报修信息</template>
		</split-bar>
		<repair-baseinfo :repairentity="repairinfo">
			<template #repairimg>
				<previewimg :imglist="imglist" v-if="imglist.length>0"></previewimg>
			</template>
		</repair-baseinfo>
		<split-bar>
			<template #title>维修详情</template>
		</split-bar>
		<dealitem v-for="item in repairinfo.details" :key="item.id" :detailitem="item"></dealitem>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue';
	import splitbar from '../../components/split-bar/split-bar.vue';
	import repairbaseinfo from '../../components/repair-base-info/repair-base-info.vue';
	import previewimg from '../../components/previewimages/previewimages.vue';
	import dealitem from '../../components/repair-detail-item/dealitem.vue';
	import processfn from '../../api/process/index.js';
	import RepairFn from '../../api/repair/index.js';
	import util from '../../utils/index.js';
	export default {
		components: {
			"uni-steps":uniSteps,
			"split-bar":splitbar,
			"repair-baseinfo":repairbaseinfo,
			"previewimg":previewimg,
			"dealitem":dealitem
			},
			data() {
				return {
					repairid:0,
					active_stepno:0,
					imglist:[],
					options: [],
					repairinfo:{}
				}
			},
			onLoad(e) {
				this.repairid = parseInt(e.id);
				this.initprocessstep();
				this.get_current_setp();
				this.get_repair_info();
			},
			methods: {
				initprocessstep(){
					processfn.process_steps({
						processid:1
					}).then(res=>{
						this.options = res.data.result.map(function(i){
							return {
								title:'第'+i.stepno+'步',
								desc:i.stepname
							}
						});
					});
				},
				get_repair_info(){
					RepairFn.repairinfo({
						id:this.repairid
					}).then(res=>{
						this.repairinfo = res.data.result;
						this.imglist = res.data.result.images.map(function(i){
							return util.rooturl + 'repair/' + i.filename;
						});
					});
				},
				get_current_setp(){
					RepairFn.billstepno({
						billid:this.repairid
					}).then(res=>{
						this.active_stepno = res.data.stepinfo.currentstep-1;
					});
				},
				setrepairinfo() {
					
				}
			},
	}
</script>

<style>
	page{
		background-color: #F3F3F3;
		width: 98%;
		margin: 0rpx auto;
	}
</style>
