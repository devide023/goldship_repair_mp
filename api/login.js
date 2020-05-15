import util from '../utils/index.js'
export default {
	checklogin:(data)=>{
		return util.request({
			url:'/login',
			method:'POST',
			data:data
		});
	}
}