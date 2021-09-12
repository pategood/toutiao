/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store/'
import { Toast } from 'vant'
import router from '@/router/'

axios.defaults.timeout = 30000;
axios.defaults.retry = 2;   //超时 重新请求的次数
axios.defaults.retryDelay = 1000;   //重新请求的间隔

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 重新获取刷新后的`token基础路径
})


/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  config => {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 由于后端设置了token会过期,过期请求会返401  过期后用refresh_token来获取新的token

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response;
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function (err) {
    var config = err.config;
    console.log(config, '配置');
    // // 如果没有配置 或者 没有设置重新请求次数  直接抛出异常
    // if (!config || !config.retry) return Promise.reject(err);
    // config.__retryCount = config.__retryCount || 0;
    // if (config.__retryCount >= config.retry) {
    //   return Promise.reject(err);
    // }
    // config.__retryCount += 1;
    // return backoff.then(function() {
    //   return axios(config);
    // });

    // 如果响应码是 401 ，则请求获取新的 token
    if (err.response && err.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user;

      if (!user || !user.token) {
        return redirectLogin();
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await refreshTokenReq({
          method: "PUT",
          url: "/app/v1_0/authorizations",
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        });

        // 如果获取成功，则把新的 token 更新到容器中
        console.log("刷新 token  成功", res);
        user.token = data.data.token;
        store.commit("setUser", {
          user
        });

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(err.config);
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        redirectLogin();
      }
    } else if (err.response && err.response.status === 400) {
      Toast.fail("客户端请求参数异常");
    } else if (err.response && err.response.status === 403) {
      Toast.fail("没有权限操作");
    } else if (err.response && err.response.status >= 500) {
      Toast.fail("服务端异常,请稍候重试");
    }

    // 抛出异常
    return Promise.reject(err);
  }
);

function redirectLogin() {
  // 解决用户黑暗跳转   router.currentRoute就相当于this.$route
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}


export default request
