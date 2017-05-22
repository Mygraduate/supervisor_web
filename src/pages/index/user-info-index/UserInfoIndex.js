/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 09:50:02
 */

'use strict'
require('./UserInfoIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

const orginDialogForm = {
  title: '',
  userName: '',
  roleId: '',
  roleName: '',
  phone: '',
  email: '',
  weChatId: '',
  collegeId: null,
  collegeName: '',
  userId: ''
}

export default {
  name : 'cc-UserInfoIndex',
  data() {
    return {
      dialogTitle: '',
      dialogForm: orginDialogForm,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      dialogType: 'ADD',
      btnOKDisable: true,
      multipleSelection: [],
      btnDeleteDisable: true,
      selectedRole: 0,
      searchName: '',
      searchTitle: '',
      searchUsername: ''
    }
  },
  beforeCreate : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:created', this.$route.query)
    let that = this
    that.requestUserList({
      ...that.$route.query
    })

    setTimeout(() => {
      that.requestCollegeList({pageSize: 50})
    }, 200)

    setTimeout(() => {
      that.requestAllRole()
    }, 500)

    const {name, selectedRole, username, title, roleId} = that.$route.query
    that.searchName = name
    that.searchTitle = title
    that.selectedRole = roleId
    that.searchUsername = username
  },
  beforeMount : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:beforeMount')
  },
  mounted : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:mounted', this)
  },
  updated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:updated')
    let that = this
    that.btnOKDisable = !(that.dialogForm.userName.trim().length > 0)
  },
  activated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:beforeDestroy')
  },
  destroyed : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getUserList', 'getCollegeList', 'getUserListTotalElements', 'getRoleList'])
  },
  watch : {
    multipleSelection: function (value) {
      this.btnDeleteDisable = !(value.length > 0)
    }
  },
  methods : {
    ...mapActions([
      'requestUserList',
      'requestCollegeList',
      'requestUserUpdate',
      'requestUserDelete',
      'requestUserCreate',
      'requestAllRole'
    ]),
    getCurrentPage() {
      let that = this
      return that.$route.query.page
        ? Number(that.$route.query.page)
        : 1
    },
    handleCurrentChange(page) {
      let that = this
      let tempQuery = {
        ...that.$route.query,
        page,
        roleId: that.selectedRole
      }
      that.replaceRouter(tempQuery)

      that.requestUserList(tempQuery)
    },
    showDialog(form) {
      // console.log(form)
      let that = this
      if (form) {
        that.dialogForm = {
          ...orginDialogForm,
          ...form
        }
        that.dialogType = 'UPDATE'
        that.dialogTitle = '修改用户信息'
      } else {
        that.dialogType = 'ADD'
        that.dialogTitle = '增加用户'
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
        body: that.dialogForm,
        success: (res) => {},
        error: (res) => {},
        complete: (res) => {
          that.resetDialogForm()
        }
      }

      if (that.dialogType === 'UPDATE') {
        that.requestUserUpdate(tempObj)
      } else {
        that.requestUserCreate(tempObj)
      }
    },
    resetDialogForm() {
      let that = this
      that.dialogForm = orginDialogForm
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
            that.requestUserDelete({
              body,
              success: (res) => {},
              error: (res) => {},
              complete: (res) => {}
            })
            done()
          }
        }
      })
    },
    handleSelectedRoleChange() {
      let that = this
      let page = that.$route.query.page || 1
      alert('handleSelectedRoleChange')
      that.handleCurrentChange(page)
    },
    handleSearch() {
      let that = this
      let tempSearchBody = {
        username: that.searchUsername,
        name: that.searchName,
        title: that.searchTitle,
        roleId: that.selectedRole,
        page: 1
      }
      that.replaceRouter({
        ...that.$route.query,
        ...tempSearchBody
      })
      that.requestUserList(tempSearchBody)
    },
    resetSearchInput() {
      let that = this
      that.searchUsername = ''
      that.searchName = ''
      that.searchTitle = ''
      that.selectedRole = 0
      that.replaceRouter()
    },
    replaceRouter(obj) {
      let that = this
      that
        .$router
        .replace({
          name: that.$route.name,
          query: obj || null
        })
    }
  }
}
