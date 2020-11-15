<template>
  <div class="app">
    <Tab/>
    <!-- 路由展示区域，内置组件  router-view -->
    <keep-alive
      :include="$route.meta.alive"
    >
      <router-view></router-view>
    </keep-alive>
    <TabBar v-if="tab_bar_flag" />
  </div>
</template>

<script>
import Home from 'Pages/home'
import Tab from 'Comp/Tab'
import TabBar from 'Comp/TabBar'
export default {
  name: 'App',
  data () {
    return {
      tab_bar_flag: true 
    }
  },
  components: {
    Tab,TabBar,Home
  },
  watch: {
    $route () {
      const {path} = this.$route 
      const arr = ['/login','/register','/detail','/list','/pay']
      let f = true 
      arr.map(item => {
        if (path.indexOf(item) != -1 ) {
          f = false 
          return 
        }
      })
      if (f) {
        this.tab_bar_flag = true 
      } else {
        this.tab_bar_flag = false 
      }
    }
  }
}
</script>

<style lang="scss">
@import 'Assets/stylesheets/reset.scss';
.app{
  display: flex;
  flex-direction: column;
}
.van-info{
  min-width: 30px!important;
}
.van-goods-action{
  z-index: 1000
}
 .van-empty__image{
    width: 100%!important;
    height: 100%!important;
    margin-top: -118px;
  }
</style>
