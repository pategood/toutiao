import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from "vant";
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      index: 1,
      login_require: false
    }
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
          meta: {
            index: 0
          }
        }
      },
      {
        path: "/qa",
        name: "qa",
        component: () => import("@/views/qa/"),
        meta: {
          login_require: false,
          title: "QA页",
          index: 0
        }
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video/"),
        meta: {
          login_require: false,
          title: "视频页",
          index: 0
        }
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/"),
        meta: {
          login_require: false,
          title: "MY页",
          index: 0
        }
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/"),
    meta: {
      index: 1,
      login_require: true
    }
  },
  {
    path: "/article/:articleId",
    name: "article",
    // 将动态路由参数映射到组件的props
    props: true,
    component: () => import("@/views/article/"),
    meta: {
      index: 2,
      login_require: false
    }
  },
  {
    path: "/user/chat",
    name: "chat",
    component: () => import("@/views/my/components/user-chat.vue"),
    meta: {
      index: 2,
      login_require: true
    }
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/"),
    meta: {
      login_require: false
    }
  }
];


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login_require) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: "访问提示",
      message: "该功能需要登录才能访问,确认登录吗"
    }).then(() => {
        router.replace({
          name: "login",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
    }).catch(() => {
        // next(false);
      });
  } else {
    next();
  }
});

export default router