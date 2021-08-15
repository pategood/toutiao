<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">清空</span>&nbsp;&nbsp;<span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteShow = true" name="delete"  />
    </van-cell>
    <van-cell :title="history"
      v-for="(history, index) in searchHistories" :key="index" v-show="index < 8"
      @click="handleHistory(history, index)">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
    <van-cell title="最强大脑">
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
    <van-cell title="花样年尽快">
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearcHistory',
  data() {
    return {
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleHistory(history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 父组件设置了监听 ,下面代码不用了
        // setItem('search-histories', this.searchHistories)

        // 调接口删除搜索历史 并重新获取搜索历史
      } else {
        this.$emit('search', history)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
