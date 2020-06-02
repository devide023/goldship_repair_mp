export default {
	UpdateOfApk: (apkurl) => {
		const downloadTask = uni.downloadFile({
			url: apkurl,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					console.log('安装包下载成功，即将安装：' + JSON.stringify(downloadResult, null, 4));
					plus.runtime.openFile(downloadResult.tempFilePath);
				}
			}
		});
		downloadTask.onProgressUpdate((res) => {
			uni.$emit("progress", res)
			// console.log('下载进度' + progress);
			// console.log('已经下载的数据长度' + res.totalBytesWritten);
			// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
		});
		uni.$on("cancelUpdate", () => {
			console.log("用户点击了取消下载");
			downloadTask.abort();
		})
	},
	UpdateOfWgt: (result) => {
		uni.downloadFile({
			url: result.data.data.url,
			success: (downloadResult) => {
				if (downloadResult.statusCode === 200) {
					console.log("增量更新包下载成功，即将安装: " + JSON.stringify(downloadResult, null, 4));
					plus.runtime.install(downloadResult.tempFilePath, {
						force: false
					}, function() {
						console.log("增量更新成功,将重启app");
						plus.runtime.restart();
					}, function(e) {
						console.error('增量更新安装失败：' + JSON.stringify(e));
					});
				}
			}
		});
	},
}
