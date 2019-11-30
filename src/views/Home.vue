<template>
  <div class="about">
    <div class="nav">
      <span>地区:{{}}</span>
      <div>
        <span>管理员：{{}}</span>
        <a href="javascript:;" @click="quit">退出</a>
      </div>
    </div>
    <div class="content">
      <div class="left-nav">
        <router-link to="/home/BusinessManagement">商家管理</router-link>
        <router-link to="/home/manageusergroup">管理用户</router-link>
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
</template>

<script>
export default {
  name: 'home',
  methods: {
    quit () {
      sessionStorage.removeItem('token')
      this.$router.replace('/')
    }
  }
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 650px;
  background: #efefef33;
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
      }
    }
  }
  .content {
    width: 100%;
    height: 540px;
    margin-top: 35px;
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
