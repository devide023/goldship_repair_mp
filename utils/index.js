const url = 'http://192.168.20.72:8081';
const baseurl = url + '/api';
const rooturl = url + '/';
export default {
	baseurl: baseurl,
	rooturl: rooturl,
	request: (option) => {
		const token = uni.getStorageSync('token');
		let requestheader = {};
		if (token) {
			requestheader = {
				"Accept": "application/json",
				"Authorization": "Bearer " + token
			};
		} else {
			requestheader = {
				"Accept": "application/json",
				"Authorization": "Bearer "
			};
		}
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: baseurl + option.url,
				method: option.method || 'GET',
				data: option.data || {},
				header: requestheader,
				success: (res) => {
					uni.hideLoading();
					resolve(res);
				},
				fail: (error) => {
					console.log(error);
					uni.showToast({
						title: '网络请求失败',
						duration: 3000
					})
					reject();
				}
			});
		});
	},
	gettoken: () => {
		try {
			const token = uni.getStorageSync('token');
			if (token) {
				return token;
			} else {
				return null;
			}
		} catch (e) {
			// error
		}
	},
	getheader: () => {
		try {
			const token = uni.getStorageSync('token');
			if (token) {
				return {
					"Accept": "application/json",
					"Authorization": "Bearer " + token
				};
			} else {
				return {
					"Accept": "application/json",
					"Authorization": "Bearer "
				};
			}
		} catch (e) {
			// error
		}
	},
	logout: () => {
		try {
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/login/login.vue'
			});
		} catch (e) {

		}
	}

}
