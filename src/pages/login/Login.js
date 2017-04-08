/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-08 21:01:19
 */

'use strict'
import commonUtils from '../../utils/CommonUtils'
import Vue from 'vue'

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
      if (that.getInputAccount.trim().length > 0 && this.getInputPWD.trim().length > 0) {} else {
        commonUtils.showMsg({context: that, msg: '请输入完整账号和密码'})
      }
    }
  }
}
