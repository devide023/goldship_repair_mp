<template>
	<view>
		<view class="header" :style="{background: 'url('+bjimgurl+');'}">
			<image class="headimg" :src="headimgurl" mode="scaleToFill" @tap="change_headimg_handle"></image>
			<text class="username">{{userinfo.name}}</text>
		</view>
		<view class="userinfo">
			<view class="useritem">
				<view class="label">用户编号：</view>
				<view class="value">{{userinfo.usercode}}</view>
			</view>
			<view class="useritem">
				<view class="label">姓名：</view>
				<view class="value">{{userinfo.name}}</view>
			</view>
			<view class="useritem">
				<view class="label">性别：</view>
				<view class="value">{{userinfo.sex==1?'男':'女'}}</view>
			</view>
			<view class="useritem">
				<view class="label">出生日期：</view>
				<view class="value">{{userinfo.birthdate}}</view>
			</view>
			<view class="useritem">
				<view class="label">身份证号：</view>
				<view class="value">{{userinfo.idno}}</view>
			</view>
			<view class="useritem">
				<view class="label">电子邮件：</view>
				<view class="value">{{userinfo.email}}</view>
			</view>
			<view class="useritem">
				<view class="label">联系电话：</view>
				<view class="value">{{userinfo.tel}}</view>
			</view>
			<view class="useritem" style="height: 150rpx;line-height: 150rpx;">
				<view class="label">联系地址：</view>
				<view class="value" style="height: 60rpx;line-height: 60rpx;">{{userinfo.provincename.name+userinfo.cityname.name+userinfo.districtname.name + '\r\n' + userinfo.adress}}</view>
			</view>
		</view>
		<view class="userbtnbar">
			<button type="warn" size="default" @tap='changepwdhandle'>修改密码</button>
			<button type="primary" size="default" @tap="edituserinfohandle">编辑信息</button>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import util from '../../utils/index.js'
	import UserFn from '../../api/user/index.js'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				userinfo: {},
				headimgurl: '',
				bjimgurl: ''
			};
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo');
			this.headimgurl = util.rooturl + 'storage/' + this.userinfo.headimg;
			this.bjimgurl = util.rooturl + 'storage/mpbj.jpg';
		},
		methods: {
			changepwdhandle() {
				uni.navigateTo({
					url:'/pages/my/changepwd'
				});
			},
			edituserinfohandle() {
				uni.navigateTo({
					url:'/pages/my/edituser'
				});
			},
			change_headimg_handle() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths);
						uni.uploadFile({
							url: util.baseurl + '/user/headimg', //仅为示例，非真实的接口地址
							header: util.getheader(),
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								'userid': that.userinfo.id
							},
							success: (uploadFileRes) => {
								const result = JSON.parse(uploadFileRes.data);
								if (result.code === 1) {
									that.headimgurl = result.filepath;
									UserFn.userinfo().then(r => {
										if (r.data.code === 1) {
											uni.setStorageSync('userinfo', r.data.result);
										}
									});
								}
							}
						});
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		height: 200rpx;
		padding-top: 30rpx;
		padding-bottom: 50rpx;
		background-color: #aaffff;
		justify-content: center;
		align-items: center;
	}

	.headimg {
		width: 150rpx;
		height: 150rpx;
		border-radius: 80rpx;
		background-color: #aaaaff;
	}

	.username {
		color: #FFFFFF;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 14px;
	}

	.useritem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 80rpx;
		line-height: 80rpx;
		padding: 5rpx 0prx;
		margin-bottom: 10rpx;
		border-bottom: #d3d3d3 1rpx solid;
	}

	.label {
		text-align: right;
		width: 180rpx;
		padding-left: 20rpx;
	}

	.value {
		text-align: right;
		padding-right: 20rpx;
	}

	.userbtnbar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 50rpx;
		margin-bottom: 50rpx;
	}
</style>
