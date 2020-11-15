<template>
   <div class="container" v-swiperight="back" v-swipeleft="forward">

    <div>
      <van-button plain type="default" 
       v-for="item in anniu"
       :key='item.id' 
       :name='item.name' 
       :class='item.id==id?"active":""'
          @click='changeId(item.id,item.name)'
       > {{item.text}}</van-button>
    </div>
    <!-- <div>
      <van-button type="primary" @click="getHot">人气</van-button>
      <van-button type="info" @click="getLatest" >最新</van-button>
      <van-button type="warning" @click="getSell" >销量</van-button>
      <van-button type="danger" @click="getPrice">价格</van-button>
    </div> -->
    <ListItem :lists="lists" />
  </div>
</template>
<script>
import ListItem from "./ListItem";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      px: "t",
        id:1,
      anniu:[
       {
       id:1,
       name:'t',
       text:'人气'
     },
       {
       id:2,
       name:'latest',
       text:'最新'
     },
       {
       id:3,
       name:'sell',
       text:'销量'
     },
       {
       id:4,
       name:'price_h',
       text:'价格'
     },
     ]
    };
  },
  watch: {
    px () {
      const {
      query: { r, cid },
    } = this.$route;
      this.getLists({
        r,
        page: 1,
        cid,
        px: this.px,
        cac_id: "",
      });
    }
  },
  components: {
    ListItem,
  },
  computed: {
    ...mapState("carStore", {
      lists: (state) => state.lists,
    }),
  },
  methods: {
    ...mapActions("carStore", ["getLists"]),
    getHot() {
      this.px = 't'
    },
    getLatest () {
      this.px = 'latest'
    },
    getSell () {
      this.px = 'sell'
    },
    getPrice () {
      this.px = 'price'
    },
      changeId(id,name){
      this.id=id
      this.px=name
    }
  }, 
  mounted() {
    const {
      query: { r, cid },
    } = this.$route;
    this.getLists({
      r,
      page: 1,
      cid,
      px: this.px,
      cac_id: "",
    });
  },
};
</script>

<style lang="scss" scoped>
button{
    width:25%;
    border:none;
  }
  .active{
    border-bottom: 2px solid red;
  }
</style>
