<template>
    <div class="container" v-swiperight="back" v-swipeleft="forward">

    <van-loading size="24px"
      v-if="cates.length == 0"
    >加载中...</van-loading>
    <van-tree-select
      height="100%"
      :items="cates"
      :main-active-index.sync="active"
    >
      <template #content>
        <div class="floor_list">
          <div v-for="(floor,index) in cates[active].floors" :key="index">
            <h3> {{ floor.name }} </h3>
            <ul>
              <!-- <router-link 
                v-for = "item in floor.list" 
                :key="item.api_cid"
                tag="li"
                :to="{
                  name: 'list',
                  params: {
                    id: item.api_cid
                  },
                  query: {
                    r: 'class/cysub'
                  }
                }"
              > -->
              <router-link 
                v-for = "item in floor.list" 
                :key="item.api_cid"
                tag="li"
                :to="{
                 path: 'list',
                 query: {
                   cid: item.api_cid,
                   r: 'class/cyajaxsub'
                 }
                }"
              >
                <van-image :src="item.img"/>
                <span> {{ item.name }} </span>
              </router-link>
            </ul>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState('carStore',{
      cates: state => state.cates 
    })
  },
  methods: {
    ...mapActions('carStore',['getCates'])
  },
  mounted () {
    this.getCates()
  },
  updated () {

  }
};
</script>

<style lang="scss" scoped>
.van-tree-select__nav{
  flex: .6;
}
.van-image{
  margin-bottom: 15px!important;
}
.floor_list{
  padding: 20px 15px;
  div{
    margin-bottom: 30px;
    h3{
      font-size: 16px;
      margin-bottom: 20px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
      margin-left: -10px;
      li{
        width: 25%;
        margin: 0 0 20px 20px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
