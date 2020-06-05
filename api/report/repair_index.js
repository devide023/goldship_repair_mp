import util from '../../utils/index.js'

export default{
	repair_ship:(data)=>{
		return util.request({
			url:'/report/shiprepair',
			method:'POST',
			data:data
		});
	},
	repair_shipdep:(data)=>{
		return util.request({
			url:'',
			method:'POST',
			data:data
		});
	}
}