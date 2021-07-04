import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }, {
    path: '/',
    component: () => import('@/views/layout'),
    children: [{
      path: '', // 默认子路由
      name: 'home',
      components: () => import('@/views/home/')

    }, {
      path: '/qa',
      name: 'qa',
      components: () => import('@/views/qa/')

    }, {
      path: '/video',
      name: 'video',
      components: () => import('@/views/video/')

    }, {
      path: '/my',
      name: 'my',
      components: () => import('@/views/my/')

    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
