/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-24 12:13:49
 */

'use strict'
require('./SettingIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'cc-SettingIndex',
  data () {
    return {
      dialogTitle: '添加学院',
      dialogForm: {
        id: '',
        des: '',
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogType: 'ADD',
      btnOKDisable: true,
      multipleSelection: [],
      btnDeleteDisable: true,
      dialogTitle: ''
    }
  },
  beforeCreate: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:beforeCreate')
  },
  created: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:created')
    let that = this
    that.requestCollegeList({
      page: that.$route.query.page
        ? that.$route.query.page
        : 1
    })
  },
  beforeMount: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:beforeMount')
  },
  mounted: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:mounted')
  },
  updated: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:updated')
    let that = this
    that.btnOKDisable = !(that.dialogForm.name.trim().length > 0)
  },
  activated: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:activated')
  },
  deactivated: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:beforeDestroy')
    this.resetCollegeListState()
  },
  destroyed: function () {
    commonUtils.log('--SettingIndex.Vue--Lifecycle:destroyed')
  },
  computed: {
    ...mapGetters(['getCollegeList', 'getCollegeListTotalElements'])
  },
  watch: {
    multipleSelection: function (value) {
      this.btnDeleteDisable = !(value.length > 0)
    }
  },
  methods: {
    ...mapMutations(['resetCollegeListState']),
    ...mapActions(['requestCollegeList', 'requestCollegeUpdate', 'requestCollegeDelete', 'requestCollegeCreate']),
    handleCurrentChange (page) {
      let that = this
      that
        .$router
        .replace({
          name: that.$route.name,
          query: {
            ...that.$route.query,
            page
          }
        })
      that.requestCollegeList({page})
    },
    showDialog (form) {
      console.log(form)
      let that = this
      if (form) {
        that.dialogForm = Object.assign({}, form)
        that.dialogType = 'UPDATE'
        that.dialogTitle = '修改学院信息'
      } else {
        that.dialogType = 'ADD'
        that.dialogTitle = '增加学院'
      }
      that.dialogFormVisible = true
    },
    handleDialogCancel () {
      let that = this
      that.dialogFormVisible = false
      that.resetDialogForm()
    },
    handleDialogOk () {
      let that = this
      that.dialogFormVisible = false
      let tempObj = {
        body: that.dialogForm,
        success: (res) => {},
        error: (res) => {},
        complete: (res) => {
          that.resetDialogForm()
        }
      }

      if (that.dialogType === 'UPDATE') {
        that.requestCollegeUpdate(tempObj)
      } else {
        that.requestCollegeCreate(tempObj)
      }
    },
    resetDialogForm () {
      let that = this
      that.dialogForm = {
        id: '',
        des: '',
        name: ''
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (index, rowObj) {
      let that = this
      commonUtils.showMsgBox({
        context: that,
        msg: '是否确定删除？',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            let body = []
            if (rowObj) {
              body.push(rowObj)
            }
            if (that.multipleSelection.length > 0) {
              body = body.concat(that.multipleSelection)
            }
            that.requestCollegeDelete({
              body,
              success: (res) => {},
              error: (res) => {},
              complete: (res) => {}
            })
            done()
          }
        }
      })
    }
  }
}
