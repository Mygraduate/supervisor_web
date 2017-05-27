/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 02:15:48
 */

'use strict'
require('./IndexHome.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import CourseArrageTableComponment from '../../../components/CourseArrageTable'
import AutoCreateDialogComponment from './componments/AutoCreateDialog'
import ChangeStatusDialogComponment from './componments/ChangeStatusDialog'

import Vue from 'vue'
// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

Vue.component(CourseArrageTableComponment.name, CourseArrageTableComponment)
Vue.component(AutoCreateDialogComponment.name, AutoCreateDialogComponment)
Vue.component(ChangeStatusDialogComponment.name, ChangeStatusDialogComponment)

export default {
  name : 'cc-index',
  data() {
    return {
      searchInput: '',
      activeTab: 'tempTable',
      formLabelWidth: '120',

      comfirmTableResetAll: false,
      tempTableResetAll: false,

      comfirmTableCurrentPage: 1,
      tempTableCurrentPage: 1,

      changeStatusDialogData: {
        course: {
          name: ''
        }
      },
      showChangeStatusDialog: false,

      showAutoCreateDialog: false,
      autoCreateMode: 'create',
      autoCreatDialogReset: false,

      selectStatusList: [
        {
          name: '未确定',
          value: 0
        }, {
          name: '已确定',
          value: 1
        }, {
          name: '待执行',
          value: 2
        }, {
          name: '已执行',
          value: 3
        }

      ]
    }
  },
  beforeCreate : function () {
    commonUtils.log('--Index.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--Index.Vue--Lifecycle:created')
    let that = this
    that.requestArrageList({})
  },
  beforeMount : function () {
    commonUtils.log('--Index.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    commonUtils.log('--Index.Vue--Lifecycle:mounted')
  },
  updated : function () {
    commonUtils.log('--Index.Vue--Lifecycle:updated')
  },
  activated : function () {
    commonUtils.log('--Index.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--Index.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--Index.Vue--Lifecycle:beforeDestroy')
    this.resetConfirmTableListState()
  },
  destroyed : function () {
    commonUtils.log('--Index.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getConfirmTableList', 'getConfirmTableListTotalElements']),

    /**
     * 过滤0状态
     *
     * @returns
     */
    getFillterConfirmTableSelectStatusList: function () {
      let {selectStatusList} = this
      return selectStatusList.filter((value) => {
        return value.value !== 0
      })
    }
  },
  watch : {

    /**
     * tab切换
     *
     * @param {any} value
     */
    activeTab: function (value) {
      let that = this
      that.resetConfirmTableListState()
      if (value === 'comfirmTable') {
        that.resetTempTableData()
        that.requestArrageList({status: 1})
      } else if (value === 'tempTable') {
        that.resetConfirmTableData()
        that.requestArrageList({status: 0})
      } else if (value === 'sendLog') {
        that.resetConfirmTableData()
        that.resetTempTableData()
      }
    },
    showChangeStatusDialog: function (value) {
      if (!value) {
        this.changeStatusDialogData = {
          course: {
            name: ''
          }
        }
      }
    }
  },
  methods : {
    ...mapMutations(['resetConfirmTableListState']),
    ...mapActions(['requestArrageList', 'apiRequestArrageDelete', 'apiRequestArrageUpdate', 'apiArrageAutoCreate']),
    /**
     *
     * 临时表、确认表页面指示器改变
     * @param {any} page
     */
    tableCurrentChange({page, searchTeacherInput, selectedWeek, selectedDay, selectedStatus}) {
      let that = this
      alert(page)
      let defaultStatus = 0
      if (that.activeTab === 'comfirmTable') {
        alert(page)

        defaultStatus = 1
        that.comfirmTableCurrentPage = page
      } else if (that.activeTab === 'tempTable') {
        alert(page)

        that.tempTableCurrentPage = page
      }
      that.requestArrageList({
        page,
        status: selectedStatus || defaultStatus,
        teacher: searchTeacherInput,
        week: selectedWeek,
        day: selectedDay
      })
    },

    /**
     * 临时表、确认表搜索按钮
     *
     */
    tableSearchClick: function ({searchTeacherInput, selectedDay, selectedStatus, selectedWeek}) {
      let that = this
      let defaultStatus = 0
      if (that.activeTab === 'comfirmTable') {
        that.comfirmTableCurrentPage = 1
        defaultStatus = 1
      } else if (that.activeTab === 'tempTable') {
        that.tempTableCurrentPage = 1
      }
      that.requestArrageList({
        status: selectedStatus || defaultStatus,
        week: selectedWeek,
        day: selectedDay,
        teacher: searchTeacherInput
      })
    },

    /**
     *
     * 临时表/确认表重置按钮
     */
    tableResetClick: function () {
      let that = this
      let defaultStatus = 0
      if (that.activeTab === 'comfirmTable') {
        defaultStatus = 1
        that.resetConfirmTableData()
      } else if (that.activeTab === 'tempTable') {
        that.resetTempTableData()
      }

      that.requestArrageList({status: defaultStatus})
    },

    /**
     *临时表、确认表item删除
     *
     * @param {any} index
     * @param {any} item
     */
    tableItemDelete: function (index, item) {
      let that = this
      let defaultStatus = 0
      if (that.activeTab === 'comfirmTable') {
        defaultStatus = 1
      }
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确认删除',
        showCancelButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            that.apiRequestArrageDelete({
              body: [item.id],
              status: defaultStatus
            })
            done()
          }
        }
      })
    },
    /**
     * 临时表、确认表多选删除
     *
     */
    tableMultiplyDelete: function ({setlectedItemsList}) {
      let that = this
      let defaultStatus = 0
      if (that.activeTab === 'comfirmTable') {
        defaultStatus = 1
      }
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
            apiRequestArrageDelete({body, status: defaultStatus})
            done()
          }
        }
      })
    },
    /**
     * 重置确认表data
     *
     */
    resetConfirmTableData: function () {
      let that = this
      that.comfirmTableResetAll = !that.comfirmTableResetAll
      that.comfirmTableCurrentPage = 1
    },
    /**
     * 重置临时表data
     *
     */
    resetTempTableData: function () {
      let that = this
      that.tempTableResetAll = !that.tempTableResetAll
      that.autoCreatDialogReset = !that.autoCreatDialogReset

      that.tempTableCurrentPage = 1
      that.autoCreateMode = 'create'
    },

    /**
     * 打开修改状态窗口
     *
     * @param {any} index
     * @param {any} item
     */
    openUpateStatusDialog: function (index, item) {
      this.changeStatusDialogData = item
      this.showChangeStatusDialog = true
    },
    /**
     * 关闭修改状态窗口
     *
     * @param {any} index
     * @param {any} item
     */
    closeUpateStatusDialog: function () {
      this.showChangeStatusDialog = false
    },
    /**
     * 确认修改状态
     *
     */
    updateItemStatus: function ({itemNewStatus}) {
      let that = this
      let body = [
        {
          id: that.changeStatusDialogData.id,
          status: itemNewStatus
        }
      ]
      that.apiRequestArrageUpdate({
        body,
        complete(res) {
          that.showChangeStatusDialog = false
        }
      })
    },
    /**
     * 打开自动排课窗口
     *
     */
    openAutoCreateDialog: function () {
      let that = this
      that.showAutoCreateDialog = true
    },
    /**
     * 关闭自动排课窗口
     *
     */
    closeAutoCreateDialog: function () {
      let that = this
      that.showAutoCreateDialog = false
    },

    /**
     * 自动排课确定按钮
     *
     */
    requestAutoCreateCourse: function ({
      apercent,
      dayListen,
      endWeek,
      maxPeople,
      minPeople,
      startDay,
      startWeek,
      total,
      weekListen
    }) {
      let that = this
      let {apiArrageAutoCreate, autoCreateMode} = that
      if (typeof(apercent) !== 'number' || typeof(dayListen) !== 'number' || typeof(endWeek) !== 'number' || typeof(maxPeople) !== 'number' || typeof(minPeople) !== 'number' || typeof(startDay) !== 'number' || typeof(startWeek) !== 'number' || typeof(total) !== 'number' || typeof(weekListen) !== 'number' || maxPeople < minPeople || (!apercent > 0) || startWeek > endWeek) {
        commonUtils.showMsg({context: that, msg: '配置错误，请重新配置后再确定'})
        return
      }

      apiArrageAutoCreate({
        mode: autoCreateMode,
        apercent,
        dayListen,
        endWeek,
        maxPeople,
        minPeople,
        startDay,
        startWeek,
        total,
        weekListen,
        success(res) {
          that.autoCreateMode = 'replace'
        },
        complete(res) {
          that.showAutoCreateDialog = false
        }
      })
    }
  }

}
