<template>
	<view>
		<view class="container">
			<view class="content">
				
				<view class="tag">
					<view class="repairno">{{repairitem.repairno}}</view>
					<view class="status">{{repairitem.statusname.name}}</view>
					<view class="type">{{repairitem.typename.name}}</view>
				</view>
				
				<view class="title">{{repairitem.title}}</view>
				<view class="describe">{{repairitem.content}}</view>
				
				<scroll-view scroll-x="true" class="images">
					<image v-for="(item,index) in imglist" :key="index" :src="item" mode="aspectFit" @click="previewimgs(item)" class="imgitem"></image>
				</scroll-view>
				
				<view class="usercontainer">
					<view class="adduser">报修人：{{repairitem.addusername.name}}</view>
					<view class="addtime">报修日期：{{repairitem.addtime}}</view>
				</view>
				
				<view class="btncontainer">
					<view class="btnitem" v-if="isdeal" @click="deal_repairbill">
						<uni-icons type="compose" color="#007AFF"></uni-icons>处理
					</view>
					<view class="btnitem" v-if="issend" @click="send_repairbill">
						<uni-icons type="paperplane-filled" color="#007AFF"></uni-icons>派单
					</view>
					<view class="btnitem" v-if="ischeck" @click="check_repairbill">
						<uni-icons type="checkmarkempty" color="#007AFF"></uni-icons>验收
					</view>
					<view class="btnitem" @click="view_deal_detail">
						<uni-icons type="info" color="#007AFF"></uni-icons>维修详情({{repairitem.details.length}})
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../utils/index.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			"uni-icons":uniIcons
		},
		props: {
			repairitem: {
				type: Object
			}
		},
		computed: {
			imglist() {
				const that = this;
				return this.repairitem.images.map(function(i){
					return that.repairimgurl+i.filename;
				}) 
			},
			isdeal(){
				if(this.repairitem.status === '01' && this.repairitem.dealuserid>0){
					return true;
				}
			},
			issend(){
					if(this.repairitem.status === '01' && this.repairitem.senduserid>0){
						return true;
					}
			},
			ischeck(){
					return false;
			}
		},
		mounted() {
			this.inituserinfo();
		},
		data() {
			return {
				userinfo:{},
				repairimgurl: util.rooturl + 'repair/'
			}
		},
		methods: {
			inituserinfo(){
				const userinfo = uni.getStorageSync('userinfo');
				if(userinfo){
					this.userinfo = userinfo;
				}
			},
			previewimgs(imagepath) {
				uni.previewImage({
					urls: this.imglist,
					current: imagepath,
					indicator: 'default',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log(data.index + 1);
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					success(res) {
						console.log(res);
					}
				})
			},
			deal_repairbill(){
				this.$emit('dealrepair',this.repairitem);
			},
			send_repairbill(){
				this.$emit('sendrepair',this.repairitem);
			},
			check_repairbill(){
				this.$emit('checkrepair',this.repairitem);
			},
			view_deal_detail()
			{
				this.$emit('repairdetail',this.repairitem);
			}
		},
	}
</script>

<style scoped>
	.container{
		display: flex;
		flex-flow: row nowrap;
		width: 95%;
		margin: 0rpx auto 20rpx auto;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
		overflow: hidden;
	}
	.tag{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		font-size: 11px;
		color: #FFFFFF;
		text-align: center;
		margin-bottom: 30rpx;
	}
	.repairno{
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #007AFF;
	}
	.status{
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #ff5500;
	}
	.type{
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #00aa00;
	}
	.title{
		font-size: 14px;
		color: #007AFF;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.describe{
		font-size: 13px;
		text-indent: 2rem;
		padding-right: 10rpx;
		margin-bottom: 20rpx;
	}
	.images{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 200rpx;
		margin-bottom: 30rpx;
		white-space: nowrap;
	}
	.imgitem{
		display: inline-block;
		width: 180rpx;
		height: 180rpx;
		margin-right: 30rpx;
		padding: 2rpx;
		border: #f0f0f0 solid 1rpx;
	}
	.usercontainer{
		display: flex;
		flex-direction: row;
		margin-bottom: 30rpx;
		width: 100%;
		justify-content: space-between;
		font-size: 10px;
		color: #3F536E;
	}
	.adduser{
		text-align: left;
		padding-left: 20rpx;
	}
	.addtime{
		text-align: right;
		padding-right: 20rpx;
	}
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