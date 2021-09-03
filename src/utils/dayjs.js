/* 初始化 dayjs 的相关配置  */

import Vue from 'vue'
import dayjs from 'dayjs'
// 加载使用中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器
// 可以在任意组件模板中使用
// 过滤器就是可以在模板调用的函数

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
Vue.filter("dateTime", (value, format= 'YYY-MM-DD-HH-mm-ss') => {
  return dayjs(value).format(format);
});

// 例如日期格式化
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// 输出2021年1月1日到现在的时间
// console.log(dayjs('2021-07-16 15:38:02').from(dayjs()))
