import {cateReq,listReq,detailReq,addCarReq,getCarReq,delCarReq} from 'Api'
export default {
  namespaced: true,
  state: {
    cates: [],// 分类数据
    lists: [],//列表数据
    details: '',// 详情数据
    addCarResult: '', // 添加购物车得到的结果
    cars: []
  },
  actions: {
    async getCates ({commit}) {
      commit({
        type: 'GET_CATES',
        payload: await cateReq()
      })
    },
    async getLists ({commit},payload) {
      commit({
        type: 'GET_LISTS',
        payload: await listReq(payload)
      })
    },
    async getDetails ({commit},payload) {
      commit({
        type: 'GET_DETAILS',
        payload: await detailReq(payload)
      })
    },
    async getAddCarResult ({commit},payload) {
      commit({
        type: 'GET_ADD_CAR_RESULT',
        payload: await addCarReq(payload)
      })
    },
    async getCars ({commit}) {
      commit({type: 'GET_CARS',payload: await getCarReq()})
    },
    delCars ({commit},payload) {
      call(commit,'DEL_CARS',delCarReq,payload)
    },
    changeFlag ({commit}) {
      call(commit,'CHANGE_FLAG')
    }
  },
  mutations: {
    GET_CATES (state,{payload}) {
      state.cates = payload.data.data.map(item => {
        item.text = item.name 
        delete item.name 
        return item 
      })
    },
    GET_LISTS(state,{payload}) {
      state.lists = payload.data.content
    },
    GET_DETAILS (state,{payload}) {
      state.details = payload
    },
    GET_ADD_CAR_RESULT (state,{payload}) {
      state.addCarResult = payload
    },
    GET_CARS (state,{payload}) {

      state.cars = payload.data.map(item => {
        item.checked = true 
        return item
      })
    },
    DEL_CARS (state,{payload:{data}} ) {
      // console.log('payload',payload)
      // console.log('旧的cars',state.cars)
      state.cars = state.cars.filter(item => !(item.shopId == data))
    },
    CHANGE_FLAG (state) {
      state.cars = state.cars.map(item => {
        item.checked = !item.checked
        return item 
      })
    }
  }
}


async function call (commit,type,cb,data) {
  if (cb) {
    return commit({type,payload: {result:await cb(data),data}})
  }
  commit({type})
}