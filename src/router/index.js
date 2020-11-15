//! vue  路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',    //! 这个反向代理的标识符切记不要出现在你的路由路径中
  routes
})


export default router 
