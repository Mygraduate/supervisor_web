/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-26 23:04:55
 */

'use strict'
require('./SupervisorIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'
import Vue from 'vue'
// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

let constWholeSparaTime = {
  'day1': [],
  'day2': [],
  'day3': [],
  'day4': [],
  'day5': [],
  'day6': [],
  'day7': []
}

const courseCount = 11

export default {
  name : 'cc-SupervisorIndex',
  data() {
    return {
      btnDeleteDisable: true,
      dialogTitle: '',
      dialogForm: {
        title: '',
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogType: 'ADD',
      selectedWeek: 1,
      listSelectedWeek: 1,
      hang: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      wholeSpareList: Object.assign({}, constWholeSparaTime)
    }
  },
  beforeCreate : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:created')
    let that = this
    that.requestSupervisorList({
      ...that.$route.query,
      collegeId: Number(localStorage.getItem('loginCollegeId'))
    })
  },
  beforeMount : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    let that = this
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:mounted')
  },
  updated : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:updated')
  },
  activated : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeDestroy')
    this.resetSupervisiorState()
  },
  destroyed : function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:destroyed')
  },
  components : {},
  computed : {
    ...mapGetters(['getSupervisorList', 'getSupervisorListElements', 'getWholeSparaList'])
  },
  watch : {
    selectedWeek: function (week) {
      let that = this
      if (that.checkHadChangeCheckBox() && that.dialogFormVisible) {
        commonUtils.showMsgBox({
          context: that,
          msg: '是否保存当前当前督导安排？',
          showCancelButton: true,
          beforeClose(action, instance, done) {
            if (action === 'confirm') {
              that.requestSparaTimeUpdate({
                body: that.getUpdateBody(),
                success(res) {
                  if (week && that.dialogForm.userId) {
                    that.doReuqestSpareList({userId: that.dialogForm.userId, selectedWeek: week})
                  }
                }
              })
            } else if (action === 'cancel') {
              if (week && that.dialogForm.userId) {
                that.doReuqestSpareList({userId: that.dialogForm.userId, selectedWeek: week})
              }
            }
            done()
          }
        })
      } else {
        if (week && that.dialogForm.userId) {
          that.doReuqestSpareList({userId: that.dialogForm.userId, selectedWeek: week})
        }
      }
    }
    // listSelectedWeek: function (value) {   let that=this
    // that.requestSupervisorList({     ...that.$route.query,     coll   }) }

  },
  methods : {
    ...mapMutations(['resetSupervisiorState']),
    ...mapActions(['requestSupervisorList', 'requestDeleteSparaTime', 'reuqestSpareList', 'requestSparaTimeUpdate', 'reuqestSparaTimeAutoCreate']),
    checkHadChangeCheckBox() {
      let that = this
      const {wholeSpareList, getWholeSparaList} = that
      let result = true
      for (let i = 0; i < courseCount; i++) {
        result = wholeSpareList.day1[i] === getWholeSparaList.day1[i] && wholeSpareList.day2[i] === getWholeSparaList.day2[i] && wholeSpareList.day3[i] === getWholeSparaList.day3[i] && wholeSpareList.day4[i] === getWholeSparaList.day4[i] && wholeSpareList.day5[i] === getWholeSparaList.day5[i] && wholeSpareList.day6[i] === getWholeSparaList.day6[i] && wholeSpareList.day7[i] === getWholeSparaList.day7[i]

        if (!result) {
          break
        }
      }
      return !result
    },
    handleSelectionChange() {},
    handleCurrentChange(page) {
      let that = this
      that.replaceRouter({
        name: that.$route.name,
        query: {
          ...that.$route.query,
          page,
          collegeId: Number(localStorage.getItem('loginCollegeId'))
        }
      })
    },
    /**
     * 请求督导员空闲时间
     *
     * @param {any} item
     */
    doReuqestSpareList(item) {
      let that = this
      that.reuqestSpareList({
        id: item.userId,
        week: that.selectedWeek,
        success(res) {
          Object.assign(that.wholeSpareList, commonUtils.transSpareTimeToWholeSpareTime(res.data.data, courseCount))
        }
      })
    },
    /**
     * 显示dialo窗口
     *
     * @param {any} item
     */
    showDialog(item) {
      let that = this
      if (item) {
        that.doReuqestSpareList(item)
        that.dialogForm = Object.assign({}, item)
        that.dialogType = 'UPDATE'
        that.dialogTitle = '修改空闲时间'
      } else {
        that.dialogType = 'ADD'
        that.dialogTitle = '增加督导员'
      }

      that.dialogFormVisible = true
    },
    /**
     * 取消事件
     *
     */
    handleDialogCancel() {
      let that = this
      that.resetDialogForm()
      that.dialogFormVisible = false
      that.requestSupervisorList({
        ...that.$route.query,
        collegeId: Number(localStorage.getItem('loginCollegeId'))
      })
    },

    /**
     * 复位dialog数据
     *
     */
    resetDialogForm() {
      let that = this
      that.dialogForm = {
        title: '',
        name: ''
      }
      Object.assign(that.wholeSpareList, constWholeSparaTime)
      that.selectedWeek = 1
    },
    /**
     * 删除当前Item
     *
     * @param {any} index
     * @param {any} item
     */
    handleDelete(index, item) {
      let that = this
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确认删除',
        showCancelButton: true,
        beforeClose(action, instance, done) {
          if (action === 'confirm') {
            that.requestDeleteSparaTime({
              teacherId: item.userId,
              userId: localStorage.getItem('userId')
            })
            done()
          }
        }
      })
    },
    replaceRouter(obj) {
      let that = this
      that
        .$router
        .replace(obj)

      that.requestSupervisorList({
        ...obj.query
      })
    },

    /**
     * 当前页
     *
     * @returns
     */
    getCurrentPage() {
      let that = this
      return that.$route.query.page
        ? Number(that.$route.query.page)
        : 1
    },
    /**
     * 保存督导时间
     *
     */
    saveSparaTime() {
      let that = this
      that.requestSparaTimeUpdate({
        body: that.getUpdateBody()
      })
    },
    /**
     * 自动填补按钮
     *
     */
    autoCreateSparaTime: function () {
      let that = this
      that.reuqestSparaTimeAutoCreate({
        userId: that.dialogForm.userId
          ? that.dialogForm.userId
          : '',
        teacherId: that.dialogForm.teacherId
          ? that.dialogForm.teacherId
          : -1,
        end: that.selectedWeek,
        start: that.selectedWeek,
        success(res) {
          that.doReuqestSpareList({userId: that.dialogForm.userId})
        }
      })
    },
    /**
     * 转换字符窜
     *
     * @returns
     */
    getUpdateBody() {
      let that = this
      let body = []
      let constJson = {
        week: that.selectedWeek,
        uid: that.dialogForm.userId,
        cid: that.dialogForm.collegeId
      }
      let dayScopeArray = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]
      for (let i = 1; i <= courseCount; i++) {
        if (that.wholeSpareList.day1[i - 1]) {
          dayScopeArray[1] = `${dayScopeArray[1]},${i.toString()}`
        }

        if (that.wholeSpareList.day2[i - 1]) {
          dayScopeArray[2] = `${dayScopeArray[2]},${i.toString()}`
        }
        if (that.wholeSpareList.day3[i - 1]) {
          dayScopeArray[3] = `${dayScopeArray[3]},${i.toString()}`
        }
        if (that.wholeSpareList.day4[i - 1]) {
          dayScopeArray[4] = `${dayScopeArray[4]},${i.toString()}`
        }
        if (that.wholeSpareList.day5[i - 1]) {
          dayScopeArray[5] = `${dayScopeArray[5]},${i.toString()}`
        }
        if (that.wholeSpareList.day6[i - 1]) {
          dayScopeArray[6] = `${dayScopeArray[6]},${i.toString()}`
        }
        if (that.wholeSpareList.day7[i - 1]) {
          dayScopeArray[7] = `${dayScopeArray[7]},${i.toString()}`
        }
      }
      for (let i = 1; i <= 7; i++) {
        body.push(Object.assign({}, constJson, {
          day: i,
          scope: dayScopeArray[i].substring(1)
        }))
      }

      return body
    },
    unSelectAll: function () {
      this.wholeSpareList = Object.assign(this.wholeSpareList, constWholeSparaTime)
    }
  }
}
