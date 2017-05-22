/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 10:59:44

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  supervisorList: [],
  totalElements: 0
}

const getters = {
  getSupervisorList: function (state) {
    let tempResult = []
    for (const value of state.supervisorList) {
      let obj = {
        collegeId: '',
        day: '',
        week: '',
        course: '',
        userId: '',
        id: '',
        userName:'',
        des:'',
        subWeek:'',
        subDay:'',
        subCourse:''
      }

      obj.collegeId = value.cid
        ? value.cid
        : ''
      obj.day = value.day
        ? value.day
        : ''
      obj.course = value.scope
        ? value.scope
        : ''
      obj.week = value.week
        ? value.week
        : ''
       obj.subWeek = value.week
        ?  `第${value.week}周`
        : ''
      obj.id = value.id
        ? value.id
        : ''
      obj.userId = value.user && value.user.id
        ? value.user.id
        : ''
      obj.userName = value.user && value.user.username
        ? value.user.username
        : ''
      tempResult.push(obj)
    }
    return tempResult
  },
  getSupervisorListElements: function (state) {
    return state.totalElements
  }

}

const actions = {
  requestSupervisorList ({
    commit
  }, obj) {
    api.apiSparaTime({
      params: {
        pageNo: obj.page
          ? obj.page
          : 1,
        pageSize: obj.pageSize
          ? obj.pageSize
          : 10,
        uid: obj.userId
          ? obj.userId
          : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setSupervisorList',
            content: res.data.data.content
              ? res.data.data.content
              : [],
            totalElements: res.data.data.totalElements
              ? res.data.data.totalElements
              : 0
          })
        }
      }
    })
  }
}

const mutations = {
  setSupervisorList (state, {content, totalElements}) {
    state.supervisorList = content
    state.totalElements = totalElements
  },

  resetSupervisiorState (state) {
    state.supervisorList = []
    state.totalElements = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
