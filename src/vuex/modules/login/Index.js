'use strict'

import {GET_INPUT_ACCOUNT, GET_INPUT_PWD} from './Getters'

import {INPUT_LOGIN_ACCOUNT, INPUT_LOGIN_PWD, RESET_LOGIN_FORM} from './Mutations.js'

import * as commonUtils from '../../../utils/CommonUtils'

const state = {
  inputAccount: '',
  inputPWD: ''
}

const getters = {
  [GET_INPUT_ACCOUNT]: function (state) {
    return state.inputAccount
  },
  [GET_INPUT_PWD]: function (state) {
    return state.inputPWD
  }
}

const actions = {}

const mutations = {
  [INPUT_LOGIN_ACCOUNT] (state, obj) {
    state.inputAccount = (obj.value
      ? obj.value
      : '')
  },
  [INPUT_LOGIN_PWD] (state, obj) {
    state.inputPWD = (obj.value
      ? obj.value
      : '')
  },
  [RESET_LOGIN_FORM] (state, obj) {
    state.inputAccount = ''
    state.inputPWD = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
