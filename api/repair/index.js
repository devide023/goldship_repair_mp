import util from '../../utils/index.js'
export default{
	//报修
	addrepair:(data)=>{
		return util.request({
			url:'/repair/add',
			method:'POST',
			data:data
		});
	},
	//添加维修记录
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
	orgrepairlist:(data)=>{
		return util.request({
			url:'/repair/orgrepairlist',
			method:'GET',
			data:data
		});
	},
	myrepairlist:(data)=>{
		return util.request({
			url:'/repair/myrepairlist',
			method:'GET',
			data:data
		});
	},
	mytasklist:(data)=>{
		return util.request({
			url:'/repair/mytasklist',
			method:'GET',
			data:data
		});
	},
	//维修记录
	repairinfo_list:(data)=>{
		return util.request({
			url:'/repair/repair_infolist',
			method:'POST',
			data:data
		});
	},
	//获取报修详情
	repairinfo:(data)=>{
		return util.request({
				url:'/repair/find',
				method:'GET',
				data:data
		});
	},
	repairimgs:(data)=>{
		return util.request({
				url:'/repair/images',
				method:'GET',
				data:data
		});
	},
	//维修人
	repairusers:(data)=>{
		return util.request({
			url:'/repair/dealwithusers',
			method:'GET',
			data:data
		});
	},
	//派单
	sendbill:(data)=>{
		return util.request({
			url:'/repair/sendbill',
			method:'POST',
			data:data
		});
	},
	//单据步骤
	billstepno:(data)=>{
		return util.request({
			url:'/repair/billstepno',
			method:'GET',
			data:data
		});
	},
	//验收
	checkrepair:(data)=>{
		return util.request({
			url:'/repair/checkbill',
			method:'GET',
			data:data
		});
	},
	repairimg_uploadurl:util.baseurl+'/repair/upload/repairimg',
	repairdetail_uploadimgurl:util.baseurl+'/repair/upload/detailimg',
}