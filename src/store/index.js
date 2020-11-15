import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from 'Pages/home/store.js'
import userStore from 'Pages/user/store.js'
import carStore from './car'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    homeStore,carStore,userStore
  }
}) 


export default store 