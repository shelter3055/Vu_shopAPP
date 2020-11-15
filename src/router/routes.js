//! 路由懒加载   webpack代码分割功能 + vue异步组件[import]
const Home = () => import(/**webpackChunkName:'group-foo'*/'Pages/home')
const Category = () => import(/**webpackChunkName:'group-foo'*/'Pages/category')
const List = () => import(/**webpackChunkName:'group-foo'*/'Pages/list')
const Detail = () => import(/**webpackChunkName:'group-foo'*/'Pages/detail')
const Car = () => import(/**webpackChunkName:'group-foo'*/'Pages/car')
const User = () => import(/**webpackChunkName:'group-foo'*/'Pages/user')
const Login = () => import(/**webpackChunkName:'group-foo'*/'Pages/user/Login')
const Register = () => import(/**webpackChunkName:'group-foo'*/'Pages/user/Register')
const NotFound = () => import(/**webpackChunkName:'group-foo'*/'Pages/404')
const Activity = () => import(/**webpackChunkName:'group-foo'*/'Pages/activity')
const Pay = () => import(/**webpackChunkName:'group-foo'*/'Pages/pay')
const Service = () => import(/**webpackChunkName:'group-foo'*/'Pages/service')
const FeedBack = () => import(/**webpackChunkName:'group-foo'*/'Pages/feedback')
const One = () => import(/**webpackChunkName:'group-foo'*/'Pages/feedback/One')
const Two = () => import(/**webpackChunkName:'group-foo'*/'Pages/feedback/Two')
import {tokenReq} from 'Api'
import {Toast} from 'vant'
export default [
  {
    path: '/',
    redirect: '/home' // 重定向
  },
  {
    path: '/home',
    component: Home,
    meta: {  // meta 元数据  
      title: '首页',
      alive: 'Home'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
      alive: 'Home'
    }
  },
  {
    path: '/activity',
    component: Activity,
    meta: {
      title: '9.9块包邮大活动开启',
      alive: 'Home'
    },
    beforeEnter: async (to, from, next) => {
      //! 路由独享守卫
      const {status,msg} = await tokenReq()
      if (status == 1|| to.path=="/login") {
        next()
      } else {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '您还没有登录 3 秒后自动跳转登录',
        });
        
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `您还没有登录 ${second} 秒后自动跳转登录  `;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear();
            next('/login')
          }
        }, 1000);
      }
    }
  },
  {
    // path: '/list/:id',   
    /* 
      <router-link :to="{
        name: 'list',
        params: {
          id: 'xxx',
        },
        query: {
          a: 1,
          b: x
        }
      }"></router-link>
    */
    path: '/list', 
    /* 
      <router-link :to="{
        path: 'list,
        query: {
          cid: xxx,
          xxx: xxx
        }
      }"></router-link>
    */
    component: List,
    name: 'list', // 有name属性路由我们给起了个名字叫做命名路由
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/detail/:id',
    component: Detail,
    name: 'detail',
    meta: {
      title: '商品详情页'
    }
  },
  {
    path: '/service',
    component: Service,
    //元数据
    meta: {
      title: '客服'
    }
  },
  {
    path: '/feedback',
    component: FeedBack,
    children: [// 子路由
      {
        path: 'one/:id', //! 切记子路由不写  /
        component: One,
        name: 'one'
      },
      {
        path: 'two',
        component: Two
      }
    ], 
    meta: {
      title: '反馈'
    }
  },
  {
    path: '/car',
    component: Car,
    meta: {
      title: '购物车'
    },
    beforeEnter: async (to, from, next) => {
      //! 路由独享守卫
      const {status,msg} = await tokenReq()
      if (status == 1|| to.path=="/login") {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      title: '立即支付'
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  // 错误路由匹配 
  // 放在路由表最下层
  {
    path: '*',
    component: NotFound
  }
]