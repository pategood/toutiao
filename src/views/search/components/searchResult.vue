<template>
  <div class="search-result">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearcResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20 // 每页大小
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索的字符
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow: auto;
  }
</style>
