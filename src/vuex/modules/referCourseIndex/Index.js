/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-24 20:55:08

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  optimalUserList: []
}

const getters = {
  getOptimalUserList (state) {
    let tempList = []

    for (const value of state.optimalUserList) {
      let tempObj = {
        title: value.user && value.user.teacher && value.user.teacher.title
          ? value.user.teacher.title
          : '',
        userName: value.user && value.user.username
          ? value.user.username
          : '',
        roleId: value.role && value.role.id
          ? value.role.id
          : '',
        roleName: value.role && value.role.name
          ? value.role.name
          : '',
        phone: value.user && value.user.phone
          ? value.user.phone
          : '',
        email: value.user && value.user.email
          ? value.user.email
          : '',
        weChatId: value.user && value.user.wecat
          ? value.user.wecat
          : '',
        collegeId: value.user && value.user.college && value.user.college.id
          ? value.user.college.id
          : '',
        collegeName: value.user && value.user.college && value.user.college.name
          ? value.user.college.name
          : '',
        userId: value.user && value.user.id
          ? value.user.id
          : ''
      }

      tempList.push(tempObj)
    }

    return tempList
  }
}

const actions = {
  requestArrargeCreate ({
    dispatch
  }, obj) {
    api.apiArrageCreate({
      body: obj.body
        ? obj.body
        : null,
      showMsg: true,
      success (res) {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
        }
      },
      error (res) {
        obj.error
          ? obj.error(res)
          : null
      },
      complete (res) {
        obj.complete
          ? obj.complete(res)
          : null
      }
    })
  },
  requestSparaTimeOptimal ({
    commit
  }, obj) {
    api.apiSparaTimeOptimal({
      params: {
        cid: obj.collegeId
          ? obj.collegeId
          : null,
        week: obj.week
          ? obj.week
          : null,
        day: obj.day
          ? obj.day
          : null,
        scope: obj.scope
          ? obj.scope
          : null
      },
      success (res) {
        if (res.data.code === 1) {
          commit({type: 'setOptimalUserList', content: res.data.data ? res.data.data : []})
          obj.success
            ? obj.success(res)
            : null
        }
      },
      error (res) {
        obj.error
          ? obj.error(res)
          : null
      },
      complete (res) {
        obj.complete
          ? obj.complete(res)
          : null
      }
    })
  }
}

const mutations = {
  setOptimalUserList (state, {content}) {
    state.optimalUserList = content
  },
  resetReferState (state) {
    state.optimalUserList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
