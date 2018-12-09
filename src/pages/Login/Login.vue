<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a @click="loginWay = true"
             href="javascript:;"
             :class="{on: loginWay}">短信登录</a>
          <a @click="loginWay = false"
             :class="{on: !loginWay}"
             href="javascript:;">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <!-- 将表单的 form 提交改为触发 getLogin -->
        <form @submit.prevent="getLogin">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input v-model="phone"
                     type="tel"
                     maxlength="11"
                     placeholder="手机号">
              <button :disabled="!rightPhone"
                      class="get_verification"
                      :class="{right_phone: rightPhone}"
                      @click.prevent="getCode">
                {{ computeTime > 0 ? `已发送 (${computeTime}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel"
                     maxlength="8"
                     v-model="code"
                     placeholder="验证码">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="手机/邮箱/用户名"
                       v-model="name">
              </section>
              <section class="login_verification">
                <input v-if="showPwd"
                       v-model="pwd"
                       type="text"
                       maxlength="11"
                       placeholder="密码">
                <input v-else
                       v-model="pwd"
                       type="password"
                       maxlength="11"
                       placeholder="密码">
                <div @click="showPwd = !showPwd"
                     class="switch_button"
                     :class="showPwd ? 'on' : 'off'">
                  <div class="switch_circle"
                       :class="{right: showPwd}"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="验证码"
                       v-model="captcha">
                <img class="get_verification"
                     src="http://localhost:3000/captcha"
                     alt="captcha"
                     @click="getCaptcha"
                     ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;"
           class="about_us">关于我们</a>
      </div>
      <a @click="$router.back()"
         href="javascript:"
         class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText"
              v-show="showAlert"
              @closeTip="closeTip" />

  </section>

</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api/'
export default {
  data () {
    return {
      loginWay: true, // true 代表短信登录。false 代表账号密码登录
      phone: '',  // 手机号
      computeTime: 0, // 计时的时间
      showPwd: false, // 是否显示密码
      code: '',   // 短信验证码
      name: '',   // 手机/邮箱/用户名
      pwd: '',    // 密码
      captcha: '',  // 图形验证码
      alertText: '',  // 提示字符串
      showAlert: false, // 是否显示提示框
    }
  },
  computed: {
    // 验证手机号
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  components: {
    AlertTip
  },
  methods: {
    // 异步获取短信验证码
    async getCode () {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 30
        this.intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            // 关闭定时器
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发动 ajax 请求(向指定手机号发送验证码短信)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 发送失败
          // 显示提示
          this.showAlertBox(result.msg)
          // 停止倒计时
          if (this.computeTime) {
            this.computeTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
        }
      }
    },
    // 显示提示框
    showAlertBox (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 关闭提示框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 异步登录
    async getLogin () {
      let result
      // 前台表单验证
      if (this.loginWay) {
        // 短信登录
        const { rightPhone, phone, code } = this
        if (!this.rightPhone) {
          // 手机号不正确
          this.showAlertBox('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 正则判断短信验证码是否是 6 位数字
          this.showAlertBox('验证码不正确')
          return
        }
        // 数据校验通过，发送短信登录请求
        result = await reqSmsLogin(phone, code)
      } else {
        // 密码登录
        const { name, pwd, captcha } = this
        if (!this.name) {
          // 请填写用户名
          this.showAlertBox('请填写用户名')
          return
        } else if (!this.pwd) {
          // 请填写密码
          this.showAlertBox('请填写密码')
          return
        } else if (!this.captcha) {
          // 请填写验证码
          this.showAlertBox('请填写验证码')
          return
        }
        // 数据校验通过，发送密码登录请求
        result = await reqPwdLogin({ name, pwd, captcha })
      }

      // 停止倒计时
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }

      // 根据结果数据处理
      if (result.code == 0) {
        // 登录成功
        const user = result.data
        // 将 user 保存到 vuex 的state
        this.$store.dispatch('recordUser', user)

        // 跳转到 个人中心
        this.$router.replace('/profile')
      } else {
        // 登录失败
        this.getCaptcha()
        this.captcha = ''
        const msg = result.msg
        this.showAlertBox(msg)
      }
    },
    // 获取一个新的图片验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:3000/captcha?m=' + parseInt(Math.random() * 100)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.loginContainer
  width 100%
  height 100%
  overflow hidden
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
