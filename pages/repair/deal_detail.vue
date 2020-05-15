<template>
	<view class="evan-form-show">
		<evan-form ref="form" :model="form">
			<evan-form-item label="维修描述" prop="dealcontent" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="form.dealcontent"
				 placeholder="请描述维修情况" />
				</evan-form-item>
				<evan-form-item label="上传照片">
						<view class="form-input" @click="opensheet">
							<view>{{form.images.length}}</view>
							</view>
				</evan-form-item>
				<evan-form-item label="维修人/单位" prop="dealuser">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form.dealuser" placeholder="请输入维修人/单位" />
				</evan-form-item>
				<evan-form-item label="联系电话" prop="dealusertel">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="form.dealusertel" placeholder="请输入联系电话" />
				</evan-form-item>
				<evan-form-item label="备注" label-position="top">
					<textarea class="form-input" style="height: 150rpx;text-align: left;" placeholder-class="form-input-placeholder" v-model="form.note" />
					</evan-form-item>
					<button type="primary" @click="submit_form" style="margin-bottom: 10px;">提交</button>
		</evan-form>
	</view>
</template>

<script>
	import RepairFn from '../../api/repair/index.js';
	import tool from '../../utils/index.js'
	export default {
		data() {
			return {
				userinfo:{},
				form: {
					repairid:0,
					dealcontent:'',
					dealuser:'',
					dealusertel:'',
					note:'',
					images:[]
				},
				rules:{
					dealcontent:[{
						required: true,
						message: '请填写维修情况'
					}],
					dealuser:[{required: true,message: '请填写维修人'}],
					dealusertel:[{required: true,message: '请填写联系方式'}]
				}
			}
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
			this.inituserinfo();
		},
		onLoad(e) {
			this.form.repairid = e.id;
		},
		methods: {
			inituserinfo(){
				const userinfo = uni.getStorageSync('userinfo');
				this.userinfo = userinfo;
				this.form.dealuser = userinfo.name;
				this.form.dealusertel = userinfo.tel;
			},
			opensheet() {
				const that = this;
				uni.showActionSheet({
				    itemList: ['相册'],
				    success: function (res) {
				        let index = res.tapIndex;
						switch (index){
							case 0:
								that.chooseimg();
								break;
							default:
								break;
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			chooseimg(){
				const that = this;
				uni.chooseImage({
				    count: 9, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						const tempFilePaths = res.tempFilePaths;
						//删除文件
						RepairFn.removedetailimgs({
							"images":that.form.images
						}).then(res=>{
							that.form.images=[];
							//上传文件
							tempFilePaths.forEach(function(item){
								uni.showLoading({
									title:"文件上传中……"
								});
								uni.uploadFile({
								    url: RepairFn.repairdetail_uploadimgurl,
									header:tool.getheader(),
								    filePath: item,
								    name: 'file',
								    success: (uploadFileRes) => {
										let resdata = JSON.parse(uploadFileRes.data);
										uni.showToast({
											title:resdata.msg,
											duration:2000
										});
										uni.hideLoading();
										that.form.images.push(resdata.result);
								    }
								});
							});
						});   
				    }
				});
			},
			submit_form(){
				this.$refs.form.validate((v) => {
					if (v) {
						RepairFn.addrepair_detail(this.form).then(res=>{
							let result = res;
							uni.showToast({
								title:result.data.msg,
								duration:3000,
							});
							if(result.data.code === 1){
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
		}
	.form-input {
		font-size: 28rpx;
		color: #333;
		text-align: right;
		width: 100%;
		box-sizing: border-box;
		height: 60rpx;
		line-height: 50rpx;
		&.textarea {
			height: 300rpx;
			padding: 24rpx 0;
			text-align: left;
		}
	}
	.form-input-placeholder {
		font-size: 28rpx;
		color: #999;
	}
</style>