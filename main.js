import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

import request from "static/js/request.js";
Vue.prototype.$request = request;

Vue.filter('formatNumber', (num) => {
	switch (true) {
		case num >= 10000000:
			num = Math.round(num / 1000000) / 10 + 'KW';
			break;
		case num >= 10000:
			num = Math.round(num / 1000) / 10 + 'W';
			break;
		case num >= 1000:
			num = Math.round(num / 100) / 10 + 'K';
			break;
	}
	return num;
})