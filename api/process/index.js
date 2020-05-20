import util from '../../utils/index.js';

export default {
	process_steps:(data)=>{
		return util.request({
			url:'/process/getsetps',
			method:'GET',
			data:data
		});
	},
	bill_setp:(data)=>{
		return util.request({
			url:'/process/billstep',
			method:'GET',
			data:data
		});
	},
	bill_auditor:(data)=>{
		return util.request({
			url:'/process/stepusers',
			method:'GET',
			data:data
		});
	},
	bill_next:(data)=>{
		return util.request({
			url:'/repair/nextsetp',
			method:'GET',
			data:data
		});
	},
	disgreebill:(data)=>{
		return util.request({
			url:'/repair/disgree',
			method:'GET',
			data:data
		});
	}
}