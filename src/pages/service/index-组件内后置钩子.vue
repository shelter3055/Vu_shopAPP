<template>
  <div class="container">
    <div class="row">
      <label for=""> 请填写姓名 </label>
      <input type="text" />
    </div>

    <div class="row">
      <label for=""> 请填写年龄 </label>
      <input type="text" />
    </div>
    <div class="row">
      <label for=""> 请填写年龄 </label>
      <input type="text" />
    </div>
    <div class="row">
      <label for=""> 请填写年龄 </label>
      <input type="text" />
    </div>
    <div class="row">
      <label for=""> 请填写年龄 </label>
      <input type="text" />
      <router-link to="/home"> 首页 </router-link>
    </div>

    <van-button type="primary"> 提交 </van-button>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  beforeRouteLeave(to, from, next) {
    //! 某些表单填写比较多的界面，用户离开的时候，给一用户提示
    Dialog.confirm({
      message: "您确定要离开吗",
    })
      .then(() => {
        // on confirm
        next()
      })
      .catch(() => {
        // on cancel
        next(false)
      });
  },
};
</script>
