/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 17:40:52
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-05-27 08:36:48
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

var isDebug = false
let context = ''

const gobalUrl = `${window.location.protocol}//${window.location.host}/sas/api/`

const localUrl = 'http://localhost:8081/HxwDemo'

const debugUrl = {
  login: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd146475-e897-435e-8002-5b801' +
    '4c2ab56',
  apicourse: 'http://test.mhealth100.com/api/mock/trueExam.do?id=4f0114a2-eec3-4d45-894a-2c4ca' +
    '01d3918',
  apiCollegeList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a776b7d6-870a-4f01-8118-68035' +
    '68c495a',
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
  apiExportWord: 'http://test.mhealth100.com/api/mock/trueExam.do',
  apiProfessional: 'http://test.mhealth100.com/api/mock/trueExam.do?id=1ff914cf-d3ef-4f71-8bad-8c477' +
    '289343a',
  apiAllRole: 'http://test.mhealth100.com/api/mock/trueExam.do?id=d89f32b8-6730-40c4-b60c-de243' +
    'af8c299',
  apiSparaTime: 'http://test.mhealth100.com/api/mock/trueExam.do?id=83dc7fac-90dc-44ce-be3a-d8597' +
    'b55baca',
  apiSpareDelete: 'http://test.mhealth100.com/api/mock/trueExam.do?id=83dc7fac-90dc-44ce-be3a-d8597' +
    'b55baca',
  apiSpareList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=02af628f-c43b-4757-9436-ade9e' +
    '5b670e7',
  apiSparaTimeUpdate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=02af628f-c43b-4757-9436-ade9e' +
    '5b670e7',
  apiArrageList: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiArrageDelete: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiArrageUpdate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiArrageAutoCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiSparaTimeAutoCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiArrageCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiArrageCreate: 'http://test.mhealth100.com/api/mock/trueExam.do?id=a9fa1419-ada9-4c1f-9d44-279c8' +
    '32255bf',
  apiSparaTimeOptimal: 'http://test.mhealth100.com/api/mock/trueExam.do?id=5a3ff3a6-3907-4e78-b3fe-fede6' +
    'e69f30a',
  apiTeacherListAll: 'http://test.mhealth100.com/api/mock/trueExam.do?id=49255918-3edd-4998-b2ef-b6f47' +
    '7b1edb4',
  apiCollegeListAll: 'http://test.mhealth100.com/api/mock/trueExam.do?id=88dc1065-43c5-4e9d-99d0-46ce8' +
    '2ecb94c',
  apiUserListAll: 'http://test.mhealth100.com/api/mock/trueExam.do?id=fd95b9fb-4751-4a1d-99d8-19b68' +
    'ab72651',
    apiEveluateList:'http://test.mhealth100.com/api/mock/trueExam.do?id=8919a981-0f1d-4a06-a509-f3b5696f85ad',


}

