export default {
	UpdateOfApk: (apkurl) => {
		
		var dtask = plus.downloader.createDownload( apkurl, {}, function ( d, status ) {  
		    // 下载完成
		    if (status == 200) {
		    	plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
		    		uni.showToast({
		    			title: '安装失败',
		    			mask: false,
		    			duration: 1500
		    		});
		    	})
		    } else {
		    	uni.showToast({
		    		title: '更新失败',
		    		mask: false,
		    		duration: 1500
		    	});
		    } 
		});  
		dtask.start(); 
	}
}
