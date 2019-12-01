<template>
  <div class="about">
    <div class="nav">
      <span>地区:{{admArea}}</span>
      <div>
        <span>管理员：{{power}}</span>
        <a href="javascript:;" @click="quit">退出</a>
      </div>
    </div>
    <div class="bottom-content">
      <div class="content">
        <div class="left-nav">
          <router-link to="/home/BusinessManagement">商家管理</router-link>
          <router-link to="/home/manageusergroup">管理用户</router-link><!--  v-if="role" -->
          <router-link to="/home/TheTenderReview">招标审核</router-link>
          <router-link to="/home/imageUpload">图片上传</router-link>
          <router-link to="/home/peakfire">商家认证</router-link>
          <router-link to="/home/changePasswrod">密码修改</router-link>
        </div>
        <div class="right-display">
          <router-view></router-view>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      power:"",//权限判断时用的
      role:"",//超级管理员时显示管理员选项卡
      accountId:"",//管理员的id
      admArea:""
    };
  },
  methods: {
    quit () {
      sessionStorage.removeItem('token')
      this.$router.replace('/')
    }
  },
  created() {
    /* this.axios.get('/users') 
      .then(res => { */
        this.accountId = sessionStorage.getItem("accountId")
        this.admArea = sessionStorage.getItem("admArea")
        /* console.log('获取用户权限：', res.data.power) */
        if(sessionStorage.getItem("power")== -1) {
          this.power = "超级管理员";
          this.role = true
        } else {
          this.power = "管理员";
          this.role = false
        }
      /* })
      .catch(err => {
        console.log(err)
      }) */
  }    
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100vh;
  .nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: white;
    background: rgb(84, 92, 100);
    span:nth-of-type(1) {
      margin-left: 20px;
    }
    div {
      float: right;
      height: 50px;
      margin-right: 20px;
      a {
        display: inline;
        color: white;
        margin-left: 20px;
      }
    }
  }
  .bottom-content {
    display: flex; // 弹性布局
    justify-content: center; // 让子元素水平居中
    align-items: center; // 让子元素垂直居中
    flex-direction: column; // 决定子元素排列方式
    height: 100vh-9; // 视窗单位，1vh=浏览器可视区域高度的 1%
    background: #efefef33;
  }
  .content {
    width: 100%;
    height: 540px;
    .left-nav {
      height: 100%;
      width: 200px;
      float: left;
      background: rgb(84, 92, 100);
      margin-left: 20px;
    }
    .right-display {
      height: 100%;
      margin-left: 240px;
      margin-right: 20px;
      border: 1px solid rgb(84, 92, 100);
      box-sizing: border-box;
      padding: 30px;
    }
    a {
      display: inline-block;
      width: 200px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      text-decoration: none;
      color: white;

      &:hover {
        background: #303133;
      }
    }
    .router-link-exact-active,
    .router-link-active {
      color: #ffd04b;
    }
  }
}

</style>
