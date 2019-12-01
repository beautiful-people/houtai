<template>
  <div class="app-entrance">
    <div class="content">
      <h1>装信通后台管理系统</h1>
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
    </div>
  </div>
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
        .post("/login", {
          accName: this.username,
          accPwd: this.userpass
        })
        .then(res => {
          console.log(res.data);
          /* if (res.data.code == "200") {
            // var token = "njaksxbxkjasbkjcxasbjk" // 模拟后台返回的token
            var token = res.data.token;
            sessionStorage.setItem("token", token);
            var accountId = res.data.data.accountId;
            sessionStorage.setItem("accountId",accountId)

            var power = res.data.data.power;
            sessionStorage.setItem("power",power);
            
            var admArea = res.data.data.admArea;
            sessionStorage.setItem("admArea",admArea);

            // 切换路由
            this.$router.replace("/home/BusinessManagement");

          } else {
            console.log("登陆失败");
          } */
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

.app-entrance {
    display: flex; // 弹性布局
    justify-content: center; // 让子元素水平居中
    align-items: center; // 让子元素垂直居中
    flex-direction: column; // 决定子元素排列方式
    height: 100vh; // 视窗单位，1vh=浏览器可视区域高度的 1%
    background: url("../../public/img/background/register_bg.jpg") center no-repeat;
    background-size: cover;

    .content {
      width: 400px;
      height: 400px;
      border: 1px solid rgb(84, 92, 100);
      display: flex; 
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-shadow: 0 0 5px;

      h1 {
        margin-bottom: 10px;
      }
    }
}

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