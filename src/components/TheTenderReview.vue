<template>
  <div class="TheTenderReview">
    <div class="search-content">
      <input type="text" v-model="search" placeholder="请输入商家的姓名进行查找" />
      <button type="button" @click="getMerName(search)" class="search">查找</button>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商家注册名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ props.row.people }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="商家全称">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="服务区域">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="业务范围">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="承接价位">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="行业库">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="经营模式">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="商家性质">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="注册资本">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="商家简介">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商家 ID" prop="id" align="center"></el-table-column>
      <el-table-column label="商家注册名" prop="name" align="center"></el-table-column>
      <el-table-column label="联系人" prop="people" align="center"></el-table-column>
      <el-table-column label="手机" prop="tel" align="center"></el-table-column>
      <el-table-column label="操作" prop="operation" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="dialogVisible = true,handleDelete(scope.row)"
          >允许招标</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 认证的模态框 -->
    <el-dialog
      title="注意"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="model"
    >
      <span class="span">是否允许招标？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" class="sure">确 定</el-button>
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
      :total="totalPage"
    >
      <!-- total:总共数据  page-size:每页显示条目个数    :current-page.sync="currentPage"当前所在的页码-->
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BusinessManagement",
  data() {
    return {
      dialogVisible: false,
      search: "", //商家名字
      accId: "",
      currentPage: 1 /* 当前页码 */,
      totalPage: 0, //获取数据的总条数
      pageSize: 3,
      merProName: "", //服务区域
      provinceList: [],
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          tel: "11111111111",
          people: "大王"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleDelete(row) {      /* 取消商家认证按钮,获取id值，并向服务器传送id值 */
      console.log(row.id);
      this.admId = row.id;
    },
    handleClose(done) {      /* 取消商家认证模态框的关闭 */
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    getMerName(merName) {      /* 根据名字查找商家 */
      console.log(merName);
    },
    getData() {
      this.axios
        .post("/showMerchant", {
          merProName: this.merProName, //服务区域
          merName: this.search,
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize //每页显示的条数
        })
        .then(res => {
          /* console.log('分页数据',res.data); */
          this.tableData = res.data.data.merchantList;
          /* console.log(this.tableData); */
          this.totalPage = res.data.data.page.totalCount; //获取数据的总条数
          /* console.log(this.totalPage);
          console.log(res.data.data.provinceList) */
          this.provinceList = res.data.data.provinceList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-pagination {  /* 设置分页的定位 */
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
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover {
    color: #606266;
    background-color: rgba(64, 160, 255, 0.315);
  }
}
.el-button--danger {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover {
    color: #606266;
    background-color: rgba(64, 160, 255, 0.315);
  }
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
  input {
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #409eff;
  }
  margin-bottom: 10px;
}
</style>
