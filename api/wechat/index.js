import util from '../../utils/index.js'

export default {
	weixinlogin:(data)=>{
		return util.request({
			url:'/wechatlogin',
			method:'GET',
			data:data
		});
	},
	savewechatinfo:(data)=>{
		return util.request({
			url:'/wechat/adduserinfo',
			method:'POST',
			data:data
		})
	},
	updatewechatinfo:(data)=>{
		return util.request({
			url:'/wechat/updateuserinfo',
			method:'POST',
			data:data
		})
	}
}