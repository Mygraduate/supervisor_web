/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 07:46:49
 */

'use strict'
require('./FeedbackIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import Vue from 'vue'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'
import FeedbackTableComponment from './componments/FeedbackTable'

Vue.component(FeedbackTableComponment.name, FeedbackTableComponment)

export default {
  name : 'cc-ReferCourseIndex',
  data() {
    return {defaultStatus: 1, currentPage: 1, tableResetAll: false}
  },

  beforeCreate : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:created')
    let that = this
    that.requestEveluateList({})

  },
  beforeMount : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:mounted')

  },
  updated : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:updated')
  },
  activated : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:beforeDestroy')
    this.resetEveluateListState()
  },
  destroyed : function () {
    commonUtils.log('--ReferCourseIndex.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getEveluateList', 'getEveluateListTotalElements'])
  },
  methods : {
    ...mapMutations(['resetEveluateListState']),
    ...mapActions(['requestEveluateList']),
    /**
     *
     * 页面指示器改变
     * @param {any} page
     */
    tableCurrentChange({
      page,
      searchTeacherInput,
      selectedWeek,
      selectedDay,
      selectedStatus,
      selectedDate
    }) {
      let that = this
      that.currentPage = page
      let startime = ''
      let endtime = ''
      if (selectedDate && selectedDate[0] && selectedDate[1]) {
        try {
          startime = new Date(selectedDate[0]).format('yyyy-MM-dd')
          endtime = new Date(selectedDate[1]).format('yyyy-MM-dd')
        } catch (error) {}

      }
      that.requestEveluateList({page, teacher: searchTeacherInput, startime, endtime})
    },
    /**
     *
     * 临时表/确认表重置按钮
     */
    tableResetClick: function () {
      let that = this
      that.resetTableData()
      that.requestEveluateList({})
    },

    /**
     * 重置列表
     *
     */
    resetTableData: function () {
      let that = this
      that.tableResetAll = !that.tableResetAll
      that.currentPage = 1
    },
    /**
     * 搜索按钮
     *
     */
    tableSearchClick: function ({searchTeacherInput, selectedDay, selectedStatus, selectedWeek, selectedDate}) {
      let that = this
      let startime = ''
      let endtime = ''
      if (selectedDate && selectedDate[0] && selectedDate[1]) {
        try {
          startime = new Date(selectedDate[0]).format('yyyy-MM-dd')
          endtime = new Date(selectedDate[1]).format('yyyy-MM-dd')
        } catch (error) {}

      }
      that.requestEveluateList({teacher: searchTeacherInput, startime, endtime})
    },

    tableItemDownload: function (index,rowObj) {
      let that = this
      console.log(rowObj)
      if (rowObj.arrageId) {

        window.open(`${window.location.protocol}//${window.location.host}/sas/api/evaluate/download?arrageId=${rowObj.arrageId}`)

      } else {
        commonUtils.showMsg({context: that, msg: '没有听课安排'})
      }
    }

  }
}
