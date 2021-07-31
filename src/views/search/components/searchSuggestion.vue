<template>
  <div class="search-suggestion">
    联想建议
    <van-cell :title="item" icon="search" v-for="(item, index) in suggestions" :key="index"></van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 实现初始化立即调用  需要完整写法
    searchText: {
      async handler() {
        console.log('请求是数据')
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
        console.log(data)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
