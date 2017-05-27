/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 01:57:41
 */

'use strict'
require('./TeacherInfoIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

export default {
  name : 'cc-TeacherInfoIndex',
  data() {
    return {
      dialogTitle: '',
      dialogForm: {
        title: '',
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogType: 'ADD',
      btnOKDisable: true,
      multipleSelection: [],
      btnDeleteDisable: true,
      searchTeacherName: '',
      searchTeacherTitle: ''
    }
  },
  beforeCreate : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:created')
    let that = this
    that.requestTeacherList({
      ...that.$route.query
    })

    // setTimeout(() => {
    //   that.requestCollegeList({pageSize: 50})
    // }, 200)


    const {tname, title} = that.$route.query
    that.searchTeacherName = tname
    that.searchTeacherTitle = title
  },
  beforeMount : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:mounted', this)
  },
  updated : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:updated')
    let that = this
    that.btnOKDisable = !(that.dialogForm.name.trim().length > 0)
  },
  activated : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:beforeDestroy')
    this.resetTeacherState()
  },
  destroyed : function () {
    commonUtils.log('--TeacherInfoIndex.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getTeacherList', 'getTeacherListTotalElements',]),
    getSearchBtnDisable: function () {
      let {searchTeacherName, searchTeacherTitle} = this
      return !((searchTeacherName && searchTeacherName.trim().length > 0) || (searchTeacherTitle && searchTeacherTitle.trim().length > 0))
    }
  },
  watch : {},
  methods : {
    ...mapMutations(['resetTeacherState']),
    ...mapActions(['requestTeacherList', 'requestTeacherUpdate', 'requestTeacherDelete', 'requestTeacherCreate', 'requestTeacherInfo','requestTeacherListAll']),
    handleCurrentChange(page) {
      let that = this
      that.replaceRouter({
        name: that.$route.name,
        query: {
          ...that.$route.query,
          page
        }
      })
    },
    showDialog(form) {
      console.log(form)
      let that = this
      if (form) {
        that.dialogForm = Object.assign({}, form)
        that.dialogType = 'UPDATE'
        that.dialogTitle = '修改教师信息'
      } else {
        that.dialogType = 'ADD'
        that.dialogTitle = '增加教师'
      }
      that.dialogFormVisible = true
    },
    handleDialogCancel() {
      let that = this
      that.dialogFormVisible = false
      that.resetDialogForm()
    },
    handleDialogOk() {
      let that = this
      that.dialogFormVisible = false
      let tempObj = {
        body: Object.assign({}, that.dialogForm, {
          cid: localStorage.getItem('loginCollegeId')
        }),
        success: (res) => {},
        error: (res) => {},
        complete: (res) => {
          that.resetDialogForm()
          that.searchTeacherName = ''
          that.searchTeacherTitle = ''
        }
      }

      if (that.dialogType === 'UPDATE') {
        that.requestTeacherUpdate(tempObj)
      } else {
        that.requestTeacherCreate(tempObj)
      }
    },
    resetDialogForm() {
      let that = this
      that.dialogForm = {
        title: '',
        name: ''
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(index, rowObj) {
      let that = this
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确定删除？',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            let body = []
            body.push(rowObj)
            if (that.multipleSelection.length > 0) {
              body = body.concat(that.multipleSelection)
            }
            that.requestTeacherDelete({
              body,
              success: (res) => {},
              error: (res) => {},
              complete: (res) => {
                that.searchTeacherName = ''
                that.searchTeacherTitle = ''
              }
            })
            done()
          }
        }
      })
    },
    handleSearch() {
      let that = this
      let tempQuery = {
        ...that.$route.query,
        tname: that.searchTeacherName,
        title: that.searchTeacherTitle,
        page: 1
      }
      that.replaceRouter(tempQuery)
    },
    resetSearchInput() {
      let that = this
      that.replaceRouter({})
      this.searchTeacherName = ''
      this.searchTeacherTitle = ''
    },
    replaceRouter(obj) {
      let that = this
      that
        .$router
        .replace(obj)

      that.requestTeacherList({
        ...obj
      })
    },
    getCurrentPage() {
      let that = this
      return that.$route.query.page
        ? Number(that.$route.query.page)
        : 1
    }
  }
}
