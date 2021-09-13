<template>
  <div class="chat_conent">
    <van-nav-bar title="小博同学" left-arrow @click-left="$router.back()" />

    <van-cell-group class="message-list">
      2呃3
      <van-cell ></van-cell>
      <van-cell></van-cell>
      <van-cell></van-cell>
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false"></van-field>
      <van-button type="primary" size="small">发送</van-button>
    </van-cell-group>

  </div>
</template>
<script>
import io from 'socket.io-client'
// socket.on('connect', function() {})
// // socket.on('event', function() {})
// // socket.on('disconnect', function() {})
// // 发送信息 （emit的内容根据接口文档）
// // socket.emit('消息类型', 消息内容)
// // socket.on('消息类型', function(data) {data消息})
export default {
  name: 'chat',
  data() {
    return {
      socket: null,
      message: ''
    }
  },
  components: {},
  created() {
    const socket = io('http://ttapi.research.itcast.cn/')
    this.socket = socket
    socket.on('connect', function() {
      console.log('建立连接')
    })
    // 监听message,接口设置了event就是message
    socket.on('message', function(data) {
      console.log(data)
    })
  },
  destroyed() {
    // this.socket.on('disconnect', function() {
    //   console.log('断开连接')
    // })
  },
  methods: {
    onSend() {
      this.socket.emit('message', {
        msg: this.message,
        timestamp: Date.now()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.chat_conent {
  height: 100%;
  width: 100%;
  .message-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
  }
  .send-message-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0 14px;
    align-items: center;
  }
}

</style>
