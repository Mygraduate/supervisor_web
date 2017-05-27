/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-27 08:33:36
 */

'use strict'
import commonUtils from '../../utils/CommonUtils'
import Vue from 'vue'
import * as api from '../../utils/Api'
import {LOCAL_STORAGE_TOKEN} from '../../utils/LocalStorage'

// vuex
import {mapGetters, mapActions, mapMutations} from 'vuex'

import {INPUT_LOGIN_ACCOUNT, INPUT_LOGIN_PWD, RESET_LOGIN_FORM} from '../../vuex/modules/login/Mutations'
import {GET_INPUT_ACCOUNT, GET_INPUT_PWD} from '../../vuex/modules/login/Getters'

import Field from '../../components/cc-field/CCField'
Vue.component(Field.name, Field)
export default {
  currentPageName : 'login',
  data() {
    return {}
  },
  components : {},
  computed : {
    ...mapGetters({getInputAccount: GET_INPUT_ACCOUNT, getInputPWD: GET_INPUT_PWD}),
    inputAccountModel: {
      get() {
        return this.getInputAccount
      },
      set(e) {
        this.inputAccount({value: e})
      }
    },
    inputPWDModel: {
      get() {
        return this.getInputPWD
      },
      set(e) {
        this.inputPWD({value: e})
      }
    }
  },
  methods : {
    ...mapMutations({inputAccount: INPUT_LOGIN_ACCOUNT, inputPWD: INPUT_LOGIN_PWD, resetLoginForm: RESET_LOGIN_FORM}),
    goLogin: function () {
      let that = this
      if (that.getInputAccount.trim().length > 0 && this.getInputPWD.trim().length > 0) {
        api.login({
          body: {
            username: that.getInputAccount,
            password: that.getInputPWD
          },
          success: function (res) {
            let query = null
            if (res.data && res.data.data && res.data.data.token) {
              localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.data.token)
              localStorage.setItem('loginUserId', res.data.data.user.id)
              localStorage.setItem('loginCollegeId', res.data.data.user.user.college.id)
              localStorage.setItem('loginRoleId', res.data.data.user.roleId)
              localStorage.setItem('loginRoleName', res.data.data.user.role.name)

              query = {
                userId: res.data.data.user.id,
                collegeId: res.data.data.user.user.college.id,
                roleId: res.data.data.user.roleId
              }
            }

            if (res.data.code === 1) {
              let name
              if (commonUtils.getQueryString(commonUtils.getAllParamsStr(), 'from')) {
                name = commonUtils.getQueryString(commonUtils.getAllParamsStr(), 'from')
              } else {
                if (res.data.data.user.roleId === 2) {
                  name = 'indexHome'
                } else if (res.data.data.user.roleId === 3) {
                  name = 'supervisorPage'
                } else {
                  name = 'userPage'
                }
              }

              if (name) {
                that
                  .$router
                  .push({name, query})
              } else {
                commonUtils.showMsg({context: that, msg: '非法登录'})
              }
            }

            // if (that.$route.query.from) {   that.$router.push({     name:
            // that.$route.query.from   }) }
          }
        })
      } else {
        commonUtils.showMsg({context: that, msg: '请输入完整账号和密码'})
      }
    }
  }
}
