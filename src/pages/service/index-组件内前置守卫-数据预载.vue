<template>
  <div class="container">
    客服 - {{ userInfo.username }} -- {{userInfo.phone }}  -- {{ money }}
  </div>
</template>

<script>
import { userInfoReq } from "Api";
import {Toast} from 'vant'
import Vue from 'vue'
export default {
  async beforeRouteEnter(to, from, next) {
      //! 组件内前置守卫可以完成数据预载功能
      //! 数据预载指的就是组件提前获得数据
      //! this 是 undefined  
      // console.log('this',this)
      //! 1. 获取数据
      const {data:{username,phone}} = await userInfoReq()
      // console.log('data',data)】
      //! 2. 将数据给到组件
      next(vm => {
        //vm 就是当前组件
        // 后添加的数据不是响应式数据
        // vm.username = username 
        // vm.phone = phone 
        //! 解决方案
        // vm.$set(vm.userInfo,'username',username)
        // vm.$set(vm.userInfo,'phone',phone)
        Vue.set(vm.userInfo,'username',username)
        Vue.set(vm.userInfo,'phone',phone)
      })
  },
  data () {
    return {
      money: 2000,
      userInfo: {}
    }
  },
  mounted () {
    console.log('this',this)
  }
};
</script>
