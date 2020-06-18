<template>
  <div class="login-div">
    <el-card class="box-card">
      <h4>地团餐饮管理系统</h4>
      <el-input v-model="acc" placeholder="请输入管理员账号"></el-input>
      <el-input class="pwd-input" v-model="pwd" placeholder="请输入密码"></el-input>
      <p v-show="error_text">用户名或密码错误</p>
      <el-button @click="clickLogin" type="primary" class="btn">登录</el-button>
    </el-card>
  </div>
</template>

<script>
import { API_LOGIN } from "../api/apis"

export default {
  data() {
    return {
      acc: "",
      pwd: "",
      error_text: false,
      isreq: true //点击后是否发送请求 true: 发送登录请求   false: 不发送请求
    };
  },
  methods: {
    clickLogin() {
      // 防抖节流： 3秒定时器..点击一次发送一次请求后，3秒后才能发送下一次请求
      if (this.isreq == false) return;

      //发送一次登录请求，把标识设置为false
      this.isreq = false;

      //发送请求
      API_LOGIN(this.acc, this.pwd).then(res => {
        //          code: 0
        //          id: 55
        //          msg: "欢迎你，登录成功"
        //          role: "super"
        //          token: "eyJhbGciOiJIUzI1NiIsInR

        if (res.data.code == 0) {
          //登录成功!
          this.$message({
            message: "登陆成功!",
            type: "success"
          });


          // 1. 登录成功后，把token，账号名写入到浏览器中
          // 把用户权限组写入到本地存储
          localStorage.token = res.data.token;
          localStorage.acc = this.acc;
          localStorage.id = res.data.id;
          localStorage.role = res.data.role;  

          this.$router.push("/index/home"); //找到main.js中router对象实例， 调用push()函数改变hash地址
        } else {
          this.$message.error("登录失败,用户名或密码错误");
          this.error_text = true;
        }
      });

      setTimeout(() => {
        this.isreq = true; //3秒后，又可以进行点击
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
@base: #2d3a4b;

.login-div {
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg1.jpg) no-repeat;
  background-size: 100% 70%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-card {
    width: 300px;
    text-align: center;

    h4 {
      color: @base;
      margin: 14px 0;
    }

    .pwd-input {
      margin-top: 8px;
    }
    .btn {
      margin-top: 12px;
      width: 100%;
    }
  }
}
</style>