/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 08:21:27
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
  userId: '',
  teacherName: '',
  teacherId: '',
  tableId: '',
  password: ''
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
      multipleSelection: [],
      btnDeleteDisable: true,
      selectedRole: 0,
      searchName: '',
      searchTitle: '',
      searchUsername: '',
      rule: {
        userName: [
          {
            required: true,
            message: '此参数不能为空'
          }
        ],
        collegeId: [
          {
            required: true,
            message: '此参数不能为空'
          }
        ],
        roleId: [
          {
            required: true,
            message: '此参数不能为空'
          }
        ],
        phone: [
          {
            type: 'number',
            message: '此参数必须为数字值'
          }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'change'
          }
        ],
        weChatId: [
          {
            required: true,
            message: '此参数不能为空'
          }
        ],
        password: [
          {
            required: true,
            message: '此参数不能为空'
          }
        ]
      }
    }
  },
  beforeCreate : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:beforeCreate')
  },
  created : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:created', this.$route.query)
    let that = this
    that.requestUserList({
      ...that.$route.query,
      page: 1,
      pageSize: 10
    })

    setTimeout(() => {
      that.requestCollegeAll({})
    }, 200)

    setTimeout(() => {
      that.requestAllRole()
    }, 500)

    if (Number( localStorage.getItem('loginRoleId')) !==  1) {
      setTimeout(() => {
        that.requestTeacherListAll({})
      }, 800)
    }

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
    this.selectedRole = 0
  },
  updated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:updated')
    let that = this
  },
  activated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:activated')
  },
  deactivated : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:beforeDestroy')
    this.resetUserState()
    this.resetTeacherState()
  },
  destroyed : function () {
    commonUtils.log('--UserInfoIndex.Vue--Lifecycle:destroyed')
  },
  computed : {
    ...mapGetters(['getUserList', 'getAllCollegeList', 'getUserListTotalElements', 'getRoleList', 'getAllTeacherList']),
    getBtnSearchDisabled: function () {
      let {selectedRole, searchName, searchTitle, searchUsername} = this
      return !(selectedRole >= 0 || (searchName && searchName.trim().length > 0) || (searchTitle && searchTitle.trim().length > 0) || (searchUsername && searchUsername.trim().length > 0))
    },
    getDialogOkDisabled: function () {
      let {
        title,
        userName,
        roleId,
        roleName,
        phone,
        email,
        weChatId,
        collegeId,
        collegeName,
        userId,
        teacherName,
        teacherId,
        tableId,
        password
      } = this.dialogForm
      return !(roleId > 0 && userName.trim().length > 0 && collegeId > 0 && password.trim().length > 0 && weChatId.trim().length > 0)
    },
    getShowTeacherName: function () {
      return Number( localStorage.getItem('loginRoleId'))  !== 1
    }
  },
  watch : {
    multipleSelection: function (value) {
      this.btnDeleteDisable = !(value.length > 0)
    }
  },
  methods : {
    ...mapMutations(['resetUserState', 'resetTeacherState']),
    ...mapActions([
      'requestUserList',
      'requestCollegeList',
      'requestUserUpdate',
      'requestUserDelete',
      'requestUserCreate',
      'requestAllRole',
      'requestTeacherListAll',
      'requestCollegeAll'
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
        pageSize: 10,
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
          ...form,
          tableId: form.tableId
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
      let body = {}
      if (that.dialogType === 'UPDATE') {
        body = {
          id: that.dialogForm.tableId
            ? that.dialogForm.tableId
            : null,
          roleId: that.dialogForm.roleId,
          uid: that.dialogForm.userId,
          user: {
            cid: that.dialogForm.collegeId,
            tid: that.dialogForm.teacherId,
            password: that.dialogForm.password,
            username: that.dialogForm.userName,
            wecat: that.dialogForm.weChatId,
            email: that.dialogForm.email,
            phone: that.dialogForm.phone,
            id: that.dialogForm.userId
          }
        }
      } else {
        body = {
          roleId: that.dialogForm.roleId,

          cid: that.dialogForm.collegeId,
          tid: that.dialogForm.teacherId,
          password: that.dialogForm.password,
          username: that.dialogForm.userName,
          wecat: that.dialogForm.weChatId,
          email: that.dialogForm.email,
          phone: that.dialogForm.phone

        }
      }

      let tempObj = {
        body,
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
      that.dialogForm = Object.assign({}, {
        title: '',
        userName: '',
        roleId: '',
        roleName: '',
        phone: '',
        email: '',
        weChatId: '',
        collegeId: null,
        collegeName: '',
        userId: '',
        teacherName: '',
        teacherId: '',
        tableId: '',
        password: ''
      })
      that
        .$refs
        .dynamicValidateForm
        .resetFields()
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
            if (rowObj && rowObj.tableId) {
              body.push({id: rowObj.tableId})
            }
            if (that.multipleSelection.length > 0) {
              body = body.concat(that.multipleSelection.map((value) => {
                return {id: value.tableId}
              }))
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
        page: 1,
        pageSize: 10
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
      that.requestUserList({page: 1, pageSize: 10})
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
