<template>
  <div class="article-index">
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="article-container">
      <h1 class="header_title">
          {{article.title}}(postman)
      </h1>
      <van-cell center class="user-info">
        <div slot="title" class="nickName" >{{article.aut_name}}</div>
        <van-image class="avatar" slot="icon" width="35" height="35" round fit="cover" :src="article.aut_photo" />
        <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
        <van-button class="follow-btn" :loading="isFollowLoading"
        :type="article.is_followed ? 'default': 'info' "
        :icon="article.is_followed ? '': 'plus'" round size="small" @click="onFollow"
        >{{article.is_followed ? '已关注' : '关注'}}</van-button>
      </van-cell>
      <div class="content markdown-body" v-html="article.content" ref="article-content"></div>

      <!-- 文章评论列表 -->
      <review-list />
      <!-- <div class="article-header">
        <div class="left">
          <img src="http://img.yzcdn.cn/vant/cat.jpeg" class="head-img"  alt="用户头像" />
          <div class="intro">
            <p class="nick">天涯小飞贼</p>
            <p class="releaseTime">14小时前</p>
          </div>
        </div>

        <div class="right">
          <button class="btn"><span v-if="true">+关注</span><span v-else>已关注</span></button>
        </div>

      </div> -->
    </div>

    <div class="article-footer">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="comment-o" badge="123" color="#777" />
      <van-icon @click="onCollect" :loading="isCollectLoading"
        :color="article.is_collected ? 'orange':'#777'" :name="article.is_collected ? 'star':'star-o'" />
      <van-icon @click="onLike"
        :name="article.attitude===1?  'good-job': 'good-job-o'"  :color="article.attitude ? '#f86934':'#777'"
       />
      <van-icon name="share" color="#777" />
    </div>
  </div>
</template>
<script>
import './github-markdown.css'
import reviewList from './components/reviewList'
import { getArticle, addCollect, undoCollect, addLike, deleteLike } from '@/api/article.js'
import { addFollow, undoFollow } from '@/api/user.js'
import { ImagePreview } from 'vant'
import { throttle } from 'lodash'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    reviewList
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticle(this.articleId)
      // 报错原因是这个articleId超出js的最大数  安装 json-bigint插件
      this.article = data.data
      // 获取文章内容的dom容器  的到所有img标签
      // 循环img列表,给img注册点击事件 (事件调用ImagePreview)
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    // 处理文章图片预览
    handlePerviewImage() {
      if (Object.keys(this.article).length !== 0) {
        const articleContent = this.$refs['article-content']
        const imgs = articleContent.querySelectorAll('img')
        const imgPaths = []
        imgs.forEach((img, index) => {
          imgPaths.push(img.src)
          img.onclick = function() {
            ImagePreview({
              images: imgPaths,
              startPosition: index
            })
          }
        })
      }
    },

    onFollow: throttle(async function() {
      if (this.$store.state.user && this.$store.state.user.token) {
        try {
          this.isFollowLoading = true
          if (this.article.is_followed) {
            await undoFollow(this.article.aut_id)
          } else {
            await addFollow(this.article.aut_id)
          }
          this.loadArticle()
          // this.article.is_followed = !this.article.is_followed
          this.$toast.success(`${this.article.is_followed ? '关注成功' : '取消关注'}`)
          this.isFollowLoading = false
        } catch (e) {
          this.isFollowLoading = false
          this.$toast.fail({
            message: '接口报错',
            duration: 1000,
            forbidClick: true // 禁止背景点击
          })
        }
      } else {
        this.$toast('用户未登录')
        // this.$router.push('/login')
      }
    }, 1500, {
      leading: true,
      trailing: false
    }),

    // 收藏
    onCollect: throttle(async function() {
      if (this.$store.state.user && this.$store.state.user.token) {
        // this.$toast.loading({
        //   message: '加载中',
        //   forbidClick: true // 禁止背景点击
        // })
        try {
          this.isCollectLoading = true
          if (this.article.is_collected) {
            await undoCollect(this.articleId)
          } else {
            await addCollect(this.articleId)
          }
          // this.article.is_collected = !this.article.is_collected
          // this.loadArticle()
          this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
          this.isCollectLoading = false
        } catch (e) {
          this.isCollectLoading = false
          // this.$toast.fail({
          //   message: '接口报错',
          //   duration: 1000,
          //   forbidClick: true // 禁止背景点击
          // })
        }
      } else {
        this.$toast('用户未登录')
        // this.$router.push('/login')
      }
    }, 2000, {
      leading: true,
      trailing: false
    }),
    onLike: throttle(async function() {
      if (this.$store.state.user && this.$store.state.user.token) {
        try {
          if (this.article.attitude === 1) {
            await deleteLike(this.articleId)
            this.article.attitude = -1
          } else {
            await addLike(this.articleId)
            this.article.attitude = 1
          }
          // this.loadArticle()
          this.$toast.success(`${this.article.attitude === 1 ? '点赞成功' : '取消点赞'}`)
        } catch (e) {
          this.$toast.fail({
            message: '接口报错',
            duration: 1000,
            forbidClick: true // 禁止背景点击
          })
        }
      } else {
        this.$toast('用户未登录')
        // this.$router.push('/login')
      }
    }, 2000, {
      leading: true,
      trailing: false
    })
  }
}
</script>
<style lang='scss' scoped>
.article-index {
  width: 100%;
  .header_title {
    box-sizing: border-box;
    font-size: 20px;
    color: #3a343a;
    padding: 9px 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    word-break:break-all;
    width: 100%; // 必须指定宽度
    text-overflow: ellipsis;//超出文字显示为省略号
    overflow: hidden;//隐藏超出部分
    -webkit-line-clamp: 2;//限制行数
  }

  .article-container {
    // min-height: calc(100vh - 50px);
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow: auto;
    .user-info {
      .avatar {
        width: 35px;
        height: 35px;
        margin-left: 8px;
      }
      .nickName {
        font-size: 12px;
        color: #333333;
      }
      .pubdate {
        font-size: 11px;
        color: #b4b4b4;
      }
      .follow-btn {
        width: 70px;
        height: 29px;
      }
    }
  }
  .article-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}

ul {
  list-style: unset;
}
.markdown-body {
  padding: 14px;
  background-color: #ffffff;
}

//  my写的
.article-header {
  height: 60px;
  margin: auto 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction : row;
    .head-img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .intro {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .nick {
        font-size: 15px
      }
      .releaseTime {
        font-size: 12px;
        height: 10px;
        color: #999999;
      }
    }
  }
  .right {
    .btn {
      border-radius: 5px;
      //消除button的默认样式
      // margin: 0;
      // padding: 0;
      border: 1px solid transparent;  //自定义边框
      // outline: none;    //消除默认点击蓝色边框效果
      span {
        font-size: 10px;
        // margin: auto 5px;
      }
    }
  }
}

</style>
