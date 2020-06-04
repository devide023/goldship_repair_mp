<template>
	<view class="evan-form-show">
		<evan-form ref="form" :model="form" :rules="rules">
			<evan-form-item label="姓名" prop="name">
				<input type="text" v-model="form.name" class="form-input" placeholder-class="form-input-placeholder" />
			</evan-form-item>
			<evan-form-item label="性别" prop="sex">
				<picker mode="selector" :range="sexlist" @change="choosesex">
					<view class="form-input">{{sexlist[sexindex]}}</view>
				</picker>
			</evan-form-item>
			<evan-form-item label="出生日期" prop="birthdate">
				<picker mode="date" :value="form.birthdate" @change="choosebirthdate">
					<view class="form-input">{{form.birthdate}}</view>
				</picker>
			</evan-form-item>
			<evan-form-item label="身份证号">
				<input type="text" v-model="form.idno" class="form-input" placeholder-class="form-input-placeholder" />
			</evan-form-item>
			<evan-form-item label="电子邮箱" prop="email">
				<input type="text" v-model="form.email" class="form-input" placeholder-class="form-input-placeholder" />
			</evan-form-item>
			<evan-form-item label="联系电话" prop="tel">
				<input type="text" v-model="form.tel" class="form-input" placeholder-class="form-input-placeholder" />
			</evan-form-item>
			<evan-form-item label="区域">
				<picker mode="multiSelector" :range="orginreglist" :value="regionindex" :range-key="key" @columnchange="colchangehandle"
				 @change="chooseregion">
					<view class="form-input">{{regionname}}</view>
				</picker>
			</evan-form-item>
			<evan-form-item label="联系地址" prop="adress" label-position="top">
				<textarea v-model="form.adress" class="form-input textarea" placeholder-class="form-input-placeholder" />
			</evan-form-item>
			<button type="primary" @tap="saveuserinfo">提交</button>
		</evan-form>
	</view>
</template>

<script>
	import UserFn from '../../api/user/index.js'
	import RegionFn from '../../api/region/index.js'
	export default {
		data() {
			return {
				sexlist: ['男', '女'],
				orginreglist: [],
				sexindex: 0,
				regionindex: [0, 0, 0],
				key: 'name',
				regionname:'',
				form: {
					usercode: '',
					name: '',
					sex: 1,
					birthdate: '',
					idno: '',
					tel: '',
					email: '',
					adress: '',
					province: 0,
					city: 0,
					district: 0
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名'
					}],
					birthdate: [{
						required: true,
						message: '请选择生日'
					}],
					tel: [{
						required: true,
						message: '请输入联系电话'
					}],
					adress: [{
						required: true,
						message: '请输入联系地址'
					}]
				}
			}
		},
		async onLoad() {
			const user = uni.getStorageSync('userinfo');
			this.form.usercode = user.usercode;
			this.form.name = user.name;
			this.form.sex = user.sex;
			this.form.idno = user.idno;
			this.form.tel = user.tel;
			this.form.email = user.email;
			this.form.adress = user.adress;
			this.form.province = user.province;
			this.form.city = user.city;
			this.form.district = user.district;
			this.form.birthdate = user.birthdate;
			this.regionname = user.provincename.name+user.cityname.name+user.districtname.name;
			const v1 = await RegionFn.regionlist({
				pid: -1
			});
			this.orginreglist.push(v1.data.result);
			const v2 = await RegionFn.regionlist({
				pid: this.orginreglist[0][0].id
			});
			this.orginreglist.push(v2.data.result);
			const v3 = await RegionFn.regionlist({
				pid: this.orginreglist[1][0].id
			});
			this.orginreglist.push(v3.data.result);
		},
		mounted() {
			this.$refs.form.setRules(this.rules);
		},
		methods: {
			saveuserinfo() {
				this.$refs.form.validate((v) => {
					if (v) {
						UserFn.chinfo(this.form).then(res => {
							uni.showToast({
								title:res.data.msg,
								duration:3000
							});
							if(res.data.code === 1)
							{
								uni.navigateTo({
									url:'/pages/index/index'
								});
							}
						});
					}
				});
			},
			choosesex(e) {
				this.sexindex = parseInt(e.detail.value);
				this.form.sex = this.sexindex===0?1:0;
			},
			choosebirthdate(e) {
				this.form.birthdate = e.detail.value;
			},
			chooseregion(e) {
				const pos =e.detail.value;
				this.regionindex = pos;
				this.form.province = this.orginreglist[0][pos[0]].id;
				this.form.city = this.orginreglist[1][pos[1]].id;
				this.form.district = this.orginreglist[2][pos[1]].id;
				this.regionname = this.orginreglist[0][pos[0]].name + this.orginreglist[1][pos[1]].name + this.orginreglist[2][pos[1]].name
			},
			async colchangehandle(e) {
				let col = e.detail.column;
				let idx = e.detail.value;
				let item = this.orginreglist[col][idx];
				this.regionindex[col]=idx;
				switch (col) {
					case 0:
						let ret = await RegionFn.regionlist({
							pid: item.id
						});
						this.orginreglist.splice(1, 1, ret.data.result);
						let cityitem = this.orginreglist[1][0];
						let districtlist = await RegionFn.regionlist({
							pid: cityitem.id
						});
						this.orginreglist.splice(2, 1, districtlist.data.result);
						break;
					case 1:
						let retcity = await RegionFn.regionlist({
							pid: item.id
						});
						this.orginreglist.splice(2, 1, retcity.data.result);
						break;
					case 2:
						break;
					default:
						break;
				}
				this.$forceUpdate()
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

	}
</style>
