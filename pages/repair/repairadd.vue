<template>
	<view class="evan-form-show">
		<evan-form ref="form" :model="repairform">
			<evan-form-item label="报修单号" prop="repairno">
				<view class="form-input">{{repairform.repairno}}</view>
			</evan-form-item>
			<evan-form-item label="类型" prop="type">
				<picker mode="selector" :range="typenames" :value="typeindex" @change="selecttype">
					<view class="form-input" style="width:300px;">{{typenames[typeindex]}}</view>
				</picker>
			</evan-form-item>
			<evan-form-item label="标题" prop="title">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="repairform.title" placeholder="请输入标题" />
			</evan-form-item>
			<evan-form-item label="问题描述" prop="substance" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="repairform.substance"
				 placeholder="请描述具体问题" />
				</evan-form-item>
				<evan-form-item label="上传照片">
					
						<view class="form-input" @click="opensheet">
							<view>{{repairform.images.length}}</view>
							</view>
				</evan-form-item>	
			<evan-form-item label="报修人">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="repairform.adduser" placeholder="请输入报修人" />
			</evan-form-item>
			<evan-form-item label="联系电话">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="repairform.addusertel" placeholder="请输入联系电话" />
			</evan-form-item>
			<evan-form-item label="备注" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="repairform.note" style="height: 120rpx;" />
			</evan-form-item>
			<button type="primary" @click="submit_form" style="margin-bottom: 10px;">提交</button>
		</evan-form>
	</view>
</template>

<script>
	import utils from '@/components/evan-form/utils.js';
	import RepairFn from '../../api/repair/index.js';
	import tool from '../../utils/index.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		/*components: {
			uniIcons
		},*/
		data() {
			return {
				typelist:[],
				typenames:[],
				typeindex:0,
				repairform: {
					status:'01',
					type:'',
					'repairno':'',
					'title':'',
					'substance':'',
					'adduser':'',
					'addusertel':'',
					'note':'',
					'images':[]
				},
				rules: {
					repairno: {
						required: true,
						message: '请输入报修单号'
					},
					type: [{
						required: true,
						message: '请选择类型'
					}],
					title: [{
						required: true,
						message: '请输入标题'
					}],
					substance: [{
						required: true,
						message: '请描述问题'
					}]
				}
			}
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
			this.gettypes();
			this.getrepairno();
			this.init();
		},
		methods: {
			gettypes(){
				RepairFn.repairtypes().then(result=>{
					if(result.data.code ===1){
						this.typelist = result.data.result;
						this.typenames = result.data.result.map(function(i){
							return i.name;
						});
						this.repairform.type = this.typelist[0].code;
					}
				})
			},
			getrepairno(){
				RepairFn.repairno().then(result=>{
					this.repairform.repairno = result.data.result;
				});
			},
			init(){
				try{
					const userinfo = uni.getStorageSync('userinfo');
					this.repairform.adduser = userinfo.name;
					this.repairform.addusertel = userinfo.tel;
				}
				catch(e){
					
				}
			},
			selecttype(e) {
				console.log(e.target.value);
				this.typeindex = e.target.value;
				this.repairform.type = this.typelist[this.typeindex].code;
			},
			chooseimg(imgtype){
				const that = this;
				uni.chooseImage({
				    count: 9, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [imgtype], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						const tempFilePaths = res.tempFilePaths;
						//删除文件
						RepairFn.removeimgs({
							"images":that.repairform.images
						}).then(response=>{
							that.repairform.images=[];
							//上传文件
							tempFilePaths.forEach(function(item){
								uni.showLoading({
									title:"文件上传中……"
								});
								uni.uploadFile({
								    url: RepairFn.repairimg_uploadurl,
									 header:tool.getheader(),
								    filePath: item,
								    name: 'file',
								    success: (uploadFileRes) => {
										let resdata = JSON.parse(uploadFileRes.data);
										uni.showToast({
											title:resdata.msg,
											duration:2000
										});
										that.repairform.images.push(resdata.result);
								    }
								});
							});
						});   
				    }
				});
			},
			opensheet(){
				const that = this;
				uni.showActionSheet({
				    itemList: ['相册', '照相机'],
				    success: function (res) {
				        let index = res.tapIndex;
						switch (index){
							case 0:
								that.chooseimg('album');
								break;
							case 1:
								that.chooseimg('camera');
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
			submit_form(){
				this.$refs.form.validate((res) => {
					if (res) {
						RepairFn.addrepair(this.repairform).then(res=>{
							let result = res;
							uni.showToast({
								title:result.data.msg,
								duration:3000,
							});
							if(result.data.code === 1){
								uni.reLaunch({
									url:'../my/index'
								})
							}
						});
					}
				});
			}
		}
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
