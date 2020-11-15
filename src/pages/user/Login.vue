<template>
  <div class="container" v-swiperight="back">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {getCookie} from 'Utils/cookie'
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      username: getCookie('username'),
      password: "",
    };
  },
  computed: {
    ...mapState('userStore',{
      loginData: state => state.loginData
    })
  },
  methods: {
    ...mapActions('userStore',['login']),
    onSubmit(values) {
      // console.log("submit", values);
      this.login(values)
    },
  },
};
</script>
