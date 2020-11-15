<template>
  <div class="container" v-swiperight="back" v-swipeleft="forward">
 
    <!-- 二级或者多级路由  嵌套路由   /user/userInfo  /home/hot  /home/... -->
    导航区域  <hr>
    <router-link :to="{
      name: 'one',
      params: {
        id: 17
      }
    }"> one - 1 </router-link>
    <router-link :to="{
      name: 'one',
      params: {
        id: 22
      }
    }"> one - 2 </router-link>



    <router-link to="/feedback/two"> two </router-link>
    路由展示区域 <hr>
    <router-view></router-view>
  </div>
</template>
