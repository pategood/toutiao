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

import './utils/dayjs'
// import './utils/svg.js'
// import misIcon from '@/components/common/misIcon.vue'
// // 注册全局插件
// Vue.component('mis-icon', MisIcon)

Vue.config.productionTip = false

FastClick.attach(document.body)

// router.beforeEach((to,from,next)=>{
// 	if(to.meta.login_require){
// 		if(store.state.user){
// 			next()
// 		}else{
// 			next({ path: "/login" });
// 		}
// 	}else{
// 		next()
// 	}
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
