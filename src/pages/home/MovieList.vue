<template>
  <div class="tab-content">
    <div class="movie-list">
      <div v-for="item in movies" :key="item.id">
        <van-card
          :num="item.sc"
          price="2.00"
          :desc="item.showInfo"
          :title="item.nm"
          :thumb="item.img | imgFilter"
          @click="goFeedBack"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import _ from "loadsh";
import { Toast } from "vant";
BScroll.use(Pullup);
export default {
  computed: {
    ...mapState("homeStore", {
      movies: (state) => state.movies,
      movieIds: (state) => state.movieIds,
    }),
  },
  methods: {
    ...mapActions("homeStore", ["getInitMovies", "getMoreMovies"]),
    goFeedBack() {
      this.$router.push("/feedback");
    },
  },
  mounted() {
    this.getInitMovies();
    this.bscroll = new BScroll(document.querySelector(".tab-content"), {
      click: true,
      pullUpLoad: {
        threshold: 90,
      },
    });
    let count = 0;
    this.bscroll.on("pullingUp", () => {
      const ids = _.chunk(this.movieIds.slice(12), 10);
      if (count < ids.length) {
        this.getMoreMovies(ids[count].join(","));
        this.bscroll.finishPullUp();
        this.bscroll.refresh();
      }

      if (count >= ids.length) {
        Toast({
          message: "主子，拉到底了",
          position: "bottom",
        });
      }
      this.bscroll.finishPullUp();
      count++;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "Assets/stylesheets/movie.scss";
.box {
  width: 100%;
}
.tab-content {
  height: 100%;
  overflow: hidden;
}
</style>
