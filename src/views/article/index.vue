<template>
  <div class="article-container">
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()">

    </van-nav-bar>
    <h1 class="header_title">{{article.title}}(postman)</h1>

    <van-cell center class="user-info">
      <div slot="title" class="nickName" >{{article.aut_name}}</div>
      <van-image class="avatar" slot="icon" width="35" height="35" round fit="cover" :src="article.aut_photo" />
      <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
      <van-button class="follow-btn" :loading="isFollowLoading"
      :type="article.is_followed ? 'default': 'info' "
      :icon="article.is_followed ? '': 'plus'" round size="small" @click="onFollow"
      >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
<!--  -->
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

  <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
  <van-icon name="comment-o" info="123" color="#777" />
  <van-icon :color="article.is_collected ? 'orange':''" :name="article.is_collected ? 'star':'star-o'" />
    <div class="content markdown-body" v-html="article.content" ref="article-content"></div>
  </div>
</template>
<script>
import './github-markdown.css'
import { getArticle } from '@/api/article.js'
// import { addFollow, undoFollow } from '@/api/user.js'
import { ImagePreview } from 'vant'
// import { debounce } from 'lodash'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      article: {},
      isFollowLoading: false
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {},
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
    async onFollow() {
      // () => {
      //   debounce(() => {
      //     this.$toast('用户未登录')
      //   }, 1000)
      // }

      // debounce(() => {
      //   this.$toast('用户未登录')
      // }, 1000)
    //   if (this.$store.state.user.token) {
    //     try {
    //       this.isFollowLoading = true
    //       if (this.article.is_followed) {
    //         await undoFollow(this.article.aut_id)
    //       } else {
    //         await addFollow(this.article.aut_id)
    //       }
    //       this.article.is_followed = !this.article.is_followed
    //       this.isFollowLoading = false
    //     } catch (err) {
    //       this.isFollowLoading = false
    //       console.log(err)
    //     }
    //   } else {
    //     debounce(() => {
    //       this.$toast('用户未登录')
    //     }, 1000)
    //     // this.$router.push('/login')
    //   }
    }
  }
}
</script>
<style lang='scss' scoped>
.article-container {
  .header_title {
    font-size: 20px;
    color: #3a343a;
    padding: 9px 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
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
