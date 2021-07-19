<template>
<!--   <div class="article-item">
    文章列表项
  </div> -->
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap"
        v-if="article.cover.type === 3" >
        <div class="cover-wrap-item"
         v-for="(img, index) in article.cover.images"
         :key="index"
        >
          <van-image
            fit="cover"
            height="73"
            :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
/*     // 弹性盒模型
    display : -webkit-box;
    // 隐藏部分变成省略号 …
    text-overflow: ellipisis;
    // 多余部分隐藏
    overflow:hidden;
    -webkit-line-clamp: 1;
    // 垂直排列（最后一行也填充满
    -webkit-box-orient: vertical; */
  }
  ::v-deep .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    // flex-wrap: nowrap;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}

</style>
