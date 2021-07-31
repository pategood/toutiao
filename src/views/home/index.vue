<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn" slot="title" icon="search" type="info"
        @click="$router.push('/search')"
        round
        size="small">
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 文章频道 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="item.name" class="tab-item"
        v-for="item in channels" :key="item.id">
        <article-list :channel='item' />
      </van-tab>
      <!-- 汉堡按钮把列表最后的位置给挡住了,解决办法就是添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isShow=true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 汉堡按钮 -->
    <van-popup v-model="isShow" position="bottom"
      closeable
      @click-close-icon="resetEdit"
      class="channel-edit-popup"
      get-container="body"
      style="height: 100%" >
      <channel-edit :user-channels="channels" :active="active"
        ref="childrenDom" @close="isShow=false"
        @update-active="onUpdateActive" />
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isShow: false
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      // 请求获取频道数据
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
    },
    onUpdateActive(index) {
      this.active = index
    },
    resetEdit() {
      this.$refs.childrenDom.isEdit = false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  ::v-deep .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    ::v-deep .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    ::v-deep .van-tabs__line {
      width: 15px !important;
      bottom: 20px;
      height: 3px;
      background: #3296fa;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: '';
      width: 1px;
      background: url("../../assets/img/line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
