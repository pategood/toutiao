<template>
  <div class="postReview_content">
    <van-field
      v-model="leaveMsg"
      autosize
      type="textarea"
      maxlength="200"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="releaseBtn" text="发布" size="mini"
      @click.stop="onPost"></van-button>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { addComment } from '@/api/comment.js'
export default {
  name: 'postReview',
  data() {
    return {
      leaveMsg: ''
    }
  },
  props: {
    // 回复就传递评论ID(target)，发布评论就穿文章ID
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null,
      required: false
    }
  },
  methods: {
    onPost: debounce(async function() {
      if (this.leaveMsg.length > 0) {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.leaveMsg,
          art_id: this.articleId ? this.articleId.toString() : null// 对文章进行评论才传,单独评论不用传
        })
        // 请求成功就关闭，否则提示
        console.log(data, '发布评论')
      } else {
        // debugger
        this.$toast('评论内容为空')
      }
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  components: {}
}
</script>
<style lang='scss' scoped>
.postReview_content{
  display: flex;
  padding: 12px;
  align-items: center;
  .releaseBtn{
    min-width: 15px;
  }
}
</style>
