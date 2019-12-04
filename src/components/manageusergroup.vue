<template>
    <div class="manageusergroup">
        <div class="search-content">
            <el-button type="primary" @click="dialogVisible = true">添加管理员</el-button>
            <input type="text" v-model="search" placeholder="请输入管理员的姓名"> 
            <button type="button" @click="getMange(search)" class="search">查找</button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="管理员名" prop="date" align="center"></el-table-column>
            <el-table-column label="管理员身份" prop="name" align="center"></el-table-column>
            <el-table-column label="负责区域" prop="address" align="center"></el-table-column>
            <el-table-column lign="right" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row),editDialogVisible = true">编辑</el-button>
                    <el-button size="mini" type="danger" @click="open(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

      <!-- 添加管理员 -->
      <el-dialog
        title="添加管理员"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form label-width="80px">
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="管理区域">
              <el-select placeholder="请选择管理区域">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑 -->
      <el-dialog
        title="编辑"
        :visible.sync="editDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form label-width="80px">
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="管理区域">
              <el-select placeholder="请选择管理区域">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="管理员">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
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
        :total="totalPage"><!-- total:总共数据  page-size:每页显示条目个数    :current-page.sync="currentPage"当前所在的页码-->
      </el-pagination>
    </div>
</template>

<script>
export default {
    name:"manageusergroup",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: '',
        dialogVisible: false,
        editDialogVisible:false,
        currentPage: 1,/* 当前页码 */
        totalPage:0,//获取数据的总条数
        pageSize:3,
      }
    },
     mounted() {
      this.getData();
    },
    methods: {
      handleClose(done) {/* 关闭模态框 */
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      /* handleDelete(index, row) {
        console.log(index, row);
      }, */
      open(row) {//点击删除按钮打开确定对话框
      console.log(row.accId);//row.accId
      // let that = this;
      this.$confirm('是否删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        })/* .then(() => {
          that.$ajax.post('/',
          {})
          .then(res => {
            if(res.data.code === 1){
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
          });          
        }); */
      },
      openSuccess() {
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        });
      }
    },
    getData() {
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
        })
        .then(res => {
          /* console.log('分页数据',res.data); */
          this.tableData =  res.data.data.merchantList;
          /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;//获取数据的总条数
          /* console.log(this.totalPage);
          console.log(res.data.data.provinceList) */
          this.provinceList = res.data.data.provinceList;
        })
        .catch(err => {
          console.log(err);
        });
      },
      handleSizeChange(val) {/* 每页多少条数据 */
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange() {/* 获取当前页码 */
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
          proName:this.proName
        })
        .then(res => {
          /* console.log(res.data); */
          this.tableData =  res.data.data.merchantList;
          /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;
          /* console.log(this.totalPage); */
        })
        .catch(err => {
          console.log(err);
        });
      },
      getMange(merName) {/* 根据名字查找商家 */
        console.log(merName);
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
        })
        .then(res => {
          console.log(res.data);
          this.tableData =  res.data.data.merchantList;
          /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;
          /* console.log(this.totalPage); */
        })
        .catch(err => {
          console.log(err);
        });
      },
}
</script>

<style lang="less" scoped>
.el-pagination {/* 设置分页的定位 */
    position: absolute;
    bottom: 40px;
    right: 40px;
}
.search {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #409EFF;
    color: #FFF;
    background-color: #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
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
  width:100%;
  height: 50px;
  text-align: right;
  margin-bottom: 10px;
  input {
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #409EFF;
  }

  .el-button--primary {
    float: left;
    margin-left: 5px;
}
  input[type=button] {
    float: left;
  }
  
}
</style>