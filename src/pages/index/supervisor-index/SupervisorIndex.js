/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-22 10:25:38
 */

'use strict'
require('./SupervisorIndex.css')
import commonUtils from '../../../utils/CommonUtils'
import timeUtils from '../../../utils/TimeUtils'

// vuex
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import * as mActions from '../../../vuex/Actions'
import * as mGetters from '../../../vuex/Getters'
import * as mMutations from '../../../vuex/Mutations'

export default {
  name: 'cc-SupervisorIndex',
  data () {
    return {
      btnDeleteDisable:true
    }
  },
  beforeCreate: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeCreate')
  },
  created: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:created')
    let that=this;
    that.requestSupervisorList({...that.$route.query,userId:localStorage.getItem('userId')})
  },
  beforeMount: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeMount')
  },
  mounted: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:mounted')
  },
  updated: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:updated')
  },
  activated: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:activated')
  },
  deactivated: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:deactivated')
  },
  beforeDestroy: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:beforeDestroy')
  },
  destroyed: function () {
    commonUtils.log('--SupervisorIndex.Vue--Lifecycle:destroyed')
  },
  components: {},
  computed: {
    ...mapGetters(['getSupervisorList'])
  },
  methods: {
    ...mapActions([
      'requestSupervisorList'
    ]),

    handleCurrentChange () {},
    showDialog (item) {},
    handleDelete (index, item) {}
  }
}
