<template>
  <div class="search-container">
    <!-- 下面添加这个外层,且action不为空,则可在ios输入法中显示搜索按钮 -->
    <form action="/">
      <van-search v-model="SearchText"
      shape="round"
      background="#48d594"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
      placeholder="请输入搜索关键词" />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="SearchText" :search-text='SearchText' />

    <!-- 历史纪录 -->
    <search-history  v-else />

  </div>
</template>

<script>
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'

export default {
  name: 'searchIndex',
  data() {
    return {
      SearchText: '', // 搜索框的内容
      isResultShow: false, // 结果展示
      img: []
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    searchResult
  },
  methods: {
    onSearch() {
      console.log()
    },
    onCancel() {
      console.log('取消')
      this.$router.back()
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>

</style>
