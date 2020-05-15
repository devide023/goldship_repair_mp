<template class="box-body">
	<view class="box">
		<view class="father-box">
			<view class="header">
				<image class="img" :src="headimgpath"></image>
				<view class="auth">{{cardinfo.addusername.name}}</view>
				<view class="leave">{{cardinfo.statusname.name}}</view>
				<view class="tag">{{cardinfo.repairno}}</view>
				<view class="type">{{cardinfo.typename.name}}</view>
				<view class="time">{{cardinfo.addtime}}</view>

			</view>
			<view class="title">{{cardinfo.title}}</view>
			<view class="content">{{cardinfo.content}}
			</view>


			<view class="images" v-if="cardinfo.images">
				<view class="imgcontainer">
					<image v-for="(item,index) in repairimglist" :key="index" class="imgitem" :src="item" mode="aspectFit" @click="previewimgs(item)"></image>
				</view>
			</view>

			<view class="btns">
				<view class="btnitem">
					<uni-icons type="compose"></uni-icons>处理
				</view>
				<view class="btnitem">
					<uni-icons type="paperplane-filled"></uni-icons>派单
				</view>
				<view class="btnitem">
					<uni-icons type="checkmarkempty"></uni-icons>验收
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
			'uni-icons': uniIcons
		},
		name: 'card',
		props: {
			cardinfo: {
				type: Object
			}
		},
		computed: {
			headimgpath() {
				return this.headimgurl + this.cardinfo.addusername.headimg;
			},
			repairimglist() {
				let that = this;
				if (this.cardinfo.images.length > 9) {
					return this.cardinfo.images.slice(0, 9).map(function(i) {
						return that.repairimgurl + i.filename;
					});
				} else {
					return this.cardinfo.images.map(function(i) {
						return that.repairimgurl + i.filename;
					});
				}
			}
		},
		data() {
			return {
				headimgurl: util.rooturl + 'storage/',
				repairimgurl: util.rooturl + 'repair/',
			};
		},
		methods: {
			previewimgs(imagepath) {
				uni.previewImage({
					urls: this.repairimglist,
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
			}
		},
	}
</script>

<style>
	.low {
		margin-left: 5px;
	}

	.father-box {
		background-color: #FFFFFF;
		box-shadow: #C8C7CC;
		height: auto;
		width: 96%;
		margin: 20upx auto;
		border: 1px solid #f0f0f0;
		border-radius: 20upx;
	}

	.img {
		margin: 20upx 0px 20upx 50upx;
		height: 90upx;
		width: 90upx;
		border-radius: 90upx;
		display: inline-flex;
	}

	.auth {
		font-weight: bolder;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15px;
		margin-top: -100upx;
		margin-left: 170upx;
	}

	.time {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12px;
		display: inline-flex;
		margin-left: 170upx;
		margin-top: -20upx;
		color: #808080;
	}

	.leave {
		font-size: 12px;
		text-align: center;
		background: #4CD964;
		width: 100upx;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
		border-radius: 20upx;
		color: #F2F2F2;
		margin-left: 250upx;
		margin-top: -35upx;
	}

	.title {
		width: 100%;
		height: 50rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 16px;
		color: #007AFF;
		margin: 10rpx auto;
		padding-left: 10rpx;
	}

	.content {
		display: block;
		font-size: 14px;
		color: #24292E;
		margin-left: 10upx;
		margin-right: 10upx;
		margin-top: 18upx;
		margin-bottom: 20rpx;
		height: auto;
		text-indent: 1.5em;
		overflow: scroll;
		text-overflow: ellipsis;
	}

	.tag {
		font-size: 12px;
		text-align: center;
		background: #36BBFF;
		width: 135upx;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
		border-radius: 20upx;
		color: #F2F2F2;
		margin-left: 370upx;
		margin-top: -35upx;
	}

	.type {
		font-size: 12px;
		text-align: center;
		background: #ffb75e;
		width: 135upx;
		height: 40upx;
		line-height: 40upx;
		border-radius: 20upx;
		color: #fdfdfd;
		margin-left: 530upx;
		margin-top: -35upx;
	}

	.images {
		margin-top: 10rpx;
		width: 100%;
		height: auto;
		margin-bottom: 20rpx;
	}

	.imgcontainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-items: space-around;
		align-items: auto;
	}

	.imgitem {
		width: 30%;
		height: 100rpx;
		overflow: hidden;
		margin: 10rpx;
	}

	.btns {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 20rpx auto;
		flex-wrap: nowrap;
	}

	.btnitem {
		font-size: 12px;
		color: #3F536E;
	}
</style>
