<template>
  <div class="manageusergroup">
    <div class="search-content">
      <el-button type="primary" @click="dialogVisible = true">添加管理员</el-button>
      <span>请选择服务省份区域：</span>
      <select class="merServeArea" @change="getProName($event)">
        <option
          v-for="item in provinceList"
          :key="item.proId"
          :v-model="admArea"
          :value="item.proName"
        >{{item.proName}}</option>
      </select>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="管理员名" prop="account.accName" align="center"></el-table-column>
      <el-table-column label="管理员身份" prop="account.accPower" align="center"></el-table-column>
      <el-table-column label="负责区域" prop="admArea" align="center"></el-table-column>
      <el-table-column lign="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),editDialogVisible = true"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加管理员 -->
    <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-form label-width="80px">
          <el-form-item label="账户名">
            <el-input v-model="accName"></el-input>
          </el-form-item>
          <el-form-item label="管理区域">
            <select class="merServeArea" @change="getnewAdmArea($event)">
              <option
                v-for="item in provinceList"
                :key="item.proId"
                :v-model="newAdmArea"
                :value="item.proName"
              >{{item.proName}}</option>
            </select>
          </el-form-item>
          <el-form-item label="账户初始密码">
            <el-input v-model="accPwd"></el-input>
          </el-form-item>
          <el-form-item label="管理员身份">
            <el-input v-model="accPower" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose">
      <div>
        <form>
          <span>管理员id</span>
            <input type="text"  v-model="accId">
            <span>管理区域</span>
            <select class="merServeArea" @change="getEditAdmArea($event)">
              <option
                v-for="item in provinceList"
                :key="item.proId"
                :v-model="editAdmArea"
                :value="item.proName"
              >{{item.proName}}</option>
            </select>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit(),editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalCount"
    >
      <!-- total:总共数据  page-size:每页显示条目个数    :current-page.sync="currentPage"当前所在的页码-->
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "manageusergroup",
  data() {
    return {
      tableData: [], //管理员列表
      search: "",
      dialogVisible: false,
      editDialogVisible: false,
      currentPage: 1 /* 当前页码 */,
      totalCount: 0, //获取数据的总条数
      pageSize: 3,
      provinceList: [], //区域信息集合
      admArea: "",//服务区域
      accName:"",//新建管理员名
      accPwd:"",//新建管理员初始密码
      accPower:"管理员",//新建管理员身份
      newAdmArea:"",//新建管理员负责区域
      editAdmArea:"",//修改负责区域
      accId:"",//修改管理员的id
      proName:"",
      delAccId:""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClose(done) {
      /* 关闭模态框 */
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleEdit(index, row) {//编辑按钮,获取被点击的管理员的id和负责区域
      console.log(index, row);
      console.log(row.account.accId);
      console.log(row.admArea);
      this.editAdmArea = row.admArea;
      this.accId = row.account.accId;
    },
    getEditAdmArea(e) {
        console.log(e.target.value);
        console.log(this.accId);
        this.editAdmArea = e.target.value;
    },
    edit() {//编辑管理员确定按钮
      this.axios
        .post("/changeAdministrators", {
            accId:this.accId,
            admArea:this.editAdmArea//新建管理员负责区域
        },{
          headers:{
            "content-type": "application/json",
              "token": sessionStorage.getItem("token")
          }
        })
        .then(res => {
            console.log("数据", res.data.code);
            if(res.data.code == "200") {
              this.getData();
              this.openSuccess("修改成功");
            }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /* handleDelete(index, row) {
        console.log(index, row);
      }, */
    open(row) {      //点击删除按钮打开确定对话框
      console.log(row.account.accId); //row.accId
      let that = this;
      let delAccId = row.account.accId;
      this.$confirm("是否删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) 
      .then(() => {
          this.axios
          .post("/deleteAdministratorPowers", {
            accId:delAccId
          },{
            headers:{
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
          .then(res => {
            if(res.data.code == '200'){
              that.getData();
              that.$message({
                type: 'success',
                message: '删除成功!'
                })
            }            
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        });
    },
    getnewAdmArea(e) {//新建的负责区域
      this.newAdmArea = e.target.value;
      console.log(this.newAdmArea)
    },
    addAdm() {//添加管理员确定按钮      
      this.axios
        .post("/addAdministrators", {
            accName:this.accName,//新建管理员名
            accPwd:this.accPwd,//新建管理员初始密码
            accPower:this.accPower,//新建管理员身份
            admArea:this.newAdmArea//新建管理员负责区域
        },{
          headers:{
            "content-type": "application/json",
              "token": sessionStorage.getItem("token")
          }
        })
        .then(res => {
            console.log("数据", res.data.code);
            if(res.data.code == "200") {
              this.accName = "";
              this.accPwd = "";
              this.newAdmArea = "";
              this.getData();
              this.openSuccess("添加成功");
              this.dialogVisible = false;
            } else if(res.data.code == "800") {
                this.open3("账户已经存在，请重新创建");
                this.accName = "";
            } else if (res.data.code == "500") {
                this.open3("区域负责人已经存在，请重新创建");
                this.newAdmArea = "";
            }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openSuccess(message) {
      this.$message({
        message: message,
        type: "success"
      });
    },
    open3(message) {
        this.$message({
          message: message,
          type: 'warning'
        });
      },
    getProName(e) {/* 根据负责区域查询 */
        /* console.log(e.target.value); */
        this.admArea = e.target.value;
        this.axios
        .post("/showAdministrators", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize, //每页显示的条数
          admArea:this.admArea
        },{
          headers:{
            "content-type": "application/json",
              "token": sessionStorage.getItem("token")
          }
        })
        .then(res => {
          console.log("数据", res.data);
          this.tableData = res.data.data.administratorList;
          this.totalCount = res.data.data.page.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
      },
    getData() {
      this.axios
        .post("/showAdministrators", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize, //每页显示的条数
          admArea:this.admArea
        },{
          headers:{
            "content-type": "application/json",
              "token": sessionStorage.getItem("token")
          }
        })
        .then(res => {
          // console.log("数据", res.data);
          this.tableData = res.data.data.administratorList;
          // console.log(this.tableData);
          this.totalCount = res.data.data.page.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {      /* 每页多少条数据 */
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {      /* 获取当前页码 */
      this.axios
        .post("/showAdministrators", {
          currentPage: val, //当前页
          pageSize: this.pageSize, //每页显示的条数
          admArea:this.admArea
        },{
          headers:{
            "content-type": "application/json",
              "token": sessionStorage.getItem("token")
          }
        })
        .then(res => {
          console.log("数据", res.data);
          this.tableData = res.data.data.administratorList;
          this.totalCount = res.data.data.page.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.axios
      .post("/showProvinces")
      .then(res => {
        console.log(res.data.data.provinceList);
        this.provinceList = res.data.data.provinceList; //区域信息集合
      },{
        headers:{
          "content-type": "application/json",
              "token": sessionStorage.getItem("token")
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  /* 设置分页的定位 */
  position: absolute;
  bottom: 40px;
  right: 40px;
}
.search {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  color: #fff;
  background-color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;

  &:hover {
    color: #606266;
    background-color: rgba(64, 160, 255, 0.315);
    border-color: rgba(64, 160, 255, 0.315);
  }
}
.search-content {
  width: 100%;
  height: 50px;
  text-align: right;
  margin-bottom: 10px;
  span {
    display: inline-block;
    height: 44px;
    line-height: 44px;
  }
  select {
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #409eff;
  }

  .el-button--primary {
    float: left;
    margin-left: 5px;
  }
  input[type="button"] {
    float: left;
  }
}
</style>