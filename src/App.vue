<template>
  <div class="about">
    <div class="nav"></div>
    <div class="content">
      <div class="left-nav">
        <router-link to="/BusinessManagement">商家管理</router-link>
        <router-link to="/manageusergroup">管理用户</router-link>
        <router-link to="/TheTenderReview">招标审核</router-link>
        <router-link to="/imageUpload">图片上传</router-link>
        <router-link to="/peakfire">商家认证</router-link>
        <router-link to="/changePasswrod">密码修改</router-link>
      </div>
      <div class="right-display">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  .nav {
    width: 100%;
    height: 50px;
    background: rgb(84, 92, 100);
  }
  .content {
    width: 100%;
    height: 540px;
    margin-top: 20px;
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
      background: red;
    }
  }
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
</style>
