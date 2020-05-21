<template>
	<view>
		<view class="btncontainer">
			<view class="btnitem" v-if="isaudit" @click="audit_repairbill">
				<uni-icons type="checkbox" color="#007AFF"></uni-icons>审核
			</view>
			<view class="btnitem" v-if="isdeal" @click="deal_repairbill">
				<uni-icons type="compose" color="#007AFF"></uni-icons>处理
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
			repairitem: {
				type: Object
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
				if (this.repairitem.status === '01' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			},
			ischeck(){
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'check';
				});
				if (this.repairitem.status === '02' && funcode.length>0 && this.stepinfo.currentstep === this.stepinfo.totalstep && this.stepinfo.isover === 0 ) {
					return true;
				}else{
					return false;
				}
			},
			isdeal() {
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'dealwith';
				});
				if (this.repairitem.status === '01' && funcode.length>0) {
					return true;
				}else{
					return false;
				}
			},
			issend() {
				const funcode = this.funlist.filter(function(i){
					return i.funname.code === 'sendbill';
				});
				if (this.repairitem.status === '01' && funcode.length>0) {
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
				repairfn.billstepno({billid:this.repairitem.id}).then(res=>{
					console.log(res);
					this.stepinfo = res.data.stepinfo;
				});
			},
			audit_repairbill(){
				this.$emit('audit',this.repairitem);
			},
			deal_repairbill() {
				this.$emit('deal', this.repairitem);
			},
			check_repairbill()
			{
				this.$emit('check',this.repairitem);
			},
			send_repairbill() {
				this.$emit('sendbill', this.repairitem);
			},
			view_repair_detail() {
				console.log(this.repairitem);
				uni.navigateTo({
					url:'/pages/repair/repair_detail?id='+this.repairitem.id
				})
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
