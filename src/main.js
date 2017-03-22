import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import App from './App';
import router from './router';
import commonUtils from './utils/CommonUtils';
import store from './vuex/Store';
import ElementUI from 'element-ui';


import './css/color.css';
import './css/common.css';
import './css/font.css';
import './css/main.css';
import 'element-ui/lib/theme-default/index.css';



// App为html的首页入口
// 全局Vue对象配置
commonUtils.log(router);
Vue.config.debug = true;
Vue.config.errorHandler = function(err, vm) {
	// handle error
	commonUtils.log("--main.js--ERROR:", err);
}
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);



// 主入口main======>>>>App
const app = new Vue({
	store: store,
	router: router,
	beforeCreate: function() {
		commonUtils.log("--main.js--Lifecycle:beforeCreate");
	},
	created: function() {
		commonUtils.log("--main.js--Lifecycle:created");
	},
	beforeMount: function() {
		commonUtils.log("--main.js--Lifecycle:beforeMount");
	},
	mounted: function() {
		commonUtils.log("--main.js--Lifecycle:mounted");
	},
	updated: function() {
		commonUtils.log("--App.Vue--Lifecycle:updated", this.$route);
	},
	activated: function() {
		commonUtils.log("--main.js--Lifecycle:activated");
	},
	deactivated: function() {
		commonUtils.log("--main.js--Lifecycle:deactivated");
	},
	beforeDestroy: function() {
		commonUtils.log("--main.js--Lifecycle:beforeDestroy");
	},
	destroyed: function() {
		commonUtils.log("--main.js--Lifecycle:destroyed");
	},
	
}).$mount('#app');