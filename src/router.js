/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-05-25 21:51:23
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 14:45:14
 */


'use strict'

import VueRouter from 'vue-router'
import Vue from 'vue'
import commonUtils from './utils/CommonUtils'
import api from './utils/Api'

Vue.use(VueRouter)

// 懒加载
const App = resolve => require(['./App.vue'], resolve)
const Index = resolve => require(['./pages/index/Index.vue'], resolve)
const IndexHome = resolve => require(['./pages/index/home-index/IndexHome.vue'], resolve)
const ProgressIndex = resolve => require(['./pages/index/progress-index/ProgressIndex.vue'], resolve)
const ReferCourseIndex = resolve => require(['./pages/index/refer-course-index/ReferCourseIndex.vue'], resolve)
const SettingIndex = resolve => require(['./pages/index/setting-index/SettingIndex.vue'], resolve)
const SupervisorIndex = resolve => require(['./pages/index/supervisor-index/SupervisorIndex.vue'], resolve)
const TeacherInfoIndex = resolve => require(['./pages/index/teacher-info-index/TeacherInfoIndex.vue'], resolve)
const UserInfoIndex = resolve => require(['./pages/index/user-info-index/UserInfoIndex.vue'], resolve)
const FeedbackIndex = resolve => require(['./pages/index/feedback-index/FeedbackIndex.vue'], resolve)

const Login = resolve => require(['./pages/login/Login.vue'], resolve)

const routes = [
  {
    path: '/sas',
    component: App,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index,
        children: [
          {
            path: 'indeHome',
            name: 'indexHome',
            component: IndexHome
          }, {
            path: 'progressPage',
            name: 'progressPage',
            component: ProgressIndex
          },{
            path: 'referCoursePage',
            name: 'referCoursePage',
            component: ReferCourseIndex
          }, {
            path: 'settingPage',
            name: 'settingPage',
            component: SettingIndex
          }, {
            path: 'supervisorPage',
            name: 'supervisorPage',
            component: SupervisorIndex
          }, {
            path: 'teacherInfoPage',
            name: 'teacherInfoPage',
            component: TeacherInfoIndex
          }, {
            path: 'feedbackPage',
            name: 'feedbackPage',
            component: FeedbackIndex
          },
           {
            path: 'userPage',
            name: 'userPage',
            component: UserInfoIndex
          }
        ]
      },
       {
        path: 'login',
        name: 'login',
        component: Login
      }
    ]
  }
]

// 路由
const router = new VueRouter({routes: routes, linkActiveClass: 'active',mode:'history'})

// 全局钩子
router.beforeEach(function (to, from, next) {
  commonUtils.log('--main.js--router beforeEach from:', from, '  to:', to, next)
  if (to.name) {
    next()
  } else {
    next({name: 'index'})
  }
})

router.afterEach(function () {
  commonUtils.log('--main.js--router:afterEach')

})

export default router
