/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 09:46:58
*/

'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  userList: [],
  roleList: [],
  totalElements: 0
}

const getters = {
  getRoleList: function (state) {
    return state.roleList
  },
  getUserList: function (state) {
    let tempList = []

    for (const value of state.userList) {
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
  },

  getUserListTotalElements: function (state) {
    return state.totalElements
      ? state.totalElements
      : state.userList.length
  }

}

const actions = {
  requestAllRole ({
    commit
  }, obj) {
    api.apiAllRole({
      success: (res) => {
        if (res.data.code === 1) {
          commit({
            type: 'setRoleList',
            content: res.data.data
              ? res.data.data
              : []
          })
        }
      }
    })
  },
  requestUserList ({
    commit
  }, obj) {
    api.apiUserList({
      params: {
        pageNo: obj.page
          ? obj.page
          : 1,
        pageSize: obj.pageSize
          ? obj.pageSize
          : 10,
        roleId: obj.roleId
          ? obj.roleId
          : null,
        cid: obj.cid
          ? obj.cid
          : null,
        title: obj.title
          ? obj.title
          : null,
        name: obj.name
          ? obj.name
          : null, // 	老师姓名
        username: obj.username
          ? obj.username
          : null, // 用户账号
        uid: obj.uid
          ? obj.uid
          : null //
      },
      success: (res) => {
        if (res.data.code === 1) {
          commit({type: 'setUserList', userList: res.data.data.content, totalElements: res.data.data.totalElements})
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

  requestUserUpdate ({
    commit,
    dispatch
  }, obj) {
    api.apiUserUpdate({
      body: obj.body
        ? obj.body
        : null,
      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestUserList'})
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
  requestUserDelete ({
    commit,
    dispatch
  }, obj) {
    api.apiUserDelete({
      body: obj.body
        ? obj.body
        : null,
      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestUserList'})
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
  requestUserCreate ({
    commit,
    dispatch
  }, obj) {
    api.apiUserCreate({
      body: obj.body
        ? obj.body
        : null,
      success: (res) => {
        if (res.data.code === 1) {
          dispatch({type: 'requestUserList'})
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
  }

}

const mutations = {
  setRoleList (state, {content}) {
    state.roleList = content
  },
  setUserList (state, {userList, totalElements}) {
    state.userList = userList
    state.totalElements = totalElements
  },
  resetUserState (state) {
    state.roleList = []
    state.userList = []
    state.totalElements = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
