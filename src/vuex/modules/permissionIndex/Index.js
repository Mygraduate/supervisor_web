/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-05-13 09:07:52
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-05-13 09:07:52
 */


'use strict'

import * as commonUtils from '../../../utils/CommonUtils'

import * as api from '../../../utils/Api'

const state = {
  permissionList: [],
}

const getters = {
  getPermissionList: function (state) {
   return state.permissionList
 }
}

const actions = {

}

const mutations = {
setPermissionList(state, obj) {

  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
