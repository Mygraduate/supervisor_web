/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 17:40:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 09:40:54
 */

'use strict'
import VueResource from 'vue-resource'
import commonUtils from '../utils/CommonUtils'

import {
  LOCAL_STORAGE_TOKEN
} from '../utils/LocalStorage'

import Vue from 'vue'
Vue.use(VueResource)

//  配置

var isDebug = true
let context = ''

const gobalUrl = 'http://192.168.3.102:8081/sas/'

const localUrl = 'http://localhost:8081/HxwDemo'

const debugUrl = {
  login: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd146475-e897-435e-8002-5b8014c2ab56',
  getAccountList: gobalUrl + 'api/account/list',
  apicourse: 'http://test.mhealth100.com/api/mock/trueExam.do?id=4f0114a2-eec3-4d45-894a-2c4ca' +
    '01d3918',
  apiCollegeList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a776b7d6-870a-4f01-8118-6803568c495a',
  apiCollegeUpdate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=8ba5dd23-68fb-41fc-a037-91861' +
    '2a65644',
  apiCollegeDelete: 'http://test.mhealth100.com/api/mock/trueExam.do?id=8ba5dd23-68fb-41fc-a037-91861' +
    '2a65644',
  apiCollegeCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=8ba5dd23-68fb-41fc-a037-91861' +
    '2a65644',
  apiTeacherList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiTeacherCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiTeacherUpdate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiTeacherDelete: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiTeacherListByCid: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiTeacherInfo: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',

  apiUserList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiUserCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiUserUpdate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiUserDelete: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiUserListByName: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiUserListByRole: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
  apiCourseList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=28f3311a-5ae7-4693-b970-2794b' +
    '5d41114',
  apiUploadExcel: 'http://test.mhealth100.com/api/mock/trueExam.do?id=28f3311a-5ae7-4693-b970-2794b' +
    '5d41114',
  apiExportWord: '/api/word/export',
  apiProfessional: 'http://test.mhealth100.com/api/mock/trueExam.do?id=1ff914cf-d3ef-4f71-8bad-8c477289343a',
  apiAllRole: 'http://test.mhealth100.com/api/mock/trueExam.do?id=d89f32b8-6730-40c4-b60c-de243af8c299',
  apiSparaTime: 'http://test.mhealth100.com/api/mock/trueExam.do?id=83dc7fac-90dc-44ce-be3a-d8597b55baca'
}

const realUrl = {
  login: gobalUrl + 'auth/login',
  getAccountList: gobalUrl + 'api/account/list',
  apicourse: gobalUrl + 'api/course/page',
  apiCollegeList: gobalUrl + 'api/college/list',
  apiCollegeUpdate: gobalUrl + 'api/college/update',
  apiCollegeDelete: gobalUrl + 'api/college/delete',
  apiCollegeCreate: gobalUrl + 'api/college/create',
  apiTeacherList: gobalUrl + 'api/teacher/list',
  apiTeacherCreate: gobalUrl + 'api/teacher/create',
  apiTeacherUpdate: gobalUrl + 'api/teacher/update',
  apiTeacherDelete: gobalUrl + 'api/teacher/delete',
  apiTeacherListByCid: gobalUrl + 'api/teacher/teacherlistbycid',
  apiTeacherInfo: gobalUrl + 'api/teacher/teacherinfo',

  apiUserList: gobalUrl + 'api/account/list',
  apiUserCreate: gobalUrl + 'api/account/create',
  apiUserUpdate: gobalUrl + 'api/account/update',
  apiUserDelete: gobalUrl + 'api/account/delete',
  apiUserListByName: gobalUrl + 'api/account/userinfobyname',
  apiUserListByRole: gobalUrl + 'api/account/userRole',

  apiCourseList: gobalUrl + 'api/course/page',
  apiUploadExcel: gobalUrl + 'api/excel/import',
  apiExportWord: gobalUrl + 'api/word/export',
  apiProfessional: gobalUrl + '',
  apiAllRole: gobalUrl + 'api/account/role',
  apiSparaTime: gobalUrl + 'api/sparetime/list'

}

var newUrl = {}

function getUrl(e) {
  var result
  newUrl = isDebug ? debugUrl : realUrl
  switch (e) {
    case apiUserList:
      result = newUrl.apiUserList
      break
    case apiUserCreate:
      result = newUrl.apiUserCreate
      break
    case apiUserUpdate:
      result = newUrl.apiUserUpdate
      break
    case apiUserDelete:
      result = newUrl.apiUserDelete
      break
    case apiUserListByName:
      result = newUrl.apiUserListByName
      break
    case apiUserListByRole:
      result = newUrl.apiUserListByRole
      break

    case login:
      result = newUrl.login
      break
    case getAccountList:
      result = newUrl.getAccountList
      break
    case apicourse:
      result = newUrl.apicourse
      break
    case apiCollegeList:
      result = newUrl.apiCollegeList
      break
    case apiCollegeUpdate:
      result = newUrl.apiCollegeUpdate
      break
    case apiCollegeDelete:
      result = newUrl.apiCollegeDelete
      break
    case apiCollegeCreate:
      result = newUrl.apiCollegeCreate
      break

    case apiTeacherList:
      result = newUrl.apiTeacherList
      break
    case apiTeacherCreate:
      result = newUrl.apiTeacherCreate
      break
    case apiTeacherUpdate:
      result = newUrl.apiTeacherUpdate
      break
    case apiTeacherDelete:
      result = newUrl.apiTeacherDelete
      break
    case apiTeacherListByCid:
      result = newUrl.apiTeacherListByCid
      break
    case apiTeacherInfo:
      result = newUrl.apiTeacherInfo
      break
    case apiCourseList:
      result = newUrl.apiCourseList
      break
    case apiUploadExcel:
      result = newUrl.apiUploadExcel
      break

    case apiExportWord:
      result = newUrl.apiExportWord
      break
    case apiProfessional:
      result = newUrl.apiProfessional
      break
    case apiAllRole:
      result = newUrl.apiAllRole
      break
    case apiSparaTime:
      result = newUrl.apiSparaTime
      break


    default:
      break
  }

  return result
};

