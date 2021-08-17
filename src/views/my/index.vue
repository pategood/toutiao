<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="nickname">{{currentUser.name}}</div>
        <van-button size="small" round class="update-btn">
          编辑资料
        </van-button>
      </van-cell>

      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count"></div>
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
         <div class="text-wrap" slot="text">
           <div class="count"></div>
           <div class="count">{{currentUser.follow_count}}</div>
           <div class="text">关注</div>
         </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else @click="$router.push('/login')">
      <div>
        <img class="mobile" src="@/assets/img/mobile.png" >
      </div>
      <div class="text">登录/注册</div>
    </div>

    <van-grid :column-num="2" class="mb-4 nav-grid">
      <van-grid-item class="nav-grid-item" icon-prefix="t" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="t" icon="lishi" text="历史" />
    </van-grid>

    <van-cell title="消息通知" icon-prefix="t" icon="news" is-link to="/" v-if="user" />
    <van-cell title="课堂模式" icon-prefix="t" icon="ketang" is-link to="/" />
    <van-cell title="青少年模式" icon-prefix="t" icon="yusan" is-link to="/" />
    <van-cell title="联系客服" icon-prefix="t" icon="lianxikefu" is-link to="/" />
    <van-cell title="设置" icon-prefix="t" icon="shezhi" is-link to="" class="mb-4" />

    <van-cell
      title="退出登录"
      class="logout-cell"
      v-if="user"
      @click="onLogout"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data() {
    return {
      userImg: '',
      currentUser: {}
    }
  },
  created() {
    if (this.$store.state.user.token) {
      this.loadCurrentUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout() {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定退出吗?'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch((e) => {
          // on cancel
          console.log(e)
        })
    },
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  .my-info {
    // background: url("@/assets/img/banner.png") no-repeat;
    background: url("../../assets/img/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .nickname {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    ::v-deep .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("../../assets/img/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      cursor: pointer;
      cursor: hand;
      color: #fff;
      font-size: 14px;
    }
  }

  ::v-deep .nav-grid {
    .nav-grid-item {
      height: 70px;
       .t {
        font-size: 22px;
      }
      .t-shoucang {
        color: #eb5253;
      }
      .t-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
.van-cell__left-icon {
  margin-right: 8px;
}

.t-news:before {
  font-size: 20px;
  color: #409dfa;
}

.t-ketang:before {
  font-size: 20px;
  color: #409dfa;
}

.t-lianxikefu:before {
  font-size: 20px;
  color: #409dfa;
}

.t-yusan:before {
  font-size: 20px;
  color: #409dfa;
}

.t-shezhi:before {
  font-size: 20px;
  color: #409dfa;
}

</style>
