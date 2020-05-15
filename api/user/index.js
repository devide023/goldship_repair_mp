import util from '../../utils/index.js'
export default {
	userinfo:(data)=>{
		return util.request({
			url:'/mp/userinfo',
			method:'GET',
			data:data
		});
	},
	usermenus:(data)=>{
		return util.request({
			url:'/mp/menus',
			method:'GET',
			data:data
		});
	}
}