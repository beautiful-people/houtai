<template>
  <div class="BusinessManagement">
    <div class="search-content">
      <span>请选择服务省份区域：</span>
      <select class="merServeArea" @change="getProName($event)">
        <option v-for="item in provinceList" :key="item.admId" :v-model="merProName" :value="item.proName">{{item.proName}}</option>
      </select>
      <input type="text" v-model="search" placeholder="请输入商家的姓名进行查找"> 
      <button type="button" @click="getMerName(search)" class="search">查找</button>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="390">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="联系人">
              <span>{{ props.row.merLinkman }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.merPhone }}</span>
            </el-form-item>
            <el-form-item label="商家全称">
              <span>{{ props.row.merName }}</span>
            </el-form-item>
            <el-form-item label="服务区域">
              <span>{{ props.row.merServeArea }}</span>
            </el-form-item>
            <el-form-item label="业务范围">
              <span>{{ props.row.merCoverage }}</span>
            </el-form-item>
            <el-form-item label="承接价位">
              <span>{{ props.row.merPrice }}</span>
            </el-form-item>
            <el-form-item label="行业库">
              <span>{{ props.row.merIndustry }}</span>
            </el-form-item>
            <el-form-item label="经营模式">
              <span>{{ props.row.merPattern }}</span>
            </el-form-item>
            <el-form-item label="商家性质">
              <span>{{ props.row.merNature }}</span>
            </el-form-item>
            <el-form-item label="注册资本">
              <span>{{ props.row.merAsset }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ props.row.merAddress }}</span>
            </el-form-item>
            <el-form-item label="商家简介">
              <span>{{ props.row.merSynopsis }}</span>
            </el-form-item>
            <!-- <template slot-scope="props">
                <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)">Delete</el-button>
            </template> -->
            <!-- <el-form-item label="操作">
                <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)">Delete</el-button>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商家 ID" prop="merId" align="center"></el-table-column>
      <el-table-column label="商家全称" prop="merName" align="center"></el-table-column>
      <el-table-column label="联系人" prop="merLinkman" align="center"></el-table-column>
      <el-table-column label="手机" prop="merPhone" align="center"></el-table-column>
      <el-table-column label="操作" prop="operation" align="center">
        <template slot-scope="scope">
            <el-button size="mini" class="cancel" type="primary" @click="dialogVisible = true,handleDelete(scope.row)">取消商家认证</el-button>
        </template>       
      </el-table-column>
    </el-table>
    <!-- 取消商家认证按钮的模态框 -->
    <el-dialog title="注意" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" class="model">
        <span class="span">是否取消当前商家认证？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Deauthentication(),dialogVisible = false" class="sure">确 定</el-button>
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
  name: "BusinessManagement",
  data() {
    return {
        dialogVisible: false,
        search: "",//商家名字
        accId:"",
        tableData: [],
        currentPage: 1,/* 当前页码 */
        totalPage:0,//获取数据的总条数
        pageSize:3,
        merProName:"",//服务区域
        provinceList:[],
        /* proName:""//超级管理员选择的服务区域 */
        token: sessionStorage.getItem("token"),
        accountId:sessionStorage.getItem("accountId"),
        power:sessionStorage.getItem("power"),
        admArea:sessionStorage.getItem("admArea")
    };
  },
  mounted() {
      this.getData();
    },
   methods: {
      handleDelete(row) {/* 取消商家认证按钮,获取id值 */
        // console.log(row.accId);
        this.accId = row.accId;        
      },
      Deauthentication() {/* 点击确定按钮，向服务器传送id值，通过商家认证 */
      this.currentPage=1;
        this.axios
        .post("/updateMerchant", {
          merId:this.accId
        },{
            headers: {
              "content-type": "application/json",
              "token": this.token
            }
          })
        .then(res => {
          console.log(res.data.code);
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
      },
      handleClose(done) {/* 取消商家认证模态框的关闭 */
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
      },
      getMerName(merName) {/* 根据名字查找商家 */
      this.currentPage=1;
        console.log(merName);
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
        },
        {
            headers: {
              "content-type": "application/json",
              "token": this.token
            }
          })
        .then(res => {
          // console.log(res.data);
          this.tableData =  res.data.data.merchantList;
          // /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;
          // /* console.log(this.totalPage); */
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
        },
        {
            headers: {
              "content-type": "application/json",
              "token": this.token
            }
          })
        .then(res => {
          // /* console.log(res.data); */
          this.tableData =  res.data.data.merchantList;
          // /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;
          // /* console.log(this.totalPage); */
        })
        .catch(err => {
          console.log(err);
        });
      },
      getProName(e) {
        // /* console.log(e.target.value); */
        this.merProName = e.target.value;
        this.currentPage=1;
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
        },
        {
            headers: {
              "content-type": "application/json",
              "token": this.token
            }
          })
        .then(res => {
          // /* console.log(res.data); */
          this.tableData =  res.data.data.merchantList;
          // /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;
          // /* console.log(this.totalPage);
          // console.log(this.merProName) */
        })
        .catch(err => {
          console.log(err);
        });
      },
      getData() {
        this.axios
        .post("/showMerchant", {
          merProName: this.merProName,//服务区域
          merName:this.search,
          currentPage: this.currentPage,//当前页
          pageSize:this.pageSize,//每页显示的条数
        },
        {
            headers: {
              "content-type": "application/json",
              "token": this.token
            }
          })
        .then(res => {
          // /* console.log('分页数据',res.data); */
          this.tableData =  res.data.data.merchantList;
          // /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount;//获取数据的总条数
          // /* console.log(this.totalPage);
          // console.log(res.data.data.provinceList) */
          this.provinceList = res.data.data.provinceList;
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    created() {
         
    }
};
</script>

<style lang="less">
.el-pagination {/* 设置分页的定位 */
    position: absolute;
    bottom: 40px;
    right: 40px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.span {
    display: inline-block;
    width: 100%;
    text-align: center;
}
.sure {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;

    &:hover {
        color: #606266;
        background-color: rgba(64, 160, 255, 0.315);
    }
}
/* .cancel {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;

    &:hover {
        color: #606266;
        background-color: rgba(64, 160, 255, 0.315);
        border-color: rgba(64, 160, 255, 0.315);
    }
    &:visited {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
    }
} */
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
  input {
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #409EFF;
  }
  margin-bottom: 10px;
}
.el-form--inline .el-form-item__label {
    float: none;
    display: inline-block;
    color: black;
    font-size: 16px;
}
.el-table th {
    background: white;
    color: #99a9bf;
}
.merServeArea {
    display: inline-block;
    box-sizing: border-box;
    padding: 11px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #409EFF;
    margin-right: 40px;
}
</style>
