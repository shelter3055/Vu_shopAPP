import Vue from 'vue'
import router from 'Router'
Vue.mixin({
  methods: {
    back () {
      router.back()
    },
    forward () {
      console.log('router',router)
      router.forward()
    }
  }
})