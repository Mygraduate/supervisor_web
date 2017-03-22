/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 17:40:52
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-02-04 22:56:31
 */

'use strict';
import VueResource from 'vue-resource'
import commonUtils from '../utils/CommonUtils'

import Vue from 'vue'
Vue.use(VueResource);


//  配置

var isDebug = false;

const gobalUrl = 'https://mp.mhealth100.com/ip-healthmanager-mobile-web/';

const testUrl = 'http://10.0.1.25:9800/ip-healthmanager-mobile-web/';


const localUrl = 'http://localhost:8081/HxwDemo';



const debugUrl = {

	famous5min: testUrl + "huangxiaowu/famousDoctorFMain",
	resourceDetail: testUrl + "huangxiaowu/resourceDetail",
	preOrderPay: testUrl + "mydoctor/preOrderPay",
	signOrderStatus: testUrl + "mydoctor/signOrderStatus"
}

const realUrl = {
	famous5min: gobalUrl + "huangxiaowu/famousDoctorFMain",
	resourceDetail: gobalUrl + "huangxiaowu/resourceDetail",
	preOrderPay: gobalUrl + "mydoctor/preOrderPay",
	signOrderStatus: gobalUrl + "mydoctor/signOrderStatus"
}



var newUrl = {};

function getUrl(e) {
	var result;
	newUrl = isDebug ? debugUrl : realUrl;
	switch (e) {
		case localTest:
			result = localUrl;
			break;
		case famous5min:
			result = newUrl.famous5min;
			break;
		case resourceDetail:
			result = newUrl.resourceDetail;
			break;
		case preOrderPay:
			result = newUrl.preOrderPay;
			break;
		case signOrderStatus:
			result = newUrl.signOrderStatus;
			break;
		default:
			break;
	}

	return result;
};


function famous5min(obj) {
	doRequest(getUrl(famous5min), obj);
}


function login(obj) {
	doRequest(getUrl(login), obj);
}

function resourceDetail(obj) {
	doRequest(getUrl(resourceDetail), obj);
}


function preOrderPay(obj) {
	doRequest(getUrl(preOrderPay), obj);
}

function signOrderStatus(obj) {
	doRequest(getUrl(signOrderStatus), obj);
}


function localTest(obj) {
	doRequest(getUrl(localTest), obj);
}



// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#options
//重新包装请求obj  credientials跨域问题
function packObj(mUrl, obj) {

	if (!obj) {
		obj = {};
		commonUtils.log("--api.js---网络请求obj 为空空空空");
	}

	return {
		options: {
			url: mUrl,
			method: obj.method ? obj.method : 'POST',
			body: obj.body ? obj.body : {},
			params: obj.params ? obj.params : {},
			headers: obj.headers ? obj.headers : {},
			timeout: obj.timeout ? obj.timeout : 1500,
			before: obj.before ? obj.before : null,
			progress: obj.progress ? obj.progress : null,
			credientials: obj.credientials ? obj.credientials : true,
			emulateHTTP: obj.emulateHTTP ? obj.emulateHTTP : false,
			emulateJSON: obj.emulateJSON ? obj.emulateJSON : true
		},
		body: obj.body ? obj.body : {},
		success: obj.success ? obj.success : null,
		error: obj.error ? obj.error : null
	}

}


// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#options
//post含data json请求网络
function doRequest(mUrl, obj) {

	var requertParams = packObj(mUrl, obj);
	commonUtils.log("--api.js---requertParams", requertParams, mUrl);



	Vue.http.interceptors.push(function(request, next) {

		// modify method
		commonUtils.log("--api.js--- requst网络配置:", request);

		// continue to next interceptor
		next();
	});


	if (requertParams.options.method == 'POST') {
		Vue.http.post(requertParams.options.url, requertParams.body, requertParams.options).then(function(res) {
			commonUtils.log("--api.js---post success  response:", res.body);
			if (requertParams.success) {
				requertParams.success(res);
			}
		}, function(res) {
			commonUtils.log("--api.js---post error  response:", res.body);
			if (requertParams.error) {
				requertParams.error(res);
			}
		});
	} else {
		Vue.http.get(requertParams.options.mUrl, requertParams.option).then(function(res) {
			commonUtils.log("--api.js---get success  response:", res.body);
			if (obrequertParamsj.success) {
				requertParams.success(res);
			}
		}, function(res) {
			commonUtils.log("--api.js---get error  response:", res.body);
			if (requertParams.error) {
				requertParams.error(res);
			}
		});
	}

}



module.exports = {
	getResourceDetail: resourceDetail,
	getFamous5min: famous5min,
	preOrderPay: preOrderPay,
	signOrderStatus: signOrderStatus,
	localTest: localTest
}