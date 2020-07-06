<script>
	import util from 'utils/index.js'
	import updatefn from 'api/update.js'
	export default {
		onLaunch: function() {
			//#ifdef APP-PLUS 
			uni.request({
				url: util.baseurl + '/update_apk', // 请求地址
				data: {
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				},
				success: (res) => {
					if (res.statusCode == 200 && res.data.code === 1) {
						uni.showModal({ //提醒用户更新  
							title: "更新提示",
							content: res.data.msg,
							success: (ret) => {
								if (ret.confirm) {
									updatefn.UpdateOfApk(ret.data.url);
								}
							}
						})
					}
				}
			});
			//#endif 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
</style>
