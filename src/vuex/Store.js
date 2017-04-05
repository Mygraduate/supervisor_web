/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 13:43:42
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-05 16:05:12
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import Common from './modules/Common.js'
import LoginModule from './modules/login/LoginModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Common,
    LoginModule
  },
  strict: process.env.NODE_ENV !== 'production' //是否开启严格模式
})

export default store
