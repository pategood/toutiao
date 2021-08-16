<template>
  <div class="article-container">
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()">

    </van-nav-bar>

    <h1 class="title">牛逼的程序员都用的开源工具(postman)</h1>
  </div>
</template>
<script>
export default {
  name: 'ArticleIndex',
  data() {
    return {
    }
  },
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  components: {},
  created() {
  },
  methods: {
    dsds() {
      console.log(this.articleId)
    }
  }
}
</script>
<style lang='scss' scoped>
.title {
  font-size: 20px;
  color: #3a343a;
}
</style>
