<template>
	<view class="page_login">
		<!-- 头部logo -->
		<view class="head">
			<view class="head_bg">
				<view class="head_inner_bg">
					<image :src="imgInfo.head" class="head_logo" />
				</view>
			</view>
		</view>
		<!-- 登录form -->
		<view class="login_form">
			<view class="input">
				<view class="img">
					<image style="width:27px;height: 27px;" :src="imgInfo.icon_user" />
				</view>
				<input type="text" v-model="form.username" placeholder="请输入用户账号">
			</view>
			<view class="line" />
			<view class="input">
				<view class="img">
					<image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd" />
				</view>
				<input type="text" :password="true" v-model="form.password" placeholder="请输入密码">
			</view>
		</view>
		<!-- 登录提交 -->
		<button class="submit" type="primary" @tap="login">登录</button>
	</view>
</template>
<script>
	import LoginFn from '../../api/login.js'
	export default {
		data() {
			const isUni = typeof(uni) !== 'undefined'
			return {
				msg: '',
				msgtype: 'success',
				form: {
					username: '',
					password: ''
				},
				imgInfo: {
					head: isUni ? '/static/gold_logo.png' : require('./images/head.png'),
					icon_user: isUni ? '/static/icon_user.png' : require('./images/icon_user.png'),
					icon_pwd: isUni ? '/static/icon_pwd.png' : require('./images/icon_pwd.png'),

				}
			}
		},
		methods: {
			login() {
				LoginFn.checklogin(this.form).then(res => {
					let result = res;
					this.msg = result.data.msg;
					if (result.data.code === 1) {
						uni.setStorage({
							key: 'token',
							data: result.data.token,
							success: function() {
								uni.reLaunch({
									url: '../index/index'
								});
							}
						});
					} else {
						uni.showModal({
							title:"提示",
							content:result.data.msg,
						});
					}
				});
			}
		}
	}
</script>
<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
</style>
<style lang="scss" scoped>
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;

	.page_login {
		padding: 10px;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 30px;
		padding-bottom: 50px;
		.head_bg {
			border-radius: 50px;
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 40px;
				width: 80px;
				height: 80px;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden;

				.head_logo {
					width: 60px;
					height: 60px;
				}
			}
		}
	}

	.login_form {
		display: flex;
		margin: 20px 20px 40px 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color;
		}

		.input {
			width: 100%;
			max-height: 45px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 21px;
				height: 21px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: rgba(0, 124, 186, 1.0);
		-webkit-tap-highlight-color: rgba(0, 159, 239, 1.0);

		&:active {
			color: #B6B6B6;
			background-color: rgba(0, 156, 234, 0.8);
		}
	}

	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.text {
			font-size: 13px;
			color: $text-color;
		}
	}
</style>
