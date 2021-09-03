<template>
  <van-cell class="review-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="review.aut_photo" />
    <div slot="title">
      <div class="title-top">
        <div class="name">{{review.aut_name}}</div>
        <div class="praise">
          <van-icon class="praise-icon" class-prefix="t" name="dianzan" type="info" round />
          <span class="praise-count">{{review.like_count||12}}</span>
        </div>
      </div>
      <div class="content">{{review.content}}</div>
      <div>
        <span class="pubdate">{{review.pubdate | dateTime}}</span>
        <van-button class="reply-btn" round size="mini">{{review.reply_count||88}}回复</van-button>
      </div>
    </div>

  </van-cell>
</template>
<script>
export default {
  name: 'reviewItem',
  data() {
    return {
    }
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  components: {}
}
</script>
<style lang='scss' scoped>
.review-item{
  .avatar {
    width: 36px;
    height: 36px;
  }
  .title-top{
    display: flex;
    justify-content: space-between;
    .name{
      font-size: 14px;
      color: #306599;
    }
    .praise {
      .praise-icon{}
      .praise-count{}
    }
  }
  .content{
    font-size: 16px;
    color: #222;
  }
  .pubdate{
    font-size: 10px;
    margin-right: 10px;
  }
  .reply-btn{}

}
</style>
