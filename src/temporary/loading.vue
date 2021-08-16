<template>
  <div class="page-container" style="text-align: center;">
    <div id="loading-panel">
      <h1><strong>Loading...</strong></h1>
      <h2><strong>{{percent}}</strong></h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  mounted: function() {
    this.preload()
  },
  methods: {
    preload: function() {
      let imgs = [
        'assets/img/banner.png',
        'assets/img/line.png',
        'assets/img/logo.png',
        'assets/img/mobile.png',
        'assets/gif/welcome to LOL.jpg'
      ]

      for (let img of imgs) {
        let image = new Image()
        image.src = img
        image.onload = () => {
          this.count++
        }
        // 计算图片加载的百分数，绑定到percent变量
        let percentNum = Math.floor(this.count / 14 * 100)
        this.percent = `${percentNum}%`
      }
    }
  },
  watch: {
    count: function(val) {
      // console.log(val)
      if (val === 14) {
        // 图片加载完成后跳转页面
        this.$router.push({ path: 'cover' })
      }
    }
  }
}
</script>
