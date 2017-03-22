/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-03-22 10:35:56
 */

'use strict';
require('./css/app.css');
import api from './utils/Api';
import commonUtils from './utils/CommonUtils';

//路由
import router from './router';
//状态集中管理
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex';
import * as mActions from './vuex/Actions';
import * as mGetters from './vuex/Getters';
import * as mMutations from './vuex/Mutations';


export default {
  name: 'cc-app',
  data: function() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeCreate: function() {
    commonUtils.log("--App.Vue--Lifecycle:beforeCreate");
  },
  created: function() {
    commonUtils.log("--App.Vue--Lifecycle:created");
    if (this.$route.name === undefined) {
      commonUtils.log(this)
      this.$router.push('index')
    }
  },
  beforeMount: function() {
    commonUtils.log("--App.Vue--Lifecycle:beforeMount");
  },
  mounted: function() {
    commonUtils.log("--App.Vue--Lifecycle:mounted");
  },
  updated: function() {
    commonUtils.log("--App.Vue--Lifecycle:updated",this.$route);
  },
  activated: function() {
    commonUtils.log("--App.Vue--Lifecycle:activated");
  },
  deactivated: function() {
    commonUtils.log("--App.Vue--Lifecycle:deactivated");
  },
  beforeDestroy: function() {
    commonUtils.log("--App.Vue--Lifecycle:beforeDestroy");
  },
  destroyed: function() {
    commonUtils.log("--App.Vue--Lifecycle:destroyed");
  },
  computed: {

  },
  methods: {

  }
}
