<template>
	<view>
		<view class="btncontainer">
			<view class="btnitem" v-if="isaudit" @click="audit_repairbill">
				<uni-icons type="checkbox" color="#007AFF"></uni-icons>审核
			</view>
			<view class="btnitem" v-if="isdeal" @click="deal_repairbill">
				<uni-icons type="compose" color="#007AFF"></uni-icons>处理
			</view>
			<view class="btnitem" v-if="isdealover" @click="dealover_repairbill">
				<uni-icons type="checkmarkempty" color="#007AFF"></uni-icons>完工
			</view>
			<view class="btnitem" v-if="ischeck" @click="check_repairbill">
				<uni-icons type="checkbox" color="#007AFF"></uni-icons>验收
			</view>
			<view class="btnitem" v-if="issend" @click="send_repairbill">
				<uni-icons type="paperplane" color="#007AFF"></uni-icons>派单
			</view>
			<view class="btnitem" @click="view_repair_detail">
				<uni-icons type="info" color="#007AFF"></uni-icons>详情
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import repairfn from '../../api/repair/index.js'
	export default {
		components: {
			"uni-icons": uniIcons
		},
		props: {
			repairid: {
				type: Number
			},
			status:{
				type:String
			}
		},
		data() {
			return {
				funlist:[],
				user:{},
				stepinfo:{}
			};
		},
		computed: {
			isaudit(){
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'audit';
				});
				if (this.status === '01' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			},
			ischeck(){
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'check';
				});
				if (this.status === '02' && funcode.length>0 && this.stepinfo.currentstep === this.stepinfo.totalstep && this.stepinfo.isover === 0 ) {
					return true;
				}else{
					return false;
				}
			},
			isdeal() {
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'dealwith';
				});
				if (this.status === '02' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			},
			isdealover(){
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'dealover';
				});
				if (this.status === '02' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			},
			issend() {
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'sendbill';
				});
				if (this.status === '01' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			}
		},
		mounted() {
			const userinfo = uni.getStorageSync('userinfo');
			this.funlist = userinfo.funs;
			this.getcurrentstepno();
		},
		methods: {
			getcurrentstepno(){
				repairfn.billstepno({billid:this.repairid}).then(res=>{
					console.log(res);
					this.stepinfo = res.data.stepinfo;
				});
			},
			audit_repairbill(){
				this.$emit('audit');
			},
			deal_repairbill() {
				this.$emit('deal');
			},
			dealover_repairbill(){
				this.$emit('dealover');
			},
			check_repairbill()
			{
				this.$emit('check');
			},
			send_repairbill() {
				this.$emit('sendbill');
			},
			view_repair_detail() {
				this.$emit('viewdetail');
			}
		}
	}
</script>

<style scoped>
	.btncontainer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 50rpx auto 30rpx auto;
		flex-wrap: nowrap;
	}

	.btnitem {
		font-size: 13px;
		color: #007AFF;
	}
</style>
