<template>
  <form class="login-form">
    <div class="form-group">
      <input type="text" placeholder="请输入账号" v-model="username" />
    </div>
    <div class="form-group">
      <input type="password" placeholder="请输入密码" v-model="userpass" @keyup.enter="getLogin" />
    </div>
    <div class="form-group">
      <input type="button" value="登录" @click="getLogin" />
    </div>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      userpass: ""
    };
  },
  methods: {
    getLogin() {
      // console.log("访问查询参数：", this.$route.query.id);
      // this.$route：保存了当前路由信息
      console.log("登录");
      this.axios
        .post("/users/login", {
          username: this.username,
          userpass: this.userpass
        })
        .then(res => {
          console.log(res.data);
          if (res.data.state == "200") {
            // var token = "njaksxbxkjasbkjcxasbjk" // 模拟后台返回的token
            var token = res.data.token;
            sessionStorage.setItem("token", token);

            // 切换路由
            this.$router.replace("/home/BusinessManagement");

          } else {
            console.log("登陆失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/style/base.less";

.login-form {
  padding: 0 20px;

  .form-group {
    height: 60px;
    line-height: 60px;

    input[type="text"],
    input[type="password"] {
      width: 300px;
      padding: 6px;
      box-sizing: border-box;
    }

    input[type="button"] {
      width: 300px;
      height: 30px;
      background: rgb(84, 92, 100);
      color: #fff;
      border: none;
      outline: none;

      &:active {
        box-shadow: 1px 1px 3px #10412b;
      }
    }
  }
}
</style>