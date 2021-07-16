/* 用户相关请求模块 */

import request from '@/utils/request'

// 非组件模块中获取 store 必须通过这种方式
// 这里单独加载store 和组件中的this.$store 是一样的
// import store from '@/store/'

// 登陆注册

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/*
  获取登录用户信息
*/
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
