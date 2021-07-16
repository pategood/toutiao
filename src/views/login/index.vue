<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar"
    title="登录 / 注册"
    left-arrow
    @click-left="$router.back()" />

    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref='login-form'
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="t"
        left-icon="shouji"
        placeholder="请输入手机号"
        center
        name='mobile'
        :rules="formRules.mobile"
        />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="t"
        left-icon="yanzhengma"
        center
        placeholder="请输入验证码"
        name='code'
        :rules="[formRules.code]" >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000*5"
            format="ss s"
            @finish="isCountDownShow = false"
          ></van-count-down>

          <van-button
            v-else
            size="mini"
            class="send-btn" round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17090086870',
        code: ''
      },
      formRules: {
        mobile: [
          { require: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { require: true, message: '请输入验证码' },
          { pattern: /^\d{4}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录...',
        forbidClick: true
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        // await this.$store.dispatch('userLogin', this.user)
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败,手机号和验证码错误')
      }
    },

    onFailed (error) {
      // console.log(error)
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: 'top' })
      }
    },

    async onSendSms () {
      // 校验手机号  通过后才发送验证码 并倒计时   结束后 要隐藏倒计时
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        // 展示 倒计时
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }

      this.isSendSmsLoading = false
      // 使用ref获取 并传入name来设置单独验证表单
      // this.$refs['login-form'].validate('mobile').then(data => {
      //   console.log(data)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
