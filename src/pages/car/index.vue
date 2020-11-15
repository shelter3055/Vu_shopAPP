<template>
    <div class="container" v-swiperight="back" v-swipeleft="forward">

    <van-empty
      v-if="isEmety"
      class="custom-image"
      image="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599801471308&di=5fb3d9e0099adedbee2d39955f790f10&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F862224d87d4c15c944e6745d3fd78339db1efb3a4d11f-OsAcvB_fw658"
      description="描述文字"
    />
    <div v-for="item in cars" :key="item.id" class="car_list">
      <van-checkbox v-model="item.checked"></van-checkbox>
      <van-swipe-cell>
        <van-card
          :num="item.num"
          :price="item.price"
          :desc="'评论数为:' + item.comment"
          :title="item.d_title"
          class="goods-card"
          :thumb="item.imgUrl"
        />
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delCars(item.shopId)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="flag" @click="changeFlag">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data () {
    return {
      flag: false
    }
  },
  watch: {
    cars: {
      deep: true,
      handler () {
        this.checkFlag()
      }
    }
  },
  computed: {
    ...mapState("carStore", {
      cars: (state) => state.cars,
    }),
    isEmety() {
      return this.cars.length == 0;
    },
    totalPrice () {
      let sum = 0
      this.cars.forEach(item => {
        if (item.checked) {
          sum += item.price*item.num
        }
      })
      return sum*100 
    }
  },
  methods: {
    ...mapActions("carStore", ["getCars", "delCars",'changeFlag']),
     onSubmit () {
           this.$router.push({
             path: '/pay',
             query: {
               cars: this.cars.filter(item => item.checked)
             }
           })
     },
     onClickEditAddress () {},
     checkFlag () {
        this.flag = !(this.cars.some(item=>!item.checked))
     }
  },
  mounted() {
    this.getCars();
    this.checkFlag()
  },
  updated () {
    // console.log('cars改变了') 
    // this.flag= !(this.cars.some(item => !item.checked))
  }
};
</script>

<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.car_list {
  display: flex;
}
.van-swipe-cell {
  flex: 1;
}
</style>
