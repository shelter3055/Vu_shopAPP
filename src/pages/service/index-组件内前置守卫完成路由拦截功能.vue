<template>
  <div class="container">
    客服
  </div>
</template>

<script>
import { tokenReq } from "Api";
import {Toast} from 'vant'
export default {
  async beforeRouteEnter(to, from, next) {
    const { msg, status } = await tokenReq();
    if (status == 1 || to.path == "/login") {
      next();
    } else {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "倒计时 3 秒",
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Toast.clear();
          next("/login");
        }
      }, 1000);
    }
  },
};
</script>
