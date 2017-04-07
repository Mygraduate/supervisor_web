/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-05 20:23:20
 */

'use strict'
import commonUtils from '../../utils/CommonUtils'
import Vue from 'vue'

// vuex
import {mapGetters, mapActions} from 'vuex'

import {login, inputAccount, inputPWD} from '../../vuex/modules/login/Actions'
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
        inputAccount(this.$store, {value: e})
      }
    },
    inputPWDModel: {
      get() {
        return this.getInputPWD
      },
      set(e) {
        inputPWD(this.$store, {value: e})
      }
    }
  },
  methods : {
    ...mapActions({login, inputAccount, inputPWD}),
    goLogin: function () {
      let that = this
      if (that.getInputAccount.trim().length > 0 && this.getInputPWD.trim().length > 0) {} else {
        commonUtils.showMsg({context: that, msg: '请输入完整账号和密码'})
      }
    }
  }
}
