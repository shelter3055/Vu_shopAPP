<template>
    <div class="container" v-swiperight="back" v-swipeleft="forward">

    <div v-html="details"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o"  text="客服" />
      <van-goods-action-icon icon="cart-o"  @click="goCar"  text="购物车" badge="123" />
      <van-goods-action-icon icon="shop-o"   text="店铺" />
      <van-goods-action-button type="warning" @click="openShow" text="加入购物车" />
      <van-goods-action-button type="danger" @click="openShow" text="立即购买" />
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyNow"
      @add-cart="onAddCar"
      @stepper-change = "changeNum"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {getCookie} from 'Utils/cookie'
import {Toast} from 'vant'
export default {
  name: "Detail",
  data() {
    return {
      show: false,
      quota: 100,
      type: 0,
      quotaUsed: 0,
      num: 1,
      sku: {
        // 数据结构见下方文档
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://ftp.bmp.ovh/imgs/2019/11/8dea885bcee7fb02.png",
      },  
    };
  },
  computed: {
    ...mapState("carStore", {
      details: (state) => state.details,
      addCarResult: state => state.addCarResult
    }),
  },
  methods: {
    ...mapActions("carStore", ["getDetails",'getAddCarResult']),
    goCar () {
      this.$router.push('/car')
    },
    changeNum (value) {
      this.num = value 
    },
    openShow() {
      this.show = true;
    },
    onAddCar () {
      // 真正的加入购物车
      const token = getCookie('token')
      const {query:{goodsid,pic,d_title,jiage,yuanjia,xiaoliang,comment}} = this.$route
      if (this.type !=1 ) {
        this.getAddCarResult({
          imgUrl: pic,
          d_title,
          price: jiage,
          oringinal: yuanjia,
          sales:xiaoliang,
          comment,
          num: this.num,
          token,
          shopId: goodsid
        })
      }
      const {status,msg} = this.addCarResult
      if (status == 1) {
        Toast.success(msg)
      } else {
        Toast.fail(msg)
        this.type = 1
      }
    },
    onBuyNow () {
      // 真正的立即购买
      // 将详情页面的数据传到支付界面
      // 第二种路由传参形式 ： 通过编程式导航来穿
      this.$router.push({
        path: '/pay',
        query: {
          ...this.$route.query,
          num: this.num 
        }
      })
    }
  },
  mounted() {
    const {
      params: { id },
      query: { r,pic,jiage,goodsid },
    } = this.$route;

    this.goods.picture = pic
    this.getDetails({
      r,
      id,
    });

    this.sku = {
      // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
      // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
      tree: [
        {
          k: "颜色", // skuKeyName：规格类目名称
          k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          v: [
            {
              id: "1", // skuValueId：规格值 id
              name: "红色", // skuValueName：规格值名称
              imgUrl: pic, // 规格类目图片，只有第一个规格类目可以定义图片
              previewImgUrl: pic, // 用于预览显示的规格类目图片
            },
            {
              id: "2",
              name: "蓝色",
              imgUrl: pic,
              previewImgUrl: pic,
            },
          ],
          largeImageMode: true, //  是否展示大图模式
        },
      ],
      // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
      list: [
        {
          id: 2259, // skuId
          s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
          s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
          price: 100, // 价格（单位分）
          stock_num: 110, // 当前 sku 组合对应的库存
        },
      ],
      price: jiage, // 默认价格（单位元）
      stock_num: 227, // 商品总库存
      collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
      none_sku: false, // 是否无规格商品
      hide_stock: true, // 是否隐藏剩余库存
    };
  },
};
</script>

<style lang="scss" scoped></style>
