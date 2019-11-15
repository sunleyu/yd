<template>
  <div class="page-login">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登 录"></van-nav-bar>
    <van-cell-group>
      <van-field
        @blur="checkMobile"
        v-model.trim="loginForm.mobile"
        label="手机号"
        :error-message="errMsg.mobile"
        placeholder="请输入手机号"
      />
      <van-field
        @blur="checkCode"
        v-model.trim="loginForm.code"
        label="验证码"
        :error-message="errMsg.code"
        placeholder="请输入验证码"
      >
        <van-button class="p5" slot="button" size="mini" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="info" block round @click="checkLogin">登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data: function () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      if (this.loginForm.mobile === '') {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '请输入正确手机号'
        return false
      }
      this.errMsg.mobile = ''
    },
    checkCode () {
      if (this.loginForm.code === '') {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '请输入正确验证码'
        return false
      }
      this.errMsg.code = ''
    },
    async checkLogin () {
      this.checkMobile()
      this.checkCode()
      if (this.errMsg.mobile && this.errMsg.code) {
        return false
      }

      try {
        const data = await login(this.loginForm)
        // 登录成功
        // 1. 更新 vuex 和 本地存储 用户信息
        this.setUser(data)
        // 2. 跳转（如果地址栏有回跳地址哪就回跳，如果没有跳转到个人中心）
        const { redirectUrl } = this.$route.query
        // || && 短路或 短路与
        this.$router.push(redirectUrl || '/user')
      } catch (e) {
        this.$toast.fail('手机号或验证码错误')
      }
    }
  },
  ...mapMutations(['setUser'])
}
</script>

<style scoped lang="less">
</style>
