<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route safe-area-inset-bottom>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item>
        <van-popover v-model="showPopover" trigger="click" placement="top">
          <van-grid
            square offset="200px"
            clickable
            :border="false" style="width: 260px;"
            column-num="4" class="popoverBox">
            <van-grid-item text="开直播" icon="photo-o" @click="showPopover = false"/>
            <van-grid-item text="拍照" icon="photo-o" @click="showPopover = false"/>
            <van-grid-item text="上传" icon="photo-o" @click="showPopover = false"/>
            <van-grid-item text="模板制作" icon="photo-o" @click="showPopover = false"/>
          </van-grid>
          <template #reference>
            <div class="add"></div>
          </template>
        </van-popover>
      </van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      active: 0,
      showPopover: false
    }
  },
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail })
    }
  },
  mounted() {
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>

<style lang="scss" scoped>
::v-deep.layout-container {
  box-sizing: border-box;
  // ::v-deep .popoverBox{
  //   width: 300px !important;
  // }
  .van-popover__wrapper{
    .add {
      border: 1px solid;
      width: 33px;
      height: 33px;
      color: #ccc;
      transition: color .25s;
      border-radius:8px;
      position: relative;
      background: #f86934;
    }
    .add::before{
      content: '';
      position: absolute;
      left: 25%;
      top: 46.5%;
      width: 50%;
      border-top: 2.5px solid;
      // margin-left: -calc(50%/2);
      // margin-top: -2.5px;
    }
    .add::after {
      content: '';
      position: absolute;
      left: 47%;
      bottom: 25%;
      height: 50%;
      // margin-left: calc(50%/2);
      // margin-top: -12.5px;
      border-left: 2.5px solid;
    }
    .add:hover {
      color: #fff;
    }
  }
}
</style>
