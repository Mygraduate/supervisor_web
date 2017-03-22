/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-02-06 10:40:47
 */

'use strict';
require('./ProgressIndex.css');
import commonUtils from '../../utils/CommonUtils';
import timeUtils from '../../utils/TimeUtils';



//vuex
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex';
import * as mActions from '../../vuex/Actions';
import * as mGetters from '../../vuex/Getters';
import * as mMutations from '../../vuex/Mutations';


export default {
  name: 'cc-ProgressIndex',
  data() {
    return {}
  },
  beforeCreate: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:beforeCreate");
  },
  created: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:created");
  },
  beforeMount: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:beforeMount");
  },
  mounted: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:mounted", this);
  },
  updated: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:updated");

  },
  activated: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:activated");
  },
  deactivated: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:deactivated");
  },
  beforeDestroy: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:beforeDestroy");
  },
  destroyed: function() {
    commonUtils.log("--ProgressIndex.Vue--Lifecycle:destroyed");
  },
  components: {

  },
  computed: {

  },
  methods: {

  },
  //校验数据类型
  props: {
    // mData: {
    //   type: Array
    // },
  }
}
