<template>
  <div class="container" v-swiperight="back" v-swipeleft="forward">

    <div v-for="item in cars" :key="item.id">
      <van-swipe-cell>
        <van-card
          :num="item.num"
          :price="item.price"
          :desc="item.comment"
          :title="item.d_title"
          class="goods-card"
          :thumb="item.imgUrl"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
    <!-- <van-dialog v-model="show" title="标题" show-cancel-button>
      <img :src="shopInfo.pic" width="80%" height="300" />
    </van-dialog> -->
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      checked: false,
      show: false,
    };
  },
  name: "Pay",
  computed: {
    cars() {
      return this.$route.query.cars;
    },
    totalPrice() {
      let sum = 0
      this.cars.forEach(item => {
         sum+=item.price*item.num
      })
      return sum*100
    },
  },
  methods: {
    onClickEditAddress() {},
    changeChecked() {
      this.checked = !this.checked;
    },
    onSubmit() {
      if (this.checked) {
        this.show = true;
      } else {
        Dialog.alert({
          message: "您还没有勾选全选，请勾选",
          theme: "round-button",
        }).then(() => {
          // on close
          this.checked = true;
        });
      }
    },
  },
};
</script>

<style lang="scss" socped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
