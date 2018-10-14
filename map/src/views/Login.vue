<template>
  <div class="login">
    <el-container class="login-content-container">
      <el-main class="login-content_main">
        <lottie :options="pumped_upAOptions"
                :height="200"
                :width="200"
                @animCreated="pumped_upAnimation"></lottie>
        <el-form :model="login"
                 :rules="rules"
                 ref="login">
          <el-form-item prop="account">
            <el-input v-model="login.account"
                      placeholder="用户名"
                      prefix-icon="el-icon-iconuser"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="login.password"
                      placeholder="密码"
                      type="password"
                      prefix-icon="el-icon-password"
                      @keyup.enter.native="loginHandle"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer class="login-content_footer">
        <el-button type="primary"
                   class="loginBtn"
                   :loading="loginFlag"
                   @click="loginHandle">{{btnText}}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import * as pumped_upAData from '@/assets/lottie/pumped_up.json'
export default {
  name: 'Login',
  data() {
    return {
      pumped_upAOptions: {
        animationData: pumped_upAData
      },
      pumped_upAObj: null,
      animationSpeed: 1,
      login: {
        account: 'admin',
        password: '123'
      },
      loginFlag: false,
      btnText: '立即登录',
      rules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: '账号不能为空'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
          }
        ]
      }
    }
  },
  methods: {
    pumped_upAnimation(anim) {
      this.pumped_upAObj = anim
      console.log(anim)
    },
    loginHandle() {
      if (this.login.account && this.login.password) {
        this.loginFlag = true
        this.btnText = '正在登录'
        this.$axios
          .post('login', {
            userName: this.login.account,
            passWord: this.login.password
          })
          .then(res => {
            return res.data
          })
          .then(data => {
            if (data.success) {
              this.loginFlag = false
              this.$notify({
                type: 'success',
                title: '提示',
                message: '登录成功,欢迎使用管理平台！'
              })
              this.$store.dispatch('setToken', true).then(() => {
                this.$router.push({ path: '/admin/overview' })
              })
            } else {
              this.loginFlag = false
              this.btnText = '重新登录'
              this.$notify.error({
                title: '错误提示',
                message: '登录错误，账号或密码错误'
              })
            }
          })
      } else {
        this.$notify({
          type: 'error',
          message: '账号或密码不能为空，请正确输入！',
          title: '发生错误'
        })
      }
    }
  }
}
</script>

