/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-03-30 15:54:33
 */

'use strict'
require('./AutoBuildIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'

// vuex
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

export default {
  name: 'Auto-Build-Index',
  data () {
    return {}
  },
  beforeCreate: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:beforeCreate')
  },
  created: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:created')
  },
  beforeMount: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:beforeMount')
  },
  mounted: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:mounted')
  },
  updated: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:updated')
  },
  activated: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:activated')
  },
  deactivated: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:beforeDestroy')
  },
  destroyed: function () {
    commonUtils.log('--AutoBuildIndex.Vue--Lifecycle:destroyed')
  },
  components: {

  },
  computed: {

  },
  methods: {

  },
  // 校验数据类型
  props: {
    // mData: {
    //   type: Array
    // },
  }
}
