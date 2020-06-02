<template>
	<view>
		<view class="container">
			<view class="content">

				<view class="tag">
					<image class="headimg" :src="headimgurl" mode="aspectFit"></image>
					<view class="repairno">{{repairitem.repairno}}</view>
					<view class="status">{{repairitem.statusname.name}}</view>
					<view class="type">{{repairitem.typename.name}}</view>
				</view>

				<view class="title">{{repairitem.title}}</view>
				<view class="describe">{{repairitem.content}}</view>
				<view class="note" v-if="showsendnote">{{repairitem.sendnote}}</view>
				<previewimg :imglist="imglist" v-if="imglist.length>0"></previewimg>

				<view class="usercontainer">
					<view class="adduser">报修人：{{repairitem.addusername.name}}</view>
					<view class="addtime">报修日期：{{repairitem.addtime}}</view>
				</view>
				
				<slot name="buttons"></slot>
				
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../utils/index.js'
	import previewimg from '../previewimages/previewimages.vue'
	export default {
		components: {
			"previewimg":previewimg
		},
		props: {
			repairitem: {
				type: Object
			}
		},
		computed: {
			headimgurl(){
				return this.head_img_url+this.repairitem.addusername.headimg;
			},
			imglist() {
				const that = this;
				return this.repairitem.images.map(function(i) {
					return that.repairimgurl + i.filename;
				})
			},
			showsendnote(){
				if(this.userinfo.mpfuns){
					const funs = this.userinfo.mpfuns.filter(function(i){
						return i.funname.code === 'dealwith'
					});
					if(funs.length>0){
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
		},
		mounted() {
			this.inituserinfo();
		},
		data() {
			return {
				userinfo: {},
				head_img_url: util.rooturl + 'storage/',
				repairimgurl: util.rooturl + 'repair/'
			}
		},
		methods: {
			inituserinfo() {
				const userinfo = uni.getStorageSync('userinfo');
				if (userinfo) {
					this.userinfo = userinfo;
				}
			}
		},
	}
</script>

<style scoped>
	.container {
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

	.content {
		width: 100%;
		overflow: hidden;
	}

	.tag {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		font-size: 11px;
		color: #FFFFFF;
		text-align: center;
		margin-bottom: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		align-items: center;
	}
	.headimg{
		margin-right: 20rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.repairno {
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #007AFF;
	}

	.status {
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #ff5500;
	}

	.type {
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
		background-color: #00aa00;
	}

	.title {
		font-size: 14px;
		color: #007AFF;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.describe {
		font-size: 13px;
		text-indent: 1rem;
		padding-right: 10rpx;
		margin-bottom: 20rpx;
	}
	.note{
		font-size: 14px;
		color: #ff0000;
		font-weight: bold;
		padding-right: 10rpx;
		margin-bottom: 20rpx;
	}
	.usercontainer {
		display: flex;
		flex-direction: row;
		margin-bottom: 30rpx;
		width: 100%;
		justify-content: space-between;
		font-size: 10px;
		color: #3F536E;
	}

	.adduser {
		text-align: left;
		padding-left: 20rpx;
	}

	.addtime {
		text-align: right;
		padding-right: 20rpx;
	}
</style>
