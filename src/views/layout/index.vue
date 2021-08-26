<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route safe-area-inset-bottom>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-popover v-model="showPopover" trigger="click" placement="top">
        <van-grid
          square
          clickable
          :border="false"
          column-num="4"
          style="width: 240px;"
        >
          <van-grid-item
            text="开直播" icon="photo-o" @click="showPopover = false"/>
          <van-grid-item
            text="拍照" icon="photo-o" @click="showPopover = false"/>
          <van-grid-item
            text="上传" icon="photo-o" @click="showPopover = false"/>
          <van-grid-item
            text="模板制作" icon="photo-o" @click="showPopover = false"/>
        </van-grid>
          <template #reference>
            <div class="add "></div>
        </template>
      </van-popover>
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
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  box-sizing: border-box;
  ::v-deep .van-popover__wrapper{
    display:flex;
    justify-content: center;
    align-items: center;
    .add {
      border: 1px solid;
      width: 40px;
      height: 40px;
      color: #ccc;
      transition: color .25s;
      border-radius:8px;
      position: relative;
    }
    .add::before{
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 25px;
      margin-left: -12.5px;
      margin-top: -2.5px;
      border-top: 2.5px solid;
    }
    .add::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      height: 25px;
      margin-left: -2.5px;
      margin-top: -12.5px;
      border-left: 2.5px solid;
    }
  }
}
</style>
