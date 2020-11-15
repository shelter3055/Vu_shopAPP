<template>
  <div class="container" v-swiperight="back" v-swipeleft="forward">
        <!-- 已经登录 -->
      <div v-if="userInfo.username">
        <div>
          <img :src="userInfo.pic" alt="" class="touxiang">
          <span> {{ userInfo.username }} </span>
          <van-button type="primary" @click="loginOut"> 登出 </van-button>
        </div>

      </div>
      <!-- 未登录 -->
      <div v-else>
        <div>
         <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
          <router-link to="/register">注册</router-link>
          <span>/</span>
          <router-link to="/login">登录</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import {getCookie,removeCookie} from 'Utils/cookie'
export default {
  computed: {
    userInfo () {
      return {
        pic: getCookie('avatar'),
        username: getCookie('username')
      }
    }
  },
  methods: {
    loginOut () {
      removeCookie('username')
      removeCookie('avatar')
      removeCookie('userId')
      removeCookie('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='scss' scoped>
  .touxiang{
    width: 100px;
    height: 100px;
    background: red;
  }
</style>


