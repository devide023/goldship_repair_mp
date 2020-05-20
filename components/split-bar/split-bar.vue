<template>
	<view class="container">
		<view class="barhead"></view>
		<view class="barcontent">
			<slot name="title"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		flex-direction: row;
		height: 50rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		padding: 10rpx;
	}
	.barhead{
		width: 15rpx;
		background-color: #007c00;
		margin-right: 10rpx;
		margin-left: 20rpx;
	}
	.barcontent{
		text-align: left;
		font-size: 14px;
		font-weight: bold;
		color: #005500;
	}
</style>
