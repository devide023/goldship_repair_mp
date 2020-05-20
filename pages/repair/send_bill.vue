<template>
	<view class="evan-form-show">
		<evan-form ref="form" :model="sendform">
			<evan-form-item label="维修人员" prop="dealuser">
				<picker mode="selector" :range="dealusers" :value="dealindex" @change="selectdealuser">
					<view class="form-input" style="width:300px;">{{dealusers[dealindex]}}</view>
				</picker>
			</evan-form-item>
			<evan-form-item label="备注" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="form.note" placeholder="请填写派单备注" />
			</evan-form-item>
			<button type="primary" @click="send_form" style="margin-bottom: 10px;">确定</button>
		</evan-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dealusers:[],
				dealindex:0,
				sendform: {
					
				},
				rules:{
					dealuser: {
						required: true,
						message: '请选择维修人员'
					},
				}
			}
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			selectdealuser(e) {
				console.log(e.target.value);
				this.dealindex = e.target.value;
			},
			send_form(){
				
			}
		},
	}
</script>

<style lang="scss">
	.evan-form-item-container__main{
		justify-content: flex-end;
	}
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
			&.textarea {
				height: 200rpx;
				padding: 24rpx 0;
				text-align: left;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999;
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2D87D5;

			&::before,
			&::after {
				border: none;
			}
		}

		.customize-form-item {
			&__label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
			}

			&__radio {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&__text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
</style>
