<template>
	<view class="container">
		<view class="itemrow">
			<view>状态：<view class="status">{{repairentity.statusname.name}}
				</view>
			</view>
			<view>类型：<view class="type">{{repairentity.typename.name}}
				</view>
			</view>
		</view>
		<view>报修单号：{{repairentity.repairno}}</view>
		<view>标题：{{repairentity.title}}</view>
		<view>情况描述：</view>
		<view class="subcontent">
			{{repairentity.content}}
		</view>
		<slot name="repairimg"></slot>
		<view class="itemrow last">
			<view>报修人：{{repairentity.addusername.name}}</view>
			<view>报修日期：{{repairentity.addtime}}</view>
		</view>
		<view class="itemrow last">
			<view>派单人：{{repairentity.sendusername.name}}</view>
			<view>派单日期：{{repairentity.sendtime}}</view>
		</view>
		<view class="itemrow last">
			<view>验收人：{{repairentity.endusername.name}}</view>
			<view>验收日期：{{repairentity.endtime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			repairentity: {
				type: Object
			}
		},
		data() {
			return {
			};
		},
		methods: {
		},
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background-color: #FFFFFF;
		padding: 10rpx;
		font-size: 14px;
	}

	.itemrow {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.status {
		display: inline-flex;
		background-color: #00c600;
		color: #FFFFFF;
		padding: 5rpx 20px;
		border-radius: 10rpx;
		text-align: center;
	}

	.type {
		display: inline-flex;
		background-color: #ff5500;
		color: #FFFFFF;
		padding: 5rpx 20px;
		border-radius: 10rpx;
		text-align: center;
	}

	.subcontent {
		text-indent: 1rem;
		margin: 5rpx 0rpx;
	}
	.last{
		font-size: 10px;
	}
</style>
