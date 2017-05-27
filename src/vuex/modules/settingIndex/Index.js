/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-24 16:59:17

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  collegeList: [],
  collegeListTotalElements: 0
}

const getters = {
  getCollegeList: function (state) {
    return state.collegeList
  },

  getCollegeListTotalElements: function (state) {
    return state.collegeListTotalElements
  }

}

const actions = {
  requestCollegeList ({
    commit
  }, obj) {
    api.apiCollegeList({
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
          commit({type: 'setCollegeList', collegeList: res.data.data.content, collegeListTotalElements: res.data.data.totalElements})
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
  },

  requestCollegeUpdate ({
    commit,
    dispatch
  }, obj) {
    api.apiCollegeUpdate({
      body: obj.body
        ? obj.body
        : {},
      showMsg: true,
      success: (res) => {
        dispatch({type: 'requestCollegeList'})

        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
        } else {
          obj.error
            ? obj.error(res)
            : null
        }
      },
      error: (res) => {
        obj.error
          ? obj.error(res)
          : null
      },
      complete: (res) => {
        obj.complete
          ? obj.complete(res)
          : null
      }
    })
  },
  requestCollegeDelete ({
    commit,
    dispatch
  }, obj) {
    api.apiCollegeDelete({
      body: obj.body
        ? obj.body
        : {},
      showMsg: true,
      success: (res) => {
        dispatch({type: 'requestCollegeList'})
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
        } else {
          obj.error
            ? obj.error(res)
            : null
        }
      },
      error: (res) => {
        obj.error
          ? obj.error(res)
          : null
      },
      complete: (res) => {
        obj.complete
          ? obj.complete(res)
          : null
      }
    })
  },
  requestCollegeCreate ({
    commit,
    dispatch
  }, obj) {
    api.apiCollegeCreate({
      body: obj.body
        ? obj.body
        : {},
      success: (res) => {
        dispatch({type: 'requestCollegeList'})
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
        } else {
          obj.error
            ? obj.error(res)
            : null
        }
      },
      error: (res) => {
        obj.error
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
  setCollegeList (state, {collegeList, collegeListTotalElements}) {
    state.collegeList = collegeList
    state.collegeListTotalElements = collegeListTotalElements
  },
  resetCollegeListState (state) {
    state.collegeList = []
    state.collegeListTotalElements = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
