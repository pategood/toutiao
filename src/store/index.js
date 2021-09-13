import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    // 清除缓存组件
    cachePages: ["LayoutIndex"],
    msgCount: 1 || ""
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      // 用户信息持久化
      setItem(USER_KEY, state.user);
    },
    // 添加 缓存页面
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName);
      }
    },
    // 移除缓存页面
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1);
      }
    },
    // 信息条数
    sum(state) {
      if (state.user) {
        state.msgCount = 99;
      } else {
        state.count = 0;
      }
    }
  },
  actions: {},
  modules: {}
});
