/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-04-02 19:18:30
 */

'use strict'
import commonUtils from '../../utils/CommonUtils'
import timeUtils from '../../utils/TimeUtils'
import Vue from 'vue'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../vuex/Actions'
import * as mGetters from '../../vuex/Getters'
import * as mMutations from '../../vuex/Mutations'
import {Field} from 'mint-ui'
Vue.component(Field.name, Field)
export default {
  currentPageName : 'login',
  data() {
    return {}
  },
  components : {},
  computed : {},
  methods : {}
}
