<template>
	<view class="evan-form-show">
		<evan-form ref="form" :rules="rules" :model="form">
			<evan-form-item label="原密码" prop="oldpwd">
				<input class="form-input" placeholder-class="form-input-placeholder" type="text" :password="true" v-model="form.oldpwd" />
			</evan-form-item>
			<evan-form-item label="新密码" prop="newpwd">
				<input class="form-input" placeholder-class="form-input-placeholder" type="text" :password="true" v-model="form.newpwd" />
			</evan-form-item>
			<evan-form-item label="确认密码" prop="newpwd1">
				<input class="form-input" placeholder-class="form-input-placeholder" type="text" :password="true" v-model="form.newpwd1" />
			</evan-form-item>
			<button type="primary" @tap="submit_pwd">确定</button>
		</evan-form>

	</view>
</template>

<script>
	import UserFn from '../../api/user/index.js'
	export default {
		data() {
			return {
				form: {
					usercode: '',
					oldpwd: '',
					newpwd: '',
					newpwd1: ''
				},
				rules: {
					oldpwd: [{
						required: true,
						message: "请输入原始密码"
					}],
					newpwd: [{
						required: true,
						message: "请输入新密码"
					}],
					newpwd1: [{
						required: true,
						message: "请确认新密码"
					}],
				}
			}
		},
		onLoad() {
			const user = uni.getStorageSync('userinfo');
			this.form.usercode = user.usercode;
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			submit_pwd() {
				this.$refs.form.validate((v) => {
					if (v) {
						if (this.form.newpwd !== this.form.newpwd1) {
							uni.showToast({
								title: "密码不一致",
								duration: 3000
							});
							return false;
						} else {
							UserFn.chpwd({
								usercode: this.form.usercode,
								password: this.form.oldpwd,
								newpassword: this.form.newpwd
							}).then(res => {
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									success(modalres) {
										if (modalres.confirm) {
											if(res.data.code ===1 ){
												uni.clearStorage();
												uni.reLaunch({
													url:'/pages/login/login'
												});
											}
										}
									}
								});
							});
						}
					}
				});
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
