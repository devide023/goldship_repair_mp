import util from '../../utils/index.js'
export default{
	addrepair:(data)=>{
		return util.request({
			url:'/repair/add',
			method:'POST',
			data:data
		});
	},
	addrepair_detail:(data)=>{
		return util.request({
			url:'/repair/savedealinfo',
			method:'POST',
			data:data
		});
	},
	repairtypes:()=>{
		return util.request({
			url:'/baseinfo/repairtypes',
			method:'GET',
		})
	},
	repairno:()=>{
		return util.request({
			url:'/repair/repairno',
			method:'GET',
		})
	},
	removeimgs:(data)=>{
		return util.request({
			method:'POST',
			url:'/repair/removeimgs',
			data:data
		});
	},
	removedetailimgs:(data)=>{
		return util.request({
			method:'POST',
			url:'/repair/removedetailimgs',
			data:data
		});
	},
	list:(data)=>{
		return util.request({
			url:'/repair/list',
			method:'POST',
			data:data
		});
	},
	repairinfo_list:(data)=>{
		return util.request({
			url:'/repair/repair_infolist',
			method:'POST',
			data:data
		});
	},
	repairimg_uploadurl:util.baseurl+'/repair/upload/repairimg',
	repairdetail_uploadimgurl:util.baseurl+'/repair/upload/detailimg',
}