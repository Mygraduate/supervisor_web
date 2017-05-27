/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 22:32:03
*/

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  teacherList: [],
  allTeacherList: [],

  totalElements: 0
}

const getters = {
  getTeacherList: function (state) {
    return state.teacherList
  },
  getAllTeacherList: function (state) {
    let tempArray = [
      {
        value: '无',
        id: '',
        name: '无'
      }
    ]
    if (state.allTeacherList.length > 0) {
      for (let element of state.allTeacherList) {
        tempArray.push(Object.assign({}, element, {value: element.name}))
      }

    }

    return tempArray

  },

  getTeacherListTotalElements: function (state) {
    return state.totalElements
      ? state.totalElements
      : state.teacherList.length
  }

}

const actions = {
  requestTeacherList({
    commit
  }, obj) {
    api.apiTeacherList({
      params: {
        pageNo: obj.page
          ? obj.page
          : 1,
        pageSize: obj.pageSize
          ? obj.pageSize
          : 10,
        tname: obj.tname
          ? obj.tname
          : null,
        title: obj.title
          ? obj.title
          : null,
        cid: Number(localStorage.getItem('loginCollegeId'))
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setTeacherList',
            teacherList: res.data.data && res.data.data.content
              ? res.data.data.content
              : [],
            totalElements: res.data.data && res.data.data.totalElements
              ? res.data.data.totalElements
              : 0
          })
        }
        obj.success
          ? obj.success(res)
          : null
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
  requestTeacherListAll({
    commit
  }, obj) {
    api.apiTeacherListAll({
      params: {
        cid: Number(localStorage.getItem('loginCollegeId'))
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setAllTeacherList',
            teacherList: res.data.data
              ? res.data.data
              : []
          })
        }
        obj.success
          ? obj.success(res)
          : null
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

  requestTeacherUpdate({
    commit,
    dispatch
  }, obj) {
    api.apiTeacherUpdate({
      body: obj.body
        ? obj.body
        : null,
      showMsg: true,

      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestTeacherList'})
        }
        obj.success
          ? obj.success(res)
          : null
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
  requestTeacherDelete({
    commit,
    dispatch
  }, obj) {
    api.apiTeacherDelete({
      body: obj.body
        ? obj.body
        : null,
      showMsg: true,
      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestTeacherList'})
        }
        obj.success
          ? obj.success(res)
          : null
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
  requestTeacherCreate({
    commit,
    dispatch
  }, obj) {
    api.apiTeacherCreate({
      body: obj.body
        ? obj.body
        : null,
      showMsg: true,
      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestTeacherList'})
        }
        obj.success
          ? obj.success(res)
          : null
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
  requestTeacherInfo({
    commit,
    dispatch
  }, obj) {
    api.apiTeacherInfo({
      body: obj.body
        ? obj.body
        : null,
      success: (res) => {
        obj.success
          ? obj.success(res)
          : null
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
  setTeacherList(state, {teacherList, totalElements}) {
    state.teacherList = teacherList
    state.totalElements = totalElements
  },
  setAllTeacherList(state, {teacherList, totalElements}) {
    state.allTeacherList = teacherList
  },
  resetTeacherState(state) {
    state.teacherList = []
    state.allTeacherList = []

    state.totalElements = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
