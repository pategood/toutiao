<template>
  <div class="channel-edit">
    <van-cell class="channel-title" :border="false">
      <div slot="title">我的频道</div>
      <!-- <van-button round plain type="danger"
       size="mini"  @click="isEdit=!isEdit">{{isEdit ? '完成':'编辑'}}</van-button> -->

      <button class="channel-btn" @click="isEdit=!isEdit"
      >{{isEdit ? '完成':'编辑'}}</button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
        :class="{ active: index === active  }"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel,index) in userChannels"
        :key="index" :text="channel.name"
        @click="onUserChannelClick(channel,index)"
        />
    </van-grid>

    <van-cell class="channel-title" :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id" :text="channel.name"
        @click="onAdd(channel)" />
    </van-grid>

  </div>
</template>
<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: '',
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表 筛选剩余频道
    recommendChannels() {
      return this.allChannels.filter((channel) => !this.userChannels.find((userChannel) => userChannel.id === channel.id))
    }
    /*
    const arr = []
      this.allChannels.forEach(channel => {
        let flag = false
        for (let i = 0; i < this.userChannels.length; i++) {
          if (this.userChannels[i].id === channel.id) {
            flag = true
            break
          }
        }
        if (!flag) {
          arr.push(channel)
        }
      })
      return arr
    }
*/

  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd(channel) {
      if (this.isEdit) {
        this.userChannels.push(channel)
        if (this.user) {
          await addUserChannel({
            channels: [{
              id: channel.id, seq: this.userChannels.length
            }]
          })
        } else {
          setItem('user-channels', this.userChannels)
        }
      }
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态 删除
        this.deleteChannel(channel, index)
      } else {
        // 非编辑  添加
        this.switchChannel(index)
      }
    },
    // 删除频道
    async deleteChannel(channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      if (this.user) {
        // 登录 持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel(index) {
      this.$emit('close')
      this.$emit('update-active', index)
      this.isEdit = false
    }
  }
}
</script>
<style lang='scss' scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333;
    .channel-btn {
      box-sizing: content-box;
      font-size: 16px;
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 10px;
    }
  }
  .grid-item {
    width: 80px;
    height: 43px;

    ::v-deep .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    ::v-deep .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    ::v-deep .van-grid-item__text {
      color: red !important;
    }
  }
}

</style>
