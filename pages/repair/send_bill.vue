<template>
	<view class="evan-form-show">
		<evan-form ref="form" :model="sendform">
			<evan-form-item label="维修人员" prop="dealuserid">
				<checkbox-group @change="choose_repairusers" style="font-size:13px;">
					<label v-for="item in orginuser" :key="item.id">
						<checkbox :value="item.id" /><text>{{item.name}}</text>
					</label>
				</checkbox-group>
			</evan-form-item>
			<evan-form-item label="备注" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="sendform.note"
				 placeholder="请填写派单备注" />
				</evan-form-item>
			<evan-form-item label="派单人">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="sendform.senduser" placeholder="请输入报修人" />
			</evan-form-item>
			<button type="primary" @click="send_form_data" style="margin-bottom: 10px;">确定</button>
		</evan-form>
	</view>
</template>

<script>
	import repairfn from '../../api/repair/index.js'
	export default {
		data() {
			return {
				orginuser:[],
				sendform: {
					billid:0,
					dealuserid:[],
					senduser:'',
					note:''
				},
				rules:{
					dealuserid: {
						type:'array',
						required: true,
						message: '请选择维修人员'
					},
				}
			}
		},
		onLoad(e) {
			this.sendform.billid = parseInt(e.id);
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
			this.getrepairuserlist();
			this.init();
		},
		methods: {
			getrepairuserlist(){
				repairfn.repairusers().then(res=>{
					this.orginuser = res.data.result;
				})
			},
			init(){
				this.sendform.senduser = uni.getStorageSync('userinfo').name;
			},
			choose_repairusers(e){
				 let ids = e.detail.value;
				 this.sendform.dealuserid = ids;
				 for(let i = 0; i<this.orginuser.length; i++) {
					 const item = this.orginuser[i]
					 if(ids.includes(item.id)){
						 this.$set(item,'checked',true)
					 }else{
						 this.$set(item,'checked',false)
					 }
				 }
			},
			send_form_data(){
				this.$refs.form.validate((v)=>{
					if(v){
						repairfn.sendbill(this.sendform).then(res=>{
											uni.showToast({
												title:res.data.msg,
												duration:3000
											});
											if(res.data.code === 1){
												uni.navigateBack();
											}
						});
					}
				});
			}
		},
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
