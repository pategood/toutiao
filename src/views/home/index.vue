<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" safe-area-inset-top>
      <div class="logo" slot="left">Logo</div>
      <van-button class="search-btn" slot="title" icon="search" type="info" to="/search" round size="small">搜索</van-button>
      <div slot="right">
        <van-icon dot class="game-btn" class-prefix="t" name="game" type="info" to="/game" round />
        <van-icon class="note-btn" class-prefix="t" name="note" type="info" to="/note"  :badge="`${$store.state.msgCount}`"/>
        <!-- :badge="`${$store.state.count}+'+'`" -->
      </div>
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
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      let channels = []
      if (this.user) {
        // 请求获取频道数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        console.log('没有登录')
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          // 请求获取频道数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
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
// @import "../../styles/scss/base.scss";
@import "@/styles/scss/base.scss";
.home-container{
  ::v-deep .van-nav-bar__title {
    max-width: none;
  }
  .app-nav-bar{
    .logo{}
    .search-btn {
      // width: 277px;
      width: 150px;
      height: 32px;
      background-color: #5babfb;
      // background-color: lightskyblue;
      border: none;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
    ::v-deep .game-btn {
      // width: 20px;
      // height: 32px;
      position: relative;
      font-size: 20px;
      color: white;
      margin-right: 5px;
    }
    ::v-deep .note-btn {
      // width: 20px;
      // height: 32px;
      font-size: 10px;
      font-size: 20px;
      position: relative;
      color: white;
      margin-left: 5px;
    }
    ::v-deep .van-info--dot{
      height: 5px !important;
      width: 4px !important;
    }
    ::v-deep .van-info{
      // transform: scale(0.9);
      border: none;
      // font-size: 3px;
      min-width:5px;
      min-height:5px;
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
    width: 43px;
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
