<template>
  <div class="list-container" ref="article-list">
    <van-pull-refresh v-model="isLoading"
     @refresh="onRefresh"
     :success-text="refreshSuccessText"
     :success-duration="600"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articleList"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { debounce } from 'lodash'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false,
      timestamp: null,
      // 下拉刷新加载状况
      isLoading: false,
      // 下拉刷新
      refreshSuccessText: 0,
      // 记忆列表距离滚动到顶部的距离
      memoryScrollTop: null
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含指定,进入页面第一次请求时是否包含置顶文章  1为包含, 0则不包含
      })
      const { results } = data.data
      this.articleList.push(...results)

      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh() {
      // 下拉刷新展示loading状态
      // 请求数据后将数据放到列表内(往顶部追加)
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articleList.unshift(...results)

      this.refreshSuccessText = `更新了${results.length}条数据`
      this.isLoading = false
    }
  },
  mounted() {
    const articleListRef = this.$refs['article-list']
    articleListRef.onscroll = debounce(() => {
      this.memoryScrollTop = articleListRef.scrollTop
    }, 50)
  },
  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
}
</style>
