/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-05-13 08:44:20
 */

'use strict';
require('./PermissionIndex.css');
import commonUtils from '../../../utils/CommonUtils';
import timeUtils from '../../../utils/TimeUtils';



//vuex
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex';
import * as mActions from '../../../vuex/Actions';
import * as mGetters from '../../../vuex/Getters';
import * as mMutations from '../../../vuex/Mutations';


export default {
  name: 'cc-PermissionIndex',
  data() {
    return {
      dialogTableVisible: false,
        dialogFormVisible: false,
        form:{
          name:'',
          region:''
        }
    }
  },
  beforeCreate: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:beforeCreate");
  },
  created: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:created");
  },
  beforeMount: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:beforeMount");
  },
  mounted: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:mounted");
  },
  updated: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:updated");

  },
  activated: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:activated");
  },
  deactivated: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:deactivated");
  },
  beforeDestroy: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:beforeDestroy");
  },
  destroyed: function() {
    commonUtils.log("--PermissionIndex.Vue--Lifecycle:destroyed");
  },
  components: {

  },
  computed: {

  },
  methods: {
      btnAdd(){
        this.dialogFormVisible=true;
      }
  },
}
