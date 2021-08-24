<template>
  <div class="reviewContent">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    <!-- </van-pull-refresh> -->

  </div>
</template>

<script>
import { getReviews } from '@/api/review.js'
export default {
  name: 'reviewList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onRefresh() {
      this.onLoad()
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.list = await getReviews()
      console.log(this.list)
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
