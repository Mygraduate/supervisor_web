/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 22:36:31

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const courseCount = 11

const state = {
  supervisorList: [],
  totalElements: 0,
  spareList: [],
  wholeSpareTimeList: {
    'day1': [],
    'day2': [],
    'day3': [],
    'day4': [],
    'day5': [],
    'day6': [],
    'day7': []
  }
}

const getters = {
  getSupervisorList: function (state) {
    let tempResult = []
    for (const value of state.supervisorList) {
      let obj = {
        userId: '',
        spareWeek: '',
        userName: '',
        collegeId: '',
        teacherId: ''
      }

      if (value.spareweek && value.spareweek.length > 0) {
        let tempSpareWeek = ''
        for (const spareWeek of value.spareweek) {
          tempSpareWeek = `${tempSpareWeek}${spareWeek},`
        }

        obj.spareWeek = `第${tempSpareWeek}周`
      }

      obj.userId = value.uid
        ? value.uid
        : ''
      obj.userName = value.name
        ? value.name
        : ''
      obj.collegeId = value.cid
        ? value.cid
        : ''
      obj.teacherId = value.tid
        ? value.tid
        : ''
      tempResult.push(obj)
    }
    return tempResult
  },
  getSpareList: function (state) {
    let result = commonUtils.transSpareTimeToDayObj(state.spareList)
    return result
  },
  getWholeSparaList: function (state) {
    return state.wholeSpareTimeList
  },
  getSupervisorListElements: function (state) {
    return state.totalElements
  }

}

const actions = {
  requestSparaTimeUpdate({
    commit,
    dispatch
  }, obj) {
    api.apiSparaTimeUpdate({
      body: obj.body
        ? obj.body
        : null,
      showMsg: true,

      success(res) {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
          dispatch({
            type: 'requestSupervisorList',
            uid: obj.userId
              ? obj.userId
              : null
          })
        }
      }
    })
  },

  requestSupervisorList({
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
        cid: obj.collegeId
          ? obj.collegeId
          : null
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setSupervisorList',
            content: res.data.data && res.data.data.content
              ? res.data.data.content
              : [],
            totalElements: res.data.data && res.data.data.totalElements
              ? res.data.data.totalElements
              : 0
          })
        }
      }
    })
  },
  requestDeleteSparaTime({
    commit,
    dispatch
  }, obj) {
    api.apiSpareDelete({
      body: {
        tid: obj.teacherId
          ? obj.teacherId
          : null
      },
      showMsg: true,

      success: (res) => {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
          dispatch({
            type: 'requestSupervisorList',
            userId: obj.userId
              ? obj.userId
              : ''
          })
        }
      }
    })
  },
  reuqestSpareList({
    commit,
    dispatch,
    state
  }, obj) {
    api.apiSpareList({
      params: {
        uid: obj.id
          ? parseInt(obj.id)
          : '',
        week: obj.week
          ? obj.week
          : ''
      },
      success(res) {
        if (res.data.code === 1) {
          commit({
            type: 'setSpareList',
            content: res.data.data
              ? res.data.data
              : []
          })
          dispatch({
            type: 'transSpareTimeToWholeSpareTime',
            spareList: res.data.data
              ? res.data.data
              : [],
            callback: obj.transSpareTimeToWholeSpareTimeCallBack
              ? obj.transSpareTimeToWholeSpareTimeCallBack
              : null
          })
          obj.success
            ? obj.success(res)
            : null
        }
      }
    })
  },
  reuqestSparaTimeAutoCreate({
    dispatch
  }, obj) {
    api.apiSparaTimeAutoCreate({
      params: {
        uid: obj.userId
          ? Number(obj.userId)
          : '',
        tid: obj.teacherId
          ? obj.teacherId
          : -1,
        start: obj.start
          ? obj.start
          : 1,
        end: obj.end
          ? obj.end
          : 20
      },
      showMsg: true,
      success(res) {
        if (res.data.code === 1) {
          obj.success
            ? obj.success(res)
            : null
        }
      },
      error(res) {
        obj.error
          ? obj.error(res)
          : null
      },
      complete(res) {
        obj.complete
          ? obj.complete(res)
          : null
      }

    })
  },
  transSpareTimeToWholeSpareTime({
    commit
  }, {spareList, callback}) {
    let content = commonUtils.transSpareTimeToWholeSpareTime(spareList, courseCount)

    commit({type: 'setWholeSpareList', content})
  }
}

const mutations = {
  setSupervisorList(state, {content, totalElements}) {
    state.supervisorList = content
    state.totalElements = totalElements
  },

  setSpareList(state, {content, totalElements}) {
    state.spareList = content
  },

  setWholeSpareList(state, {content, totalElements}) {
    state.wholeSpareTimeList = content
  },

  resetSupervisiorState(state) {

    state.supervisorList = []
    state.wholeSpareTimeList = {
      'day1': [],
      'day2': [],
      'day3': [],
      'day4': [],
      'day5': [],
      'day6': [],
      'day7': []
    }

    state.totalElements = 0
    state.spareList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
