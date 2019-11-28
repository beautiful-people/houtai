<template>
  <div class="about">
    <div class="left">
      <el-row>
        <el-col :span="14">
          <el-menu
            default-active="allusers"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-menu-item index="BusinessManagement">商家管理</el-menu-item>
            <el-menu-item index="manageusergroup">管理用户</el-menu-item>
            <el-menu-item index="TheTenderReview">招标审核</el-menu-item>
            <el-menu-item index="imageUpload">图片上传</el-menu-item>
            <el-menu-item index="peakfire">商家认证</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.about {
  overflow: hidden;
}
.left {
  width: 200px;
  height: 100%;
  float: left;
}
.right {
  float: left;
  padding: 20px 40px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 600px;
  min-height: 400px;
}
.el-row {
    text-align: center;
}
</style>
