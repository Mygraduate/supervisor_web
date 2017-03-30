/*
 * @Author: Rhymedys
 * @Date:   2017-02-02 16:22:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-03-30 15:19:03
 */

'use strict';
require('./IndexHome.css');
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
  name: 'cc-index',
  data() {
    return {
      searchInput: '',
      tempTableData: [{
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }, {
        course: '2016-05-03',
        courseContent: '告诉我你爱我',
        teachWay: '我就不',
        professional: '告诉我你爱我',

        courseClass: '告诉我你爱我',
        teachTea: '告诉我你爱我',
        week: '告诉我你爱我',
        listenerTime: '告诉我你爱我'
      }],
      multipleSelection: []
    }
  },
  beforeCreate: function() {
    commonUtils.log("--Index.Vue--Lifecycle:beforeCreate");
  },
  created: function() {
    commonUtils.log("--Index.Vue--Lifecycle:created");
  },
  beforeMount: function() {
    commonUtils.log("--Index.Vue--Lifecycle:beforeMount");
  },
  mounted: function() {
    commonUtils.log("--Index.Vue--Lifecycle:mounted", this);
  },
  updated: function() {
    commonUtils.log("--Index.Vue--Lifecycle:updated");

  },
  activated: function() {
    commonUtils.log("--Index.Vue--Lifecycle:activated");
  },
  deactivated: function() {
    commonUtils.log("--Index.Vue--Lifecycle:deactivated");
  },
  beforeDestroy: function() {
    commonUtils.log("--Index.Vue--Lifecycle:beforeDestroy");
  },
  destroyed: function() {
    commonUtils.log("--Index.Vue--Lifecycle:destroyed");
  },
  components: {

  },
  computed: {

  },
  methods: {
    handleSerchClick: function(ev) {

    }
  },
  //校验数据类型
  props: {
    // mData: {
    //   type: Array
    // },
  }
}
