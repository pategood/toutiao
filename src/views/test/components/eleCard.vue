<template>
  <div  v-drag>
    <div class="imaCard_item">
      <div class="header">
        <img class="header_img" src="@/assets/gif/welcome to LOL.jpg" alt="">
      </div>

      <div class="footer">
        <div class="title">来自编辑推荐</div>

        <div class="content">
          <img class='con_img' src="@/assets/gif/welcome to LOL.jpg" alt="">
          <div class="recommend">
            <span class="recom_title">英雄联盟手游</span>
            <span>准备好参加独一无二的召唤师峡谷吗?</span>
          </div>
          <div class="xx">9.2</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eleCard',
  directives: {
    drag: function(el) {
      const dragBox = el
      dragBox.onmousedown = e => {
        // 算出鼠标相对元素的位置
        const disX = e.clientX - dragBox.offsetLeft
        const disY = e.clientY - dragBox.offsetTop
        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const left = e.clientX - disX
          const top = e.clientY - disY
          // 移动当前元素
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
        }
        document.onmouseup = e => {
          // 鼠标弹起来的时候不再移动
          document.onmousemove = null
          // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .imaCard_item {
    width: 360px;
    height: 270px;
    background-color: #ffffff;
    margin: 5px;
    border-radius: 10px;
    box-shadow:0px 0px 10px #d0d4d6;
    display: flex;
    // justify-content: center;    //垂直居中
    align-content: center;
    flex-direction: column;
    .header {
      height: 180px;
      width: 100%;
      .header_img {
        height: 100%;
        width: 100%;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
    .footer {
      width: 100%;
      margin: auto 10px;
      .title {
        box-sizing: content-box;
        font-size: 12px;
        margin: 0px auto 3px 5px;
      }
      .content {
        display: flex;
        // justify-content: center;
        // justify-content: space-evenly;
        align-content: center;
        .con_img {
          width: 62px;
          height: 62px;
          border-radius: 10px;
        }
        .recommend {
          font-size: 14px;
          color: #b1b1b1;
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;
          margin-left: 5px;
          // margin-right: 13px;
          .recom_title {
            color: black;
            font-size: 16px;
          }
        }
        .xx {
          margin-right: 0;
        }
      }
    }

  }
</style>
