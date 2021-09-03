<template>
  <div class="reviewContent">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->

      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <review-item v-for="(review, index) in list" :key="index" :review="review"></review-item>
      </van-list>
    <!-- </van-pull-refresh> -->

  </div>
</template>

<script>
import { getReviews } from '@/api/review.js'
import reviewItem from './reviewItem.vue'
export default {
  name: 'reviewList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      isLoading: false // 下拉刷新
    }
  },
  props: {
    source: {
      tyep: [Number, String, Object],
      required: true
    }
  },
  components: {
    reviewItem
  },
  methods: {
    onRefresh() {
      this.onLoad()
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getReviews({
        type: 'a', // 评论类型 (回复还是评论)
        source: this.source || 139987,
        offset: this.offset, // 获取文章数据的偏移量,理解为页码   不传表示默认第一页
        limit: this.limit // 每页数量
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
