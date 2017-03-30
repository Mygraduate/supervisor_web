/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-03-30 15:41:42
 */

'use strict'
require('./css/app.css')
import api from './utils/Api'
import commonUtils from './utils/CommonUtils'

// 路由
import router from './router'
// 状态集中管理
import {mapState, mapGetters, mapActions} from 'vuex'
import * as mActions from './vuex/Actions'
import * as mGetters from './vuex/Getters'
import * as mMutations from './vuex/Mutations'

export default {
  name : 'cc-app',
  data : function () {
    return {transitionName: 'slide-left'}
  },
  beforeCreate : function () {},
  created : function () {

    if (this.$route.name === undefined) {
      this
        .$router
        .push({name: 'indexHome'})
    }
  },
  beforeMount : function () {},
  mounted : function () {},
  updated : function () {},
  activated : function () {},
  deactivated : function () {},
  beforeDestroy : function () {},
  destroyed : function () {},
  computed : {},
  methods : {}
}
