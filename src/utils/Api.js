/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 17:40:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-09 23:51:50
 */

'use strict'
import VueResource from 'vue-resource'
import commonUtils from '../utils/CommonUtils'

import {LOCAL_STORAGE_TOKEN} from '../utils/LocalStorage'

import Vue from 'vue'
Vue.use(VueResource)

//  配置

var isDebug = true
let context = ''

const gobalUrl = 'https://mp.mhealth100.com/ip-healthmanager-mobile-web/'

const testUrl = 'http://192.168.3.104:8081/sas/'

const localUrl = 'http://localhost:8081/HxwDemo'

const debugUrl = {
  login: testUrl + 'auth/login',
  getAccountList: testUrl + 'api/account/list'
}

const realUrl = {}

var newUrl = {}

function getUrl(e) {
  var result
  newUrl = isDebug
    ? debugUrl
    : realUrl
  switch (e) {
    case login:
      result = newUrl.login
      break
    case getAccountList:
      result = newUrl.getAccountList
      break
    default:
      break
  }

  return result
};

function setContext(strContext) {
  strContext
    ? (context = strContext)
    : null
}

function login(obj) {
  doRequest(getUrl(login), obj)
}

function getAccountList(obj) {
  doRequest(getUrl(getAccountList), Object.assign(obj || {}, {loginMeta: true}))
}

// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#options
// 重新包装请求obj  credientials跨域问题
function packObj(mUrl, obj) {
  if (!obj) {
    obj = {}
    commonUtils.log('--api.js---网络请求obj 为空空空空')
  }

  return {
    options: {
      url: mUrl,
      method: obj.method
        ? obj.method
        : 'POST',
      body: obj.body
        ? obj.body
        : {},
      params: obj.params
        ? obj.params
        : {},
      headers: obj.headers
        ? obj.headers
        : {},
      timeout: obj.timeout
        ? obj.timeout
        : 3000,
      before: obj.before
        ? obj.before
        : null,
      progress: obj.progress
        ? obj.progress
        : null,
      credientials: obj.credientials
        ? obj.credientials
        : true,
      emulateHTTP: obj.emulateHTTP
        ? obj.emulateHTTP
        : true,
      emulateJSON: obj.emulateJSON
        ? obj.emulateJSON
        : false
    },
    loginMeta: obj.loginMeta
      ? obj.loginMeta
      : null,
    body: obj.body
      ? obj.body
      : {},
    success: obj.success
      ? obj.success
      : null,
    error: obj.error
      ? obj.error
      : null
  }
}

// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md#options
// post含data json请求网络
function doRequest(mUrl, obj) {
  var requertParams = packObj(mUrl, obj)
  commonUtils.log('--api.js---requertParams', requertParams, mUrl)

  Vue
    .http
    .interceptors
    .push(function (request, next) {
      // modify method

      if (!requertParams.loginMeta && localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
        alert(localStorage.getItem(LOCAL_STORAGE_TOKEN))
        request
          .headers
          .set('authorization', localStorage.getItem(LOCAL_STORAGE_TOKEN))
      }

      commonUtils.log('--api.js--- requst网络配置:', request)
      // continue to next interceptor
      next()
    })

  if (requertParams.options.method === 'POST') {
    Vue
      .http
      .post(requertParams.options.url, requertParams.body, requertParams.options)
      .then(function (res) {
        commonUtils.log('--api.js---post success  response:', res.body)
        if (requertParams.success) {
          requertParams.success(res)
        }
      }, function (res) {
        commonUtils.log('--api.js---post error  response:', res.body)
        if (requertParams.error) {
          requertParams.error(res)
        }
      })
  } else {
    Vue
      .http
      .get(requertParams.options.mUrl, requertParams.option)
      .then(function (res) {
        commonUtils.log('--api.js---get success  response:', res.body)
        if (requertParams.success) {
          requertParams.success(res)
        }
      }, function (res) {
        commonUtils.log('--api.js---get error  response:', res.body)
        if (requertParams.error) {
          requertParams.error(res)
        }
      })
  }
}

module.exports = {
  setContext,
  login,
  getAccountList
}