function setContext(strContext) {
  strContext
    ? (context = strContext) : null
}

function apiExportWord(obj) {
  doRequest(getUrl(apiExportWord), obj)
}

function login(obj) {
  doRequest(getUrl(login), obj)
}

function getAccountList(obj) {
  doRequest(getUrl(getAccountList), obj)
}

function apicourse(obj) {
  doRequest(getUrl(apicourse), obj)
}

function apiCollegeList(obj) {
  doRequest(getUrl(apiCollegeList), obj)
}

function apiCollegeUpdate(obj) {
  doRequest(getUrl(apiCollegeUpdate), obj)
}

function apiCollegeDelete(obj) {
  doRequest(getUrl(apiCollegeDelete), obj)
}

function apiCollegeCreate(obj) {
  doRequest(getUrl(apiCollegeCreate), obj)
}

function apiTeacherList(obj) {
  doRequest(getUrl(apiTeacherList), obj)
}

function apiTeacherCreate(obj) {
  doRequest(getUrl(apiTeacherCreate), obj)
}

function apiTeacherUpdate(obj) {
  doRequest(getUrl(apiTeacherUpdate), obj)
}

function apiTeacherDelete(obj) {
  doRequest(getUrl(apiTeacherDelete), obj)
}

function apiTeacherListByCid(obj) {
  doRequest(getUrl(apiTeacherListByCid), obj)
}

function apiTeacherInfo(obj) {
  doRequest(getUrl(apiTeacherInfo), obj)
}

function apiUserList(obj) {
  doRequest(getUrl(apiUserList), obj)
}

function apiUserCreate(obj) {
  doRequest(getUrl(apiUserCreate), obj)
}

function apiUserUpdate(obj) {
  doRequest(getUrl(apiUserUpdate), obj)
}

function apiUserDelete(obj) {
  doRequest(getUrl(apiUserDelete), obj)
}

function apiUserListByName(obj) {
  doRequest(getUrl(apiUserListByName), obj)
}

function apiUserListByRole(obj) {
  doRequest(getUrl(apiUserListByRole), obj)
}

function apiCourseList(obj) {
  doRequest(getUrl(apiCourseList), obj)
}

function apiUploadExcel(obj) {
  doRequest(getUrl(apiUploadExcel), obj)
}

function apiProfessional(obj) {
  doRequest(getUrl(apiProfessional), obj)
}


function apiAllRole(obj) {
  doRequest(getUrl(apiAllRole), obj)
}

function apiSparaTime(obj) {
  doRequest(getUrl(apiSparaTime), obj)
}



function getQueryUrl(tempUrl, params) {
  if (params && !isDebug) {
    return `${tempUrl}?${JSON.stringify(params)}`
  } else {
    return tempUrl
  }
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
      url: getQueryUrl(mUrl, obj.params ? obj.params : null),
      method: obj.method ? obj.method : 'POST',
      body: obj.body ? obj.body : {},
      params: obj.params ? obj.params : {},
      headers: obj.headers ? obj.headers : {},
      timeout: obj.timeout ? obj.timeout : 15000,
      before: obj.before ? obj.before : null,
      progress: obj.progress ? obj.progress : null,
      credientials: obj.credientials ? obj.credientials : true,
      emulateHTTP: obj.emulateHTTP ? obj.emulateHTTP : true,
      emulateJSON: obj.emulateJSON ? obj.emulateJSON : false
    },
    loginMeta: obj.loginMeta ? obj.loginMeta : null,
    body: obj.body ? obj.body : {},
    success: obj.success ? obj.success : null,
    error: obj.error ? obj.error : null,
    complete: obj.complete ? obj.complete : null
  }
}

function doRequest(mUrl, obj) {
  var requertParams = packObj(mUrl, obj)
  commonUtils.log('--api.js---requertParams', requertParams, mUrl)

  Vue
    .http
    .interceptors
    .push(function(request, next) {
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
      .then(function(res) {
        commonUtils.log('--api.js---post success  response:', res.body)
        if (res.data.code === -1) {
          window.location = `${location.origin}/sas/login?from=${context.$route.name}`
        } else {
          if (requertParams.success) {
            requertParams.success(res)
          }
          if (requertParams.complete) {
            requertParams.complete(res)
          }
        }
      }, function(res) {
        commonUtils.log('--api.js---post error  response:', res.body)
        if (requertParams.error) {
          requertParams.error(res)
        }
        if (requertParams.complete) {
          requertParams.complete(res)
        }
      })
  } else {
    Vue
      .http
      .get(requertParams.options.mUrl, requertParams.option)
      .then(function(res) {
        commonUtils.log('--api.js---get success  response:', res.body)
        if (requertParams.success) {
          requertParams.success(res)
        }
      }, function(res) {
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
  getAccountList,
  apicourse,
  apiCollegeList,
  apiCollegeUpdate,
  apiCollegeDelete,
  apiCollegeCreate,
  apiTeacherList,
  apiTeacherCreate,
  apiTeacherUpdate,
  apiTeacherDelete,
  apiTeacherListByCid,
  apiTeacherInfo,
  apiUserList,
  apiUserCreate,
  apiUserUpdate,
  apiUserDelete,
  apiUserListByName,
  apiUserListByRole,
  apiCourseList,
  apiUploadExcel,
  apiExportWord,
  apiProfessional,
  apiAllRole,
  apiSparaTime
}