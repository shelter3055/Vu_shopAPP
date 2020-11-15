import {loginReq,picReq,registerReq} from 'Api'
import {setCookie} from 'Utils/cookie'
import md5 from 'md5'
import {Toast} from 'vant'
import router from 'Router'
console.log('router',router)
export default {
  namespaced: true,
  state: {
    regRes: {},
    loginData: {},
    pic: ''
  },
  actions: {
    async register ({commit},{username,password,phone}) {
      setCookie('username',username,7)
      commit({
        type: 'REGISTER',
        payload: await registerReq({
          username,password: md5(password),phone
        })
      })
    },
    async login ({commit},{username,password}) {
      // 先做数据请求得到请求的结果
      // commit 将结果发给mutations 
      // loginReq(payload)
      //   .then(res => {
      //     commit({
      //       type: 'LOGIN',
      //       payload: res 
      //     })
      //   })
      setCookie('username',username,7)
      commit({
        type: 'LOGIN',
        payload: await loginReq({username,password: md5(password)})
      })
    },
    //! 头像上传
    async getPic ({commit},payload) {
      commit({
        type: 'GET_PIC',
        payload: await picReq(payload)
      })
    }
  },
  mutations: {
    REGISTER (state,{payload}) {
      if (payload.status == 0) {
        Toast.fail(payload.msg)
      } 
      if (payload.status ==1) {
        router.push('/login')
      }
      state.regRes = payload
    },
    LOGIN (state,{payload}) {
      if (payload.status ==0) {
        Toast.fail(payload.msg)
      }
      if (payload.status ==1){
        setCookie('userId',payload.userId,7)
        setCookie('token',payload.token,7)
        router.push('/home')
      }
      state.loginData = payload
    },
    GET_PIC (state,{payload}) {
      state.pic = 'https://elm.cangdu.org/img/' + payload.image_path
      setCookie('avatar',state.pic,7)
    }
  }
}