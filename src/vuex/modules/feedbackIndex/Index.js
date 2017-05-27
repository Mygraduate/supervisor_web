/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 00:51:22

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  eveluateList:[],
  totalElements:0
}

const getters = {
  getEveluateList: function (state) {
    return state.eveluateList
  },

  getEveluateListTotalElements: function (state) {
    return state.totalElements
  }

}

const actions = {
  requestEveluateList ({
    commit
  }, obj) {
    api.apiEveluateList({
      params: {
        pageNo: obj.page
          ? obj.page : 1,
        pageSize: obj.pageSize
          ? obj.pageSize : 10,
        creator:obj.creator?obj.creator:null,
        startime:obj.startime?obj.startime:null,
        endtime:obj.endtime?obj.endtime:null,
        teacher: obj.teacher
          ? obj.teacher : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setEveluateList',
            content: res.data.data && res.data.data.content
              ? res.data.data.content : [],
            totalElements: res.data.data && res.data.data.totalElements
              ? res.data.data.totalElements : 0
          })
        }
      },
      error: (res) => {
        obj.complete
          ? obj.error(res)
          : null
      },
      complete: (res) => {
        obj.complete
          ? obj.complete(res)
          : null
      }
    })
  }
}

const mutations = {
  setEveluateList (state, {
    content,
    totalElements
  }) {
    state.eveluateList = content
    state.totalElements = totalElements
  },
  resetEveluateListState (state) {
    state.eveluateList = []
    state.totalElements = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
