<template>
	<view class="maincontext">
		<view class="head">
			<view >维修人/单位：{{detailitem.dealuser}}</view>
			<view >联系电话：{{detailitem.dealusertel}}</view>
		</view>
		<view class="banner">
			<view>维修描述</view>
		</view>
		<view class="dealinfo">{{detailitem.content}}</view>
		<view class="banner">
			<view>备注</view>
		</view>
		<view class="note">{{detailitem.note}}</view>
		<scroll-view scroll-x="true" class="images" v-if="images.length>0">
			<image class="imageitem"  v-for="item in images" :key="item.id" :src="item" mode="aspectFit" @click="previewimgs(item)"></image>
		</scroll-view>
		<view class="end">
			<view>操作人：{{detailitem.adduser.name}}</view>
			<view>操作日期：{{detailitem.dealtime}}</view>
		</view>
		
	</view>
</template>

<script>
	import utils from '../../utils/index.js'
	export default {
		props:{
			detailitem:{
				type: Object
			}
		},
		data() {
			return {
				imgrootpath:utils.rooturl+'/repair/',
			}
		},
		computed: {
			images() {
				const that = this;
				return this.detailitem.detailimages.map(function(i){
					return that.imgrootpath + i.filename;
				});
			}
		},
		methods: {
			previewimgs(imagepath) {
				uni.previewImage({
					urls: this.images,
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
		},
	}
</script>

<style scoped>
	
	.maincontext{
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		margin: 0rpx auto 30rpx auto;
		padding: 30rpx 20rpx;
		background-color: #FFFFFF;
		font-size: 14px;
	}
	.head{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 20rpx;
		color: #4f4f4f;
		text-align: left;
	}
	.banner{
		display: flex;
		flex-direction: row;
		flex-flow:nowrap;
		justify-content: flex-start;
		color: #005500;
		font-size:14px;
		font-weight: bold;
		}
	
	.dealinfo{
		margin-bottom: 20rpx;
		text-indent: 1rem;
	}
	.note{
		margin-bottom: 20rpx;
		text-indent: 1rem;
	}
	.images{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		white-space: nowrap;
		height: 200rpx;
		overflow: hidden;
	}
	.imageitem{
		width: 180rpx;
		height: 180rpx;
		display: inline-block;
		margin-right: 20rpx;
	}
	.end{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-size: 10px;
		color: #4f4f4f;
	}
</style>
