// postcss.config.js
module.exports = {
  plugins: {
    // 下面写到 .browserslistrc 文件内
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // 如果是750 的设计稿 就写 750 /10 =75  下面的是37.5的设计稿

      // vant的设计搞是 375  这是逻辑像素
      // 设计稿的像素是 物理像素   也就是量多少就写多少
      // 本项目是vant 所以要写成37.5  如果涉及搞是750的 那量的像素都要除以二
      rootValue: 37.5,

      // 第二种写法
      //
      // rootValue({ file }) {
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75
      // },
      propList: ['*']
    }
  }
}
