webpackJsonp([13,11],{0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var u=n(8),r=o(u),a=n(36),i=o(a),s=n(35),c=o(s),l=n(60),f=(o(l),n(19)),d=o(f),p=n(6),m=o(p),h=n(61),g=o(h),b=n(99),_=o(b);n(126),n(113),n(127),n(128),n(129),n(130),n(112),n(114),m.default.log(d.default),r.default.config.debug=!0,r.default.config.errorHandler=function(e,t){m.default.log("--main.js--ERROR:",e)},r.default.use(c.default),r.default.use(i.default),r.default.use(_.default);new r.default({store:g.default,router:d.default,beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){},destroyed:function(){}}).$mount("#app")},6:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=!0;t.default={log:function(e,t,o,u,r,a){n&&(a?console.log(e,t,o,u,r,a):r?console.log(e,t,o,u,r):u?console.log(e,t,o,u):o?console.log(e,t,o):t?console.log(e,t):console.log(e))}}},9:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SAVE_WINDOWS_HEIGHT="SAVE_WINDOWS_HEIGHT",t.SAVE_WINDOWS_WIDTH="SAVE_WINDOWS_WIDTH"},10:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GET_WINDOWS_HEIGHT="GET_WINDOWS_HEIGHT",t.GET_WINDOWS_WIDTH="GET_WINDOWS_WIDTH"},11:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SAVE_WINDOWS_HEIGHT="SAVE_WINDOWS_HEIGHT",t.SAVE_WINDOWS_WIDTH="SAVE_WINDOWS_WIDTH"},15:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function u(e){var t;switch(W=_?P:S,e){case c:t=O;break;case r:t=W.famous5min;break;case a:t=W.resourceDetail;break;case i:t=W.preOrderPay;break;case s:t=W.signOrderStatus}return t}function r(e){f(u(r),e)}function a(e){f(u(a),e)}function i(e){f(u(i),e)}function s(e){f(u(s),e)}function c(e){f(u(c),e)}function l(e,t){return t||(t={},h.default.log("--api.js---网络请求obj 为空空空空")),{options:{url:e,method:t.method?t.method:"POST",body:t.body?t.body:{},params:t.params?t.params:{},headers:t.headers?t.headers:{},timeout:t.timeout?t.timeout:1500,before:t.before?t.before:null,progress:t.progress?t.progress:null,credientials:!t.credientials||t.credientials,emulateHTTP:!!t.emulateHTTP&&t.emulateHTTP,emulateJSON:!t.emulateJSON||t.emulateJSON},body:t.body?t.body:{},success:t.success?t.success:null,error:t.error?t.error:null}}function f(e,t){var n=l(e,t);h.default.log("--api.js---requertParams",n,e),b.default.http.interceptors.push(function(e,t){h.default.log("--api.js--- requst网络配置:",e),t()}),"POST"==n.options.method?b.default.http.post(n.options.url,n.body,n.options).then(function(e){h.default.log("--api.js---post success  response:",e.body),n.success&&n.success(e)},function(e){h.default.log("--api.js---post error  response:",e.body),n.error&&n.error(e)}):b.default.http.get(n.options.mUrl,n.option).then(function(e){h.default.log("--api.js---get success  response:",e.body),obrequertParamsj.success&&n.success(e)},function(e){h.default.log("--api.js---get error  response:",e.body),n.error&&n.error(e)})}var d=n(35),p=o(d),m=n(6),h=o(m),g=n(8),b=o(g);b.default.use(p.default);var _=!1,y="https://mp.mhealth100.com/ip-healthmanager-mobile-web/",v="http://10.0.1.25:9800/ip-healthmanager-mobile-web/",O="http://localhost:8081/HxwDemo",P={famous5min:v+"huangxiaowu/famousDoctorFMain",resourceDetail:v+"huangxiaowu/resourceDetail",preOrderPay:v+"mydoctor/preOrderPay",signOrderStatus:v+"mydoctor/signOrderStatus"},S={famous5min:y+"huangxiaowu/famousDoctorFMain",resourceDetail:y+"huangxiaowu/resourceDetail",preOrderPay:y+"mydoctor/preOrderPay",signOrderStatus:y+"mydoctor/signOrderStatus"},W={};e.exports={getResourceDetail:a,getFamous5min:r,preOrderPay:i,signOrderStatus:s,localTest:c}},19:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(36),r=o(u),a=n(8),i=o(a),s=n(6),c=o(s),l=n(15);o(l);i.default.use(r.default);var f=function(e){return n.e(10,function(t){var n=[t(165)];e.apply(null,n)}.bind(this))},d=function(e){return n.e(0,function(t){var n=[t(166)];e.apply(null,n)}.bind(this))},p=function(e){return n.e(8,function(t){var n=[t(168)];e.apply(null,n)}.bind(this))},m=function(e){return n.e(6,function(t){var n=[t(170)];e.apply(null,n)}.bind(this))},h=function(e){return n.e(9,function(t){var n=[t(167)];e.apply(null,n)}.bind(this))},g=function(e){return n.e(7,function(t){var n=[t(169)];e.apply(null,n)}.bind(this))},b=function(e){return n.e(5,function(t){var n=[t(171)];e.apply(null,n)}.bind(this))},_=function(e){return n.e(4,function(t){var n=[t(172)];e.apply(null,n)}.bind(this))},y=function(e){return n.e(3,function(t){var n=[t(173)];e.apply(null,n)}.bind(this))},v=function(e){return n.e(2,function(t){var n=[t(174)];e.apply(null,n)}.bind(this))},O=function(e){return n.e(1,function(t){var n=[t(175)];e.apply(null,n)}.bind(this))},P=[{path:"/sas",component:f,children:[{path:"index",name:"index",component:d,children:[{path:"indeHome",name:"indexHome",component:p},{path:"progressPage",name:"progressPage",component:m},{path:"autobuildPage",name:"autobuildPage",component:h},{path:"permissionPage",name:"permissionPage",component:g},{path:"referCoursePage",name:"referCoursePage",component:b},{path:"settingPage",name:"settingPage",component:_},{path:"supervisorPage",name:"supervisorPage",component:y},{path:"teacherInfoPage",name:"teacherInfoPage",component:v}]},{path:"login",name:"login",component:O}]}],S=new r.default({routes:P,linkActiveClass:"active",mode:"history"});S.beforeEach(function(e,t,n){c.default.log("--main.js--router beforeEach from:",t,"  to:",e,n),e.name?n():n({name:"index"})}),S.afterEach(function(){c.default.log("--main.js--router:afterEach")}),t.default=S},33:function(e,t){},60:function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(15),a=(u(r),n(6)),i=(u(a),n(19)),s=(u(i),n(12),n(9)),c=(o(s),n(10)),l=(o(c),n(11));o(l);n(33),t.default={name:"cc-app",data:function(){return{transitionName:"slide-left"}},beforeCreate:function(){},created:function(){void 0===this.$route.name&&this.$router.push({name:"indexHome"})},beforeMount:function(){},mounted:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){},destroyed:function(){},computed:{},methods:{}}},61:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(8),r=o(u),a=n(12),i=o(a),s=n(62),c=o(s);r.default.use(i.default);var l=new i.default.Store({modules:{Common:c.default},strict:!1});t.default=l},62:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0});var r=n(11),a=(u(r),n(10)),i=(u(a),n(9)),s=(u(i),n(6)),c=(o(s),n(15)),l=(o(c),{}),f={},d={},p={};t.default={state:l,getters:f,actions:d,mutations:p}},112:function(e,t){},113:function(e,t){},114:function(e,t){},126:function(e,t){},127:function(e,t){},128:function(e,t){},129:function(e,t){},130:function(e,t){}});
//# sourceMappingURL=app.67f27c8c3aa805f70a5a.js.map