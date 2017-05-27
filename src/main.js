import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'
import commonUtils from './utils/CommonUtils'
import store from './vuex/Store'
import ElementUI from 'element-ui'
import {setContext} from './utils/Api'
import './css/color'
import './css/common.less'
import './css/font'
import './css/main'
import './css/margin'
import './css/padding'
import 'element-ui/lib/theme-default/index'
import 'mint-ui/lib/style'

// App为html的首页入口 全局Vue对象配置
commonUtils.log(router)
Vue.config.debug = true
Vue.config.devtools = true
Vue.config.errorHandler = function (err, vm) {
  // handle error
  commonUtils.log('--main.js--ERROR:', err)
}
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

// 主入口main======>>>>App
const app = new Vue({
  store,
  router,
  beforeCreate: function () {},
  created: function () {
    let that = this
    setContext(that)
    commonUtils.initTimeFormat()
  },
  beforeMount: function () {},
  mounted: function () {},
  updated: function () {},
  activated: function () {},
  deactivated: function () {},
  beforeDestroy: function () {},
  destroyed: function () {}
}).$mount('#app')
