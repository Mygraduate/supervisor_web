/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 14:08:07
 */

'use strict'
require('./ReferCourseIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import Vue from 'vue'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

import CourseArrageTableComponment from '../../../components/CourseArrageTable'
import CreateByHandDialogComponment from './componments/CreateByHandDialog'

Vue.component(CourseArrageTableComponment.name, CourseArrageTableComponment)
Vue.component(CreateByHandDialogComponment.name, CreateByHandDialogComponment)

export default {
  name: 'cc-ReferCourseIndex',
  data() {
    return {defaultStatus: 1, currentPage: 1, tableResetAll: false, createByHandDialogData: {}, showCreateByHandDialog: false}
  },
  beforeCreate: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeCreate')
  },
  created: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:created')
    let that = this
    that.requestArrageList({status: that.defaultStatus})
    setTimeout(() => {
      that.requestUserListAll({
        roleId: 2,
        cid: localStorage.getItem('loginCollegeId')
      })
    }, 1000)

  },
  beforeMount: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeMount')
  },
  mounted: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:mounted')

  },
  updated: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:updated')
  },
  activated: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:activated')
  },
  deactivated: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeDestroy')
    this.resetConfirmTableListState()
    this.resetUserState()
    this.resetReferState()
  },
  destroyed: function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:destroyed')
  },
  computed: {
    ...mapGetters(['getConfirmTableList', 'getConfirmTableListTotalElements', 'getUserListAll', 'getOptimalUserList'])
  },
  methods: {
    ...mapMutations(['resetConfirmTableListState', 'resetUserState', 'resetReferState']),
    ...mapActions([
      'requestArrageList',
      'apiRequestArrageDelete',
      'apiArrageAutoCreate',
      'requestUserListAll',
      'requestArrargeCreate',
      'requestSparaTimeOptimal'
    ]),
    /**
     *
     * 页面指示器改变
     * @param {any} page
     */
    tableCurrentChange({page, searchTeacherInput, selectedWeek, selectedDay, selectedStatus}) {
      let that = this
      that.currentPage = page

      that.requestArrageList({
        page,
        status: selectedStatus || that.defaultStatus,
        teacher: searchTeacherInput,
        week: selectedWeek,
        day: selectedDay
      })
    },
    /**
     *
     * 临时表/确认表重置按钮
     */
    tableResetClick: function () {
      let that = this
      that.resetTableData()
      that.requestArrageList({status: that.defaultStatus})
    },

    /**
     * 重置列表
     *
     */
    resetTableData: function () {
      let that = this
      that.tableResetAll = !that.tableResetAll
      that.comfirmTableCurrentPage = 1
    },
    /**
     * 搜索按钮
     *
     */
    tableSearchClick: function ({searchTeacherInput, selectedDay, selectedStatus, selectedWeek}) {
      let that = this
      that.requestArrageList({
        status: selectedStatus || that.defaultStatus,
        week: selectedWeek,
        day: selectedDay,
        teacher: searchTeacherInput
      })
    },

    /**
     * 多选删除
     *
     */
    tableMultiplyDelete: function ({setlectedItemsList}) {
      let that = this
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确认删除',
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            let {apiRequestArrageDelete} = that
            let body = []
            for (const value of setlectedItemsList) {
              if (value && value.id) {
                body.push(value.id)
              }
            }
            apiRequestArrageDelete({body, status: that.defaultStatus})
            done()
          }
        }
      })
    },

    /**
     *item删除
     *
     * @param {any} index
     * @param {any} item
     */
    tableItemDelete: function (index, item) {
      let that = this
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确认删除',
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            that.apiRequestArrageDelete({
              body: [item.id],
              status: that.defaultStatus
            })
            done()
          }
        }
      })
    },

    /**
     * 打开手动排课 窗口
     *
     */
    openArrargeByHandDialog: function (index, item) {
      let that = this
      that.requestSparaTimeOptimal({
        collegeId: item.collegeId
          ? item.collegeId
          : null,
        week: item.course && item.course.week
          ? item.course.week
          : null,
        day: item.course && item.course.day
          ? item.course.day
          : null,
        scope: item.course && item.course.scope
          ? item.course.scope
          : null
      })
      that.createByHandDialogData = item
      that.showCreateByHandDialog = true
    },

    /**
     * 关闭手动排课 窗口
     *
     */
    closeArrargeByHandDialog: function () {
      let that = this
      that.createByHandDialogData = {}
      that.showCreateByHandDialog = false
    },
    commitCreateArrageByHand: function (groupsValue, dialogData) {
      let that = this
      let tempGrops = ''
      for (const value of groupsValue) {
        tempGrops = `${tempGrops},${value}`
      }

      that.requestArrargeCreate({
        body: {
          arrage: Object.assign({}, dialogData, {
            groups: tempGrops.substring(1)
          })
        },
        success(res) {
          that.closeArrargeByHandDialog()
          that.requestArrageList({status: that.defaultStatus})
        }
      })
    }
  }
}
