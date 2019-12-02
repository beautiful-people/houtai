<template>
  <div class="BusinessManagement">
    <div class="search-content">
      <input type="text" v-model="search" placeholder="请输入商家的姓名进行查找"> 
      <button type="button" @click="getMerName(search)" class="search">查找</button>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="390">
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
            <!-- <template slot-scope="props">
                <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)">Delete</el-button>
            </template> -->
            <!-- <el-form-item label="操作">
                <el-button size="mini" type="danger" @click="handleDelete(props.$index, props.row)">Delete</el-button>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商家 ID" prop="id" align="center"></el-table-column>
      <el-table-column label="商家注册名" prop="name" align="center"></el-table-column>
      <el-table-column label="联系人" prop="people" align="center"></el-table-column>
      <el-table-column label="手机" prop="tel" align="center"></el-table-column>
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
            <el-button type="primary" @click="dialogVisible = false" class="sure">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"><!-- total:总共数据  page-size:每页显示条目个数    :current-page.sync="currentPage"当前所在的页码-->
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BusinessManagement",
  data() {
    return {
        dialogVisible: false,
        search: "",
        admId:"",
        tableData: [
            {
            id: "12987122",
            name: "好滋好味鸡蛋仔",
            category: "江浙小吃、小吃零食",
            desc: "荷兰优质淡奶，奶香浓而不腻",
            address: "上海市普陀区真北路",
            shop: "王小虎夫妻店",
            shopId: "10333",
            tel:"11111111111",
            people:"大王"
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
        ],
        currentPage: 5,/* 当前页码 */
    };
  },
   methods: {
      handleDelete(row) {/* 取消商家认证按钮,获取id值，并向服务器传送id值 */
        console.log(row.id);
        this.admId = row.id;
      },
      handleClose(done) {/* 取消商家认证模态框的关闭 */
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
      },
      getMerName(merName) {/* 根据名字查找商家 */
        console.log(merName);
      },
      handleSizeChange(val) {/* 每页多少条数据 */
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {/* 获取当前页码 */
        console.log(`当前页: ${val}`);
      }
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
</style>
