import util from '../../utils/index.js'

export default {
	regionlist:(data)=>{
		return util.request({
			url:'/baseinfo/province',
			method:'get',
			data:data
		});
	}
}