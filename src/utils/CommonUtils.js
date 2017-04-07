/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 21:10:20
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-05 20:19:38
 */

'use strict'
import {MessageBox, Indicator} from 'mint-ui'
import * as appConfig from './AppConfig'

module.exports = {
  log: function (msg1, msg2, msg3, msg4, msg5, msg6, msg7) {
    if (appConfig.isDebugLog) {
      if (msg7) {
        console.log(msg1, msg2, msg3, msg4, msg5, msg6, msg7)
      } else if (msg6) {
        console.log(msg1, msg2, msg3, msg4, msg5, msg6)
      } else if (msg5) {
        console.log(msg1, msg2, msg3, msg4, msg5)
      } else if (msg4) {
        console.log(msg1, msg2, msg3, msg4)
      } else if (msg3) {
        console.log(msg1, msg2, msg3)
      } else if (msg2) {
        console.log(msg1, msg2)
      } else {
        console.log(msg1)
      }
    }
  },
  // get getProjectName
  getProjectName: function () {
    var wholePath = window.document.location.href
    var pathName = window.document.location.pathname
    var localhostPath = wholePath.substring(0, wholePath.indexOf(pathName))
    let isInclude = 0
    var projectName = '/ip-healthmanager-mobile-web/mydoctor'

    if (appConfig.isDebugLog) {
      console.log('--api.js---当前完整路径：', wholePath)
      console.log('--api.js---获取主机地址之后的目录', pathName)
      console.log('--api.js---主机地址:', localhostPath)
      console.log('--api.js---带/的项目名:', projectName)
    }

    return projectName
  },
  // show toast
  showToast: function (obj) {
    if (!obj.context) {
      return
    }

    var that = obj.context

    that.$toast({
      message: obj.msg
        ? obj.msg
        : '',
      position: obj.position
        ? obj.position
        : 'bottom',
      duration: obj.duration
        ? obj.duration
        : 1000
    })
  },

  // create uuid
  getUUID: function () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)

    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },

  // showMsgBox
  showMsgBox: function (obj) {
    obj.context
      ? (obj.context.$alert(obj.msg
        ? obj.msg
        : 'Hello', obj.title
        ? obj.title
        : '提示', {
          type: obj.type
          ? obj.type
          : 'warning',
          showCancelButton: obj.showCancelButton
          ? obj.showCancelButton
          : false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            obj.beforeClose
            ? obj.beforeClose(action, instance, done)
            : null
          }
        }).then((action) => {
          obj.complete
          ? obj.complete(action)
          : null
        }))
      : null
  },

  showMsg: function (obj) {
    obj.context
      ? (obj.context.$message({
        message: obj.msg,
        type: obj.type
          ? obj.type
          : 'warning'
      }))
      : null
  },

  // changeUrl
  changeUrlParam: function (name, value) {
    var url = window.location.href
    var newUrl = ''
    var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)')
    var tmp = name + '=' + value
    if (url.match(reg) != null) {
      newUrl = url.replace(eval(reg), tmp)
    } else {
      if (url.match('[\?]')) {
        newUrl = url + '&' + tmp
      } else {
        newUrl = url + '?' + tmp
      }
    }
    location.href = newUrl
  },

  get50SrcUrl: function (strUrl) {
    var tempurl = strUrl.substr(0, strUrl.lastIndexOf('.'))
    var format = strUrl.substr(strUrl.lastIndexOf('.'))

    return tempurl + '_s50' + format
  },

  get100SrcUrl: function (strUrl) {
    var tempurl = strUrl.substr(0, strUrl.lastIndexOf('.'))

    var format = strUrl.substr(strUrl.lastIndexOf('.'))

    return tempurl + '_s100' + format
  },

  getUserAgent: function () {
    var u = navigator.userAgent
    var app = navigator.appVersion
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == ' qq' // 是否QQ
    }
  },

  getIsImageUrl: function (url) {
    var reg = /([^\s]+(?=\.(jpg|gif|png|jpeg))\.\2)/gi
    return !!url.match(reg)
  },

  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window
      .location
      .search
      .substr(1)
      .match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },

  containChinese: function (strUrl) {
    return !!strUrl.match(/[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g)
  },

  tranChineseUrlToURI: function (strUrl) {
    let tempStr = strUrl
    const matches = strUrl.match(/[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g)
    matches.forEach(function (item) {
      tempStr = tempStr.replace(item, encodeURIComponent(item))
    })
    return tempStr
  },

  getFileSize: function (file) {
    try {
      return files.size / 1024
    } catch (error) {}
  },

  getUrlFromBlob: function (blobUrl) {
    return blobUrl.substr(5)
  },

  // check is Url
  checkIsURL: function (str) {
    return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g)
  },

  // get url
  getUrlFromString: function (str) {
    return str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g)
  },

  getCompleteFullDomainUrl: function () {
    let tempUrl = window.location.href
    let matches = tempUrl.match('ip-healthmanager-mobile-web')
    let domain = tempUrl.substr(0, tempUrl.indexOf(matches)) + matches + '/'
    return domain
  },

  getSpecifyUrl: function (strKey) {
    if (strKey) {
      let tempUrl = window.location.href
      let matches = tempUrl.match(strKey)
      let strUrl = tempUrl.substr(0, tempUrl.indexOf(matches)) + matches
      return strUrl
    }
  },

  clearPayLocalStorage: function () {
    try {
      localStorage.removeItem('payModuleOrderId')
      localStorage.removeItem('payModuleRouter')
      localStorage.removeItem('payModuleProductId')
      localStorage.removeItem('payModuleDoctorOpenId')
      localStorage.removeItem('payModuleSource')
      localStorage.removeItem('payModulePayResult')
    } catch (error) {}
  },
  getQueryString: function (strUrl, strKey) {
    try {
      var reg = new RegExp('(^|&)' + strKey + '=([^&]*)(&|$)')
      var r = strUrl
        .substr(0)
        .match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    } catch (error) {
      return null
    }
  },
  isColors: function (value) {
    // hexColors rgbColors
    return '/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/'.test(value) || '/^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[' +
      '0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/g'.test(value)
  }

}
