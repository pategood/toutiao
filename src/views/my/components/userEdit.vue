<template>
  <div class="userEdit_index">
    <van-nav-bar class="app-nav-bar" left-text="账号资料" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="userEdit_content">
      <div class="header">
        <van-cell title="头像" is-link >
          <template #right-icon>
            <!-- <img :src="img" alt="头像"> -->
            <van-image class="portrait" round fit="cover" :src="img"/>
          </template>
        </van-cell>
        <van-cell title="性别" is-link  value="保密" />
        <van-cell title="学校" is-link  :value="schoolName" />
        <van-cell title="个性签名" is-link  value="这个人很神秘" />
      </div>

      <div class="center">
        <van-cell title="学校" is-link  />
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'userEdit',
  data() {
    return {
      img: 'http://toutiao-img.itheima.net/FnqOaiklcenUatz6StuUruOM_gBA',
      schoolName: '中山大学'
    }
  },
  components: {}
}
</script>
<style lang='scss' scoped>
.userEdit_index{

  .userEdit_content{
    .header{
      margin: 25px 0;
      .portrait{
        width: 40px;
        height: 40px;
      }
    }
  }
}

::v-deep .van-nav-bar {
  background-color: #fff;
  .van-nav-bar__text {
    color: black;
  }
  .van-nav-bar__arrow{
    color: black;
  }
  .van-nav-bar__title {
    max-width: none;
    color: white;
  }
}

</style>
