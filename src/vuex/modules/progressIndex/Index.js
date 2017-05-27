/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 20:56:41

 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  content: [],
  professionalList: [],
  totalElements: 0,
  allCollegeList: []
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
  },
  getAllCollegeList: function (state) {
    return state.allCollegeList
  }

}

const actions = {
  requestProfessional({
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
  requestCollegeAll({
    commit
  }, obj) {
    api.apiCollegeListAll({
      success(res) {
        commit({
          type: 'setAllCollegeList',
          content: res.data && res.data.data
            ? res.data.data
            : []
        })
      }
    })
  },

  requestCourseList({
    commit
  }, obj) {
    api.apiCourseList({
      params: {
        pageNo: obj.page
          ? obj.page
          : 1,
        pageSize: obj.pageSize
          ? obj.pageSize
          : 10,
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
          : null,
        teacher: obj.teacher
          ? obj.teacher
          : null,
        major: obj.major
          ? obj.major
          : null,
        isArrange: obj.isArrange
          ? obj.isArrange
          : null,
        grade: obj.grade
          ? obj.grade
          : null,
        classes: obj.classes
          ? obj.classes
          : null,
        address: obj.address
          ? obj.address
          : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({type: 'setCourseList', content: res.data.data.content, totalElements: res.data.data.totalElements})
        }
      }
    })
  },
  requestExportWord({
    commit
  }, obj) {
    window.open(`${window.location.protocol}//${window.location.host}/sas/api/word/export?cid=${obj.collegeId
        ? obj.collegeId
        : ''}&teacher=${obj.teacher
          ? obj.teacher
          : ''}&week=${obj.week
            ? obj.week
            : ''}&major=${obj.major
              ? obj.major
              : ''}&day=${obj.day
                ? obj.day
                : ''}`)
  }

}

const mutations = {
  setCourseList(state, {content, totalElements}) {
    state.content = content
    state.totalElements = totalElements
  },

  setProfessionalList(state, {content, totalElements}) {
    state.professionalList = content
  },

  setAllCollegeList(state, {content}) {
    state.allCollegeList = content
  },
  resetProgressContent(state, obj) {
    state.professionalList = []
    state.content = []
    state.allCollegeList = []

    state.totalElements = 0
  },
  resetProfessionalList(state, obj) {
    state.professionalList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
