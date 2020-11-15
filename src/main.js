import Vue from 'vue'
import App from './App.vue'
import 'Utils/rem'
import 'Utils/vantCompImport'
import store from 'Store'
import myPlugin from 'Plugins';
import md5 from 'md5'
import router from 'Router'
import 'animate.css' // 全局引入animate.css 
import {tokenReq} from 'Api'
import {Toast } from 'vant'
import '@/mixin'

Vue.use(myPlugin)
Vue.config.productionTip = false
Vue.prototype.$md5 = md5 

//! 全局前置守卫 -- 不登录不能进入任何页面
// router.beforeEach(async (to,from,next) => {
//   //to表示去向
//   //from 表示当前路由
//   //next 表示两者的连接
//   console.log('to',to)
//   console.log('from',from)
//   // next(false)
//   const {status,msg} = await tokenReq()
//   // console.log('status',status)
//   // console.log('msg',msg)
//   // if (status ==1 ) {
//   //   next()
//   // }

//   //页面跳转  next('/login')
//   if (status==1||to.path=="/login") {
//     next()
//   } else {
//     next('/login')
//   }


// })


// router.afterEach((to,from) => {
//   //! 只有两个参数，这个hook是没有拦截功能的 
//   Toast('离开了')
// })

//!  router.beforeResolve(())   router.beforeEach用法一致




new Vue({
  store, // $store
  router, // 所有组件都会得到两个属性 $route  $router 
  render: h => h(App),
}).$mount('#app')
