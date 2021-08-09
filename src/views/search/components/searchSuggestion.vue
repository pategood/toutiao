<template>
  <div class="search-suggestion">
    联想建议
    <van-cell icon="search" v-for="(item, index) in suggestions" :key="index"
    @click="$emit('search', item)">
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: [],
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 实现初始化立即调用  需要完整写法  添加了防抖
    searchText: {
      handler: debounce(async function() {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 1000),
      immediate: true
    }
  },
  methods: {
    highLight(str) {
      const Reg = new RegExp(this.searchText, 'gi')
      return str.replace(Reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
