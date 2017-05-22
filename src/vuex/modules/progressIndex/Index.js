/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 00:45:01

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  content: [],
  professionalList: [],
  totalElements: 0
}

const getters = {
  getCourseList: function (state) {
    return state.content
  },
  getProfessionalList: function (state) {
    return state.professionalList
  },
  getCourseListElements: function (state) {
    return state.totalElements
  }

}

const actions = {
  requestProfessional ({
    commit
  }, obj) {
    api.apiProfessional({
      params: {
        tid: obj.tid
          ? obj.tid
          : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setProfessionalList',
            content: res.data.data
              ? res.data.data
              : []
          })
        }
      }
    })
  },

  requestCourseList ({
    commit
  }, obj) {
    api.apiCourseList({
      params: {
        pageNo: obj.page
          ? obj.page
          : 1,
        pageSize: obj.pageSize
          ? obj.pageSize
          : 10
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({type: 'setCourseList', content: res.data.data.content, totalElements: res.data.data.totalElements})
        }
      }
    })
  }

}

const mutations = {
  setCourseList (state, {content, totalElements}) {
    state.content = content
    state.totalElements = totalElements
  },

  setProfessionalList (state, {content, totalElements}) {
    state.professionalList = content
  },
  resetProgressContent (state) {
    state.content = []
    state.totalElements = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
