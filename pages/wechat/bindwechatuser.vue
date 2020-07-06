<template>
	<view class="evan-form-show">
		<evan-form ref="form" :rules="rules" :model="form">
			<evan-form-item label="用户名" prop="username">
				<input class="form-input" placeholder-class="form-input-placeholder" type="text" v-model="form.username" />
			</evan-form-item>
			<evan-form-item label="密码" prop="userpwd">
				<input class="form-input" placeholder-class="form-input-placeholder" type="text" :password="true" v-model="form.userpwd" />
			</evan-form-item>
			<button type="primary" @tap="bindaccount">绑定</button>
		</evan-form>
	</view>
</template>

<script>
	import wechat from '../../api/wechat/index.js';
	export default {
		data() {
			return {
				form:{
					username:'',
					userpwd:'',
					openid:''
				},
				rules:{
					username:[
						{
							required: true,
							message: "请输入用户名"
						}
					],
					userpwd:[
						{
							required: true,
							message: "请输入用户密码"
						}
					]
				}
			}
		},
		onLoad() {
			const wechatinfo = uni.getStorageSync('wechatinfo');
			this.form.openid = wechatinfo.openid;
		},
		methods: {
			bindaccount(){
				console.log(this.form);
			}
		}
	}
</script>

<style lang="scss">
	.evan-form-show {
		padding: 0 30rpx;
		background-color: #fff;

		.form-input {
			font-size: 28rpx;
			color: #333;
			text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;
			line-height: 50rpx;

		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999;
		}

	}
</style>
