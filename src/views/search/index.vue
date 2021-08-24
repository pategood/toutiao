<template>
  <div class="search-container">
    <!-- 下面添加这个外层,且action不为空,则可在ios输入法中显示搜索按钮 -->
    <form action="/">
      <van-search v-model="SearchText"
      shape="round"
      background="#8cc5ff"
      show-action
      @search="onSearch(SearchText)"
      @cancel="onCancel"
      @focus="isResultShow = false"
      placeholder="请输入搜索关键词" />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text='SearchText'/>

    <!-- 联想建议 -->
    <search-suggestion v-else-if="SearchText" :search-text='SearchText' @search="onSearch" />

    <!-- 历史记录 -->
    <search-history  v-else @search='onSearch' @update-histories='searchHistories=$event'
      :search-histories="searchHistories" />

  </div>
</template>

<script>
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import { getUserSearchHistory } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'searchIndex',
  data() {
    return {
      SearchText: '', // 搜索框的内容
      isResultShow: false, // 结果展示
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      img: []
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    searchResult
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories() {
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    onSearch(SearchText) {
      this.SearchText = SearchText
      this.isResultShow = true

      const index = this.searchHistories.indexOf(SearchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(SearchText)

      // 如果用户已登录 则把搜索历史记录存储到线上  (后端已实现)

      // 如果没有登陆,则存到本地缓存中
      // setItem('search-histories', this.searchHistories)
    },
    onCancel() {
      console.log('返回到首页')
      this.isResultShow = false
      this.$router.back()
    },
    async getUserHistory() {
      if (this.user) {
        // 后端给的数据只有前4条
        const { data } = await getUserSearchHistory()
        // 合并数组 用于展示用户搜索记录
        // 方案一  concat+filter
        // this.searchHistories = data.data.keywords.concat(this.searchHistories.filter(item => data.data.keywords.indexOf(item) < 0))

        // 方案二  concat+set /...+set  无脑合并再去重  把set转为数组:[...Set对象]
        // this.searchHistories = [...new Set(data.data.keywords.concat(this.searchHistories))]
        this.searchHistories = [...new Set([...this.searchHistories, ...data.data.keywords])]

        // 方案三 lodash插件里面的去重 _.uniq([2,3,2])
      }
    }
  },
  created() {
    this.getUserHistory()
  }
}
</script>

<style lang="scss" scoped>

</style>
