import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "", // 默认子路由
        name: "home",
        component: () => import("@/views/home/"),
        meta: {
          login_require: false,
          title: "主页",
          index: 1
        }
      },
      {
        path: "/qa",
        name: "qa",
        component: () => import("@/views/qa/"),
        meta: {
          login_require: false,
          title: "QA页",
          index: 2
        }
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video/"),
        meta: {
          login_require: false,
          title: "视频页",
          index: 3
        }
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/"),
        meta: {
          login_require: false,
          title: "MY页",
          index: 3
        }
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/")
  },
  {
    path: "/article/:articleId",
    name: "article",
    // 将动态路由参数映射到组件的props
    props: true,
    component: () => import("@/views/article/")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/")
  }
];

const router = new VueRouter({
  routes
})

export default router