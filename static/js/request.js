// 放请求基础地址
var baseUrl = 'https://upgrade.building.h5.yscase.com';

// 仅h5环境时才执行下面代码
// #ifdef H5
// process.env.NODE_ENV : 获取当前执行环境的参数 
// production : 表示生产环境(正式环境)
// development : 表示开发环境(测试环境)
baseUrl = process.env.NODE_ENV === 'production' ? baseUrl : "";
// #endif

function request({
	url, //请求的后半截地址
	data,
	method,
	success,
}) {
	// 请求拦截
	let authorization = "";
	
	authorization = uni.getStorageSync('authorization');

	uni.request({
		url: baseUrl + url,
		data,
		method,
		header: {
			'authorization': authorization
		},
		success(res) {
			// 响应拦截
			if (res.statusCode == 200) {
				success(res.data);
			} else {
				uni.showToast({
					title: "请求失败~请稍后再试",
					icon: "none",
				})
			}
		}
	})
}

export default request;
