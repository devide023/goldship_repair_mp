<template>
	<view>
		<view class="btnitem" @click="viewdetail">
			<uni-icons type="info" color="#007AFF"></uni-icons>详情
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			repairid:{
				type:Number
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			viewdetail() {
				uni.navigateTo({
					url:'/pages/repair/repair_detail?id='+this.repairid
				});
			}
		},
	}
</script>

<style scoped>
	
	.btnitem {
		font-size: 13px;
		color: #007AFF;
		text-align: center;
	}
</style>