const realUrl = {
  login: gobalUrl + 'auth/login',
  apicourse: gobalUrl + 'course/page',
  apiCollegeList: gobalUrl + 'college/list',
  apiCollegeUpdate: gobalUrl + 'college/update',
  apiCollegeDelete: gobalUrl + 'college/delete',
  apiCollegeCreate: gobalUrl + 'college/create',
  apiTeacherList: gobalUrl + 'teacher/list',
  apiTeacherCreate: gobalUrl + 'teacher/create',
  apiTeacherUpdate: gobalUrl + 'teacher/update',
  apiTeacherDelete: gobalUrl + 'teacher/delete',
  apiTeacherListByCid: gobalUrl + 'teacher/teacherlistbycid',
  apiTeacherInfo: gobalUrl + 'teacher/teacherinfo',
apiEveluateList:gobalUrl+'evaluate/list',
  apiUserList: gobalUrl + 'account/list',
  apiUserCreate: gobalUrl + 'account/create',
  apiUserUpdate: gobalUrl + 'account/update',
  apiUserDelete: gobalUrl + 'account/delete',
  apiUserListByName: gobalUrl + 'account/userinfobyname',
  apiUserListByRole: gobalUrl + 'account/userRole',
  apiUserListAll: gobalUrl + 'account/list/all',
  apiCourseList: gobalUrl + 'course/page',
  apiUploadExcel: gobalUrl + 'excel/import',
  apiExportWord: gobalUrl + 'word/export',
  apiProfessional: gobalUrl + 'course/list/major',
  apiAllRole: gobalUrl + 'account/role',
  apiSparaTime: gobalUrl + 'sparetime/getsparetime',
  apiSpareDelete: gobalUrl + 'sparetime/delete',
  apiSpareList: gobalUrl + 'sparetime/list',
  apiSparaTimeUpdate: gobalUrl + 'sparetime/update',
  apiArrageList: gobalUrl + 'arrage/list',
  apiArrageDelete: gobalUrl + 'arrage/delete',
  apiArrageUpdate: gobalUrl + 'arrage/update',
  apiArrageAutoCreate: gobalUrl + 'arrage/auto/create',
  apiSparaTimeAutoCreate: gobalUrl + 'sparetime/auto/create',
  apiSparaTimeOptimal: gobalUrl + 'sparetime/page/optimal',
  apiTeacherListAll: gobalUrl + 'teacher/list/all',
  apiCollegeListAll: gobalUrl + 'college/list/all'
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
    case apiSpareDelete:
      result = newUrl.apiSpareDelete
      break

    case apiSpareList:
      result = newUrl.apiSpareList
      break

    case apiSparaTimeUpdate:
      result = newUrl.apiSparaTimeUpdate
      break

    case apiArrageList:
      result = newUrl.apiArrageList
      break

    case apiArrageDelete:
      result = newUrl.apiArrageDelete
      break
    case apiArrageUpdate:
      result = newUrl.apiArrageUpdate
      break
    case apiArrageAutoCreate:
      result = newUrl.apiArrageAutoCreate
      break

    case apiSparaTimeAutoCreate:
      result = newUrl.apiSparaTimeAutoCreate
      break
    case apiArrageCreate:
      result = newUrl.apiArrageCreate
      break

    case apiSparaTimeOptimal:
      result = newUrl.apiSparaTimeOptimal
      break

    case apiTeacherListAll:
      result = newUrl.apiTeacherListAll
      break

    case apiCollegeListAll:
      result = newUrl.apiCollegeListAll
      break


    case apiUserListAll:
      result = newUrl.apiUserListAll
      break

    case apiEveluateList:
      result = newUrl.apiEveluateList
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
  doRequest(`${window.location.protocol}//${window.location.host}/sas/auth/login`, obj)
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

function apiSpareDelete(obj) {
  doRequest(getUrl(apiSpareDelete), obj)
}

function apiSpareList(obj) {
  doRequest(getUrl(apiSpareList), obj)
}

function apiSparaTimeUpdate(obj) {
  doRequest(getUrl(apiSparaTimeUpdate), obj)
}

function apiArrageList(obj) {
  doRequest(getUrl(apiArrageList), obj)
}

function apiArrageDelete(obj) {
  doRequest(getUrl(apiArrageDelete), obj)
}

function apiArrageUpdate(obj) {
  doRequest(getUrl(apiArrageUpdate), obj)
}

function apiArrageAutoCreate(obj) {
  doRequest(getUrl(apiArrageAutoCreate), obj)
}

function apiSparaTimeAutoCreate(obj) {
  doRequest(getUrl(apiSparaTimeAutoCreate), obj)
}

function apiArrageCreate(obj) {
  doRequest(getUrl(apiArrageCreate), obj)
}

function apiSparaTimeOptimal(obj) {
  doRequest(getUrl(apiSparaTimeOptimal), obj)
}

function apiTeacherListAll(obj) {
  doRequest(getUrl(apiTeacherListAll), obj)
}

function apiCollegeListAll(obj) {
  doRequest(getUrl(apiCollegeListAll), obj)
}


function apiUserListAll(obj) {
  doRequest(getUrl(apiUserListAll), obj)
}
function apiEveluateList(obj) {
  doRequest(getUrl(apiEveluateList), obj)
}



function getQueryUrl(tempUrl, params, method) {
  if (params && !isDebug) {
    return `${tempUrl}?${JSON.stringify(params)}`
  } else {
    return tempUrl
  }
}


function packObj(mUrl, obj) {
  if (!obj) {
    obj = {}
    commonUtils.log('--api.js---网络请求obj 为空空空空')
  }

  return {
    options: {
      url: getQueryUrl(mUrl, obj.params ? obj.params : null, obj.method ? obj.method : 'POST'),
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
    complete: obj.complete ? obj.complete : null,
    showMsg: obj.showMsg ? obj.showMsg : false
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
        commonUtils.log('LOCAL_STORAGE_TOKEN', localStorage.getItem(LOCAL_STORAGE_TOKEN))
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
        if (res.data) {

          if (res.data.code === -2) {
            alert(res.data.code)
            if (context.$route.name !== 'login') {
              window.location = `${location.origin}/sas/login?from=${context.$route.name}`
            }
            context.showMsg({
              context,
              msg: res.data.msg ? res.data.msg : '登录失败'
            })
            localStorage.clear()
            if (requertParams.showMsg) {
              commonUtils.showMsg({
                context,
                type: 'error',
                msg: res.data.msg ? res.data.msg : '提交、更新失败'
              })
            }
          } else if (res.data.code === -1) {
            if (requertParams.showMsg) {
              commonUtils.showMsg({
                context,
                type: 'error',
                msg: res.data.msg ? res.data.msg : '请求错误'
              })
            }


          } else {
            if (requertParams.showMsg) {
              commonUtils.showMsg({
                context,
                type: 'success',
                msg: res.data.msg ? res.data.msg : '提交、更新成功'
              })
            }
            if (requertParams.success) {
              requertParams.success(res)
            }

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
      .get(requertParams.options.url, requertParams.options.params)
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
  apiSparaTime,
  apiSpareDelete,
  apiSpareList,
  apiSparaTimeUpdate,
  apiArrageList,
  apiArrageDelete,
  apiArrageUpdate,
  apiArrageAutoCreate,
  apiSparaTimeAutoCreate,
  apiArrageCreate,
  apiSparaTimeOptimal,
  apiTeacherListAll,
  apiCollegeListAll,
  apiUserListAll,
  apiEveluateList
}