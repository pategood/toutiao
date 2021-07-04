<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">首页</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">首页</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">my</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onChange (event) {
    // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail })
    }
  }

}
</script>

<style lang="scss" scoped></style>
