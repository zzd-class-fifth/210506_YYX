var load = function({
	imgList,
	imgBaseUrl, //图片前缀地址
	success, //回调加载进度
	complete, //回调加载完成
}) {
	let pre = 0; //记录加载进度
	let total = imgList.length; //图片的总张数

	for (let i = 0; i < total; i++) {
		// #ifdef H5
		const img = new image();

		// 监听图片加载完成
		// onload全部是小写字母
		img.onload = function() {
			// 一张图片加载完成
			pre++;
			console.log(pre);
			success(Math.floor(pre / total * 100));

			if (pre == total) {
				// 所有图片都已经加载完成
				complete();
			}
		}

		img.src = imgBaseUrl + imgList[i];

		// if (imgBaseUrl.indexOf('//') > -1) {
		// 	//是绝对地址时
		// 	img.src = imgBaseUrl + imgList[i];
		// } else {
		// 	// 是相对地址时
		// 	img.src = require(imgBaseUrl + imgList[i]);
		// }
		// #endif


		// #ifdef MP
		uni.getImageInfo({
			src: imgBaseUrl + imgList[i],
			success() {
				console.log(arguments);
			},
			fail() {
				console.log(imgBaseUrl + imgList[i]);
				console.log(arguments[0]);
			},
			complete() {
				// console.log(arguments);
			}
		})
		// #endif
	}

}

export default {
	load,
}
