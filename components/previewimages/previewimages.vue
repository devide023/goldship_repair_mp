<template>
	<view>
		<scroll-view scroll-x="true" class="images">
			<image v-for="(item,index) in imglist" :key="index" :src="item" mode="aspectFit" @click="previewimgs(item)" class="imgitem"></image>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			imglist:{
				type:Array
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
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
			}
		},
	}
</script>

<style scoped>
	.images {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 200rpx;
		margin-bottom: 30rpx;
		white-space: nowrap;
	}
	
	.imgitem {
		display: inline-block;
		width: 180rpx;
		height: 180rpx;
		margin-right: 30rpx;
		padding: 2rpx;
		border: #f0f0f0 solid 1rpx;
	}
</style>
