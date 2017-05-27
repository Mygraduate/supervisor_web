/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 13:43:42
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 00:38:55
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './modules/login/Index'
import ProgressIndexModule from './modules/progressIndex/Index'
import SettingIndexModule from './modules/settingIndex/Index'
import TeacherIndexModule from './modules/teacherIndex/Index'
import UserIndexModule from './modules/userIndex/Index'
import HomeIndexModule from './modules/homeIndex/Index'
import FeedbackIndexModule from './modules/feedbackIndex/Index'

import SupervisorIndexModule from './modules/supervisorindex/Index'

import ReferIndexModule from './modules/referCourseIndex/Index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ProgressIndexModule,
    LoginModule,
    SettingIndexModule,
    TeacherIndexModule,
    UserIndexModule,
    SupervisorIndexModule,
    HomeIndexModule,
    ReferIndexModule,
    FeedbackIndexModule
  },
  strict: process.env.NODE_ENV !== 'production' // 是否开启严格模式
})

export default store
