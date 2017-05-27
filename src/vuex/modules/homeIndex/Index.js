/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-24 19:26:07

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  confirmTableList: [],
  totalElements: 0
}

const getters = {
  getConfirmTableList: function (state) {
    return state.confirmTableList
  },

  getConfirmTableListTotalElements: function (state) {
    return state.totalElements
  }

}

const actions = {
  requestArrageList ({
    commit
  }, obj) {
    api.apiArrageList({
      params: {
        pageNo: obj.page
          ? obj.page : 1,
        pageSize: obj.pageSize
          ? obj.pageSize : 10,
        status: obj.status
          ? obj.status : 0,
        week: obj.week
          ? obj.week : null,
        day: obj.day
          ? obj.day : null,
        teacher: obj.teacher
          ? obj.teacher : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setConfirmTableList',
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
  },
  apiRequestArrageDelete ({
    commit,
    dispatch
  }, obj) {
    api.apiArrageDelete({
      body: obj.body
        ? obj.body : null,
      showMsg: true,
      success: (res) => {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
          dispatch({
            type: 'requestArrageList',
            status: obj.status
              ? obj.status : 0
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
  },

  apiRequestArrageUpdate ({
    commit,
    dispatch
  }, obj) {
    api.apiArrageUpdate({
      body: obj.body
        ? obj.body : null,
      showMsg: true,
      success: (res) => {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
          dispatch({
            type: 'requestArrageList',
            status: obj.status
              ? obj.status : 0
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
  },

  apiArrageAutoCreate ({
    commit,
    dispatch
  }, obj) {
    api.apiArrageAutoCreate({
      params: {
        cid: Number(localStorage.getItem('loginCollegeId')),
        mode: obj.mode
          ? obj.mode : 'create'
      },
      body: {
        apercent: obj.apercent
          ? obj.apercent : null,
        dayListen: obj.dayListen
          ? obj.dayListen : null,
        endWeek: obj.endWeek
          ? obj.endWeek : null,
        maxPeople: obj.maxPeople
          ? obj.maxPeople : null,
        minPeople: obj.minPeople
          ? obj.minPeople : null,
        startDay: obj.startDay
          ? obj.startDay : null,
        startWeek: obj.startWeek
          ? obj.startWeek : null,
        total: obj.total
          ? obj.total : null,
        weekListen: obj.weekListen
          ? obj.weekListen : null

      },
      showMsg: true,
      success: (res) => {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
          dispatch({
            type: 'requestArrageList',
            status: obj.status
              ? obj.status : 0
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
  setConfirmTableList (state, {
    content,
    totalElements
  }) {
    state.confirmTableList = content
    state.totalElements = totalElements
  },
  resetConfirmTableListState (state) {
    state.confirmTableList = []
    state.totalElements = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
