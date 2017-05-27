/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-23 12:52:27
 */

'use strict'
require('./Index.css')
import api from '../../utils/Api'
import commonUtils from '../../utils/CommonUtils'

// 状态集中管理
import {mapState, mapGetters, mapActions} from 'vuex'
import * as mActions from '../../vuex/Actions'
import * as mGetters from '../../vuex/Getters'
import * as mMutations from '../../vuex/Mutations'

export default {
  name : 'index',
  data : function () {
    return {transitionName: 'slide-left', selectedMenu: ''}
  },
  beforeCreate : function () {},
  created : function () {
    if (this.$route.name === undefined || this.$route.name === 'index') {
      commonUtils.log(this)
      this.selectedMenu = 'indexHome'

      this
        .$router
        .push({name: 'indexHome'})
    } else {
      this.selectedMenu = this.$route.name
    }
  },
  beforeMount : function () {},
  mounted : function () {},
  updated : function () {},
  activated : function () {},
  deactivated : function () {},
  beforeDestroy : function () {},
  destroyed : function () {},
  computed : {

    getRoleName: function () {
      return localStorage.getItem('loginRoleName')
    }
  },
  watch : {
    $route: function (value) {
      let that = this
      that.selectedMenu = value.name
    }
  },
  methods : {

    handleCommand: function (command) {
      let that = this
      alert(command)
      if (command === 'logout') {
        that
          .$router
          .push({name: 'login'})
        localStorage.clear()
      }
    },
    getRoleId: function () {
      return Number(localStorage.getItem('loginRoleId'))
    }
  }
}
