import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

// 全局样式
import './plugins/vant.js'
import './styles/index.scss'

// 适配
import 'amfe-flexible'

Vue.config.productionTip = false

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
