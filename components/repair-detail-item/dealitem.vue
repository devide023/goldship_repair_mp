<template>
	<view class="maincontext">
		<view>{{detailitem.dealuser}}</view>
		<view>{{detailitem.dealusertel}}</view>
		<view>{{detailitem.content}}</view>
		<view>{{detailitem.note}}</view>
		<view>{{detailitem.adduser.name}}</view>
		<view>{{detailitem.dealtime}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			detailitem:{
				type: Object
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
		},
	}
</script>

<style scoped>
	
	.maincontext{
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		width: 100%;
		margin: 0rpx auto 30rpx auto;
		padding: 30rpx 20rpx;
		background-color: #FFFFFF;
	}
</style>
