<template>
  <header>
    <van-icon name="arrow-left" v-if="flag" @click="goBack" />
    <h3>{{ title }}</h3>
    <van-icon name="ellipsis" v-if="flag" @click="openMask" />
    <transition
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
        <van-overlay :show="show"  @click="show = false">
          <ul>
            <router-link
              tag="li"
              :to="item.path"
              v-for="item in navs"
              :key="item.id"
            >
              <van-icon :name="item.iconName"></van-icon>
              <span> {{ item.text }} </span>
            </router-link>
          </ul>
        </van-overlay>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      show: false,
      navs: [
        {
          id: 1,
          text: "首页",
          iconName: "location",
          path: "/home",
        },
        {
          id: 2,
          text: "搜索",
          iconName: "search",
          path: "/search",
        },
        {
          id: 3,
          text: "客服",
          iconName: "gift",
          path: "/service",
        },
        {
          id: 4,
          text: "反馈",
          iconName: "gem",
          path: "/feedback",
        },
        {
          id: 5,
          text: "我的",
          iconName: "more",
          path: "/user",
        },
      ],
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  watch: {
    $route() {
      // console.log('路由改变了')
      const { path } = this.$route;
      if (path == "/home" || path.indexOf("/detail") != -1) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
  methods: {
    openMask() {
      this.show = !this.show;
    },
    goBack() {
      //! 编程式导航
      // console.log('this',this)
      this.$router.back();
      // this.$router.go(-1)
      // this.$router.push('/user')
      // this.$router.replace('/user')
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Assets/stylesheets/theme.scss";
.van-overlay {
  width: 120px;
  height: 230px;
  z-index: 2;
  position: fixed;
  left: 250px;
  top: 63px;
  background: rgba(51, 51, 51, 0.9);
  padding: 10px;
  &::before {
    display: block;
    content: "";
    width: 0;
    height: 0;
    border-left: 7px transparent solid;
    border-right: 7px transparent solid;
    border-bottom: 7px rgba(51, 51, 51, 0.9) solid;
    border-top: none;
    position: absolute;
    right: 18px;
    top: -7px;
    z-index: 9999;
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      padding: 10px 15px;
      border-bottom: solid 1px rgba(102, 102, 102, 0.9);
      span {
        padding-left: 10px;
        font-size: 14px;
        color: white;
      }
    }
  }
}
header {
  width: 100vw;
  height: 55px;
  background: $themeColor;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  h3 {
    flex: 1;
    text-align: center;
  }
}
</style>
