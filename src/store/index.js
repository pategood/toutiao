import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    msgCount: 1||''
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 用户信息持久化
      setItem(USER_KEY, state.user)
    },
    sum(state) {
      if(state.user) {
        state.msgCount = 99
        // if(state.msgCount>99) {
        //   state.msgCount = 99+
        // }
        // api.getCard().then(res => {
        //   window.console.log('购物车', res);
        //   state.count = res.shopList.length;
        //   window.console.log(state.count)
        // }).catch(err => {
        //   window.console.log(err)
        // })
      } else {
        state.count = 0
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
