<template>
  <div class="TheTenderReview">
    <el-tabs :tab-position="tabPosition" style="height: 200px;" @tab-click="tabData">
      <el-tab-pane label="全部">
        <el-table :data="tableData" style="width: 100%" max-height="390">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商家">
                  <span>{{ props.row.sendUserName }}</span>
                </el-form-item>
                <el-form-item label="商家ID">
                  <span>{{ props.row.sendUserId }}</span>
                </el-form-item>
                <el-form-item label="商家名称">
                  <span>{{ props.row.sendRole }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="messageStatus" align="center"></el-table-column>
          <el-table-column label="商家名称" prop="sendRole" align="center"></el-table-column>
          <el-table-column label="消息内容" prop="messageContent" align="center"></el-table-column>
          <el-table-column label="消息时间" prop="messageDate" align="center"></el-table-column>      
          <el-table-column label="操作" prop="operation" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="cancel"
                type="primary"
                :disabled="scope.row.messageStatus === '已读'"
                @click="particulars = true,handleDelete(scope.row)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未读">
        <el-table :data="tableData" style="width: 100%" max-height="390">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商家">
                  <span>{{ props.row.sendUserName }}</span>
                </el-form-item>
                <el-form-item label="商家ID">
                  <span>{{ props.row.sendUserId }}</span>
                </el-form-item>
                <el-form-item label="商家名称">
                  <span>{{ props.row.sendRole }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="messageStatus" align="center"></el-table-column>
          <el-table-column label="商家名称" prop="sendRole" align="center"></el-table-column>
          <el-table-column label="消息内容" prop="messageContent" align="center"></el-table-column>
          <el-table-column label="消息时间" prop="messageDate" align="center"></el-table-column>      
          <el-table-column label="操作" prop="operation" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="cancel"
                type="primary"
                :disabled="scope.row.messageStatus === '已读'"
                @click="particulars = true,handleDelete(scope.row)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已读">
        <el-table :data="tableData" style="width: 100%" max-height="390">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商家">
                  <span>{{ props.row.sendUserName }}</span>
                </el-form-item>
                <el-form-item label="商家ID">
                  <span>{{ props.row.sendUserId }}</span>
                </el-form-item>
                <el-form-item label="商家名称">
                  <span>{{ props.row.sendRole }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="messageStatus" align="center"></el-table-column>
          <el-table-column label="商家名称" prop="sendRole" align="center"></el-table-column>
          <el-table-column label="消息内容" prop="messageContent" align="center"></el-table-column>
          <el-table-column label="消息时间" prop="messageDate" align="center"></el-table-column>      
          <el-table-column label="操作" prop="operation" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="cancel"
                type="primary"
                :disabled="scope.row.messageStatus === '已读'"
                @click="particulars = true,handleDelete(scope.row)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 查看商家认证按钮的模态框 -->
    <el-dialog
      title="详情"
      :visible.sync="particulars"
      width="30%"
      :before-close="handleClose"
      class="model"
    >
      <ul class="particulars">
        <li><span>面积（平方米）：</span>{{tender.area}}</li>
        <li><span>项目名称：</span>{{tender.calusename}}</li>
        <li><span>投标公司要求：</span>{{tender.compayRequest}}</li>
        <li><span>装修预算（万元）：</span>{{tender.decorationBudget}}</li>
        <li><span>户型结构：</span>{{tender.familyStructure}}</li>
        <li><span>装修招标详细要求：</span>{{tender.fitmentRequest}}</li>
        <li><span>房屋现状：</span>{{tender.housingSituation}}</li>
        <li><span>联系人：</span>{{tender.linkMan}}</li>
        <li><span>地点：</span>{{tender.location}}</li>
        <li><span>中标商家：</span>{{tender.merId}}</li>
        <li><span>用户：</span>{{tender.merchant}}</li>
        <li><span>在线工地：</span>{{tender.onlinesites}}</li>
        <li><span>联系方式：</span>{{tender.phone}}</li>
        <li><span>预计开工时间:</span>{{getTime(tender.startTime)}}</li>
        <li><span>当前状态:</span>{{tender.state}}</li>
        <li><span>招标结束时间:</span>{{getTime(tender.tenderEndTime)}}</li>
        <li><span>招标Id:</span>{{tender.tenderId}}</li>
        <li><span>招标编号:</span>{{tender.tenderNum}}</li>
        <li><span>招标开始时间:</span>{{getTime(tender.tenderStartTime)}}</li>
        <li><span>工期:</span>{{tender.timeForProject}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="particulars = false">取消</el-button>
        <el-button type="primary" @click="particulars = false,dialogVisible = true" class="sure">通过</el-button>
      </span>
    </el-dialog>


    <!-- 通过招标认证的模态框 -->
    <el-dialog
      title="注意"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="model"
    >
      <span class="span">是否允许招标？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel(),dialogVisible = false">否</el-button>
        <el-button type="primary" @click="dialogVisible = false,Deauthentication()" class="sure">是</el-button>
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
  name: "BusinessManagement",
  data() {
    return {
      dialogVisible: false,
      particulars:false,
      search: "", //商家名字
      messageId: "",
      currentPage: 1 /* 当前页码 */,
      totalCount: 0, //获取数据的总条数
      pageSize: 3,
      merProName: "", //服务区域
      provinceList: [],//区域信息集合
      tableData: [],
      tender:{},//认证详情
      messageStatus:"",
      tabPosition:"top",
      messageInfoId:""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleDelete(row) {/* 详情按钮，获取id值，并向服务器传送id值 */
      console.log(row.messageInfoId);
      this.messageInfoId = row.messageInfoId;
      this.messageId = row.messageId;
      this.axios
        .post("/showReleasingNoticesInfo", {
          messageInfoId: this.messageInfoId
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          console.log('认证详情',res.data.data.tender);
          this.tender = res.data.data.tender;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose(done) {      /* 取消商家认证模态框的关闭 */
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    Deauthentication() {  /* 点击是按钮，向服务器传送id值，允许商家招标 */
      this.axios
        .post("/reMessageOperation", {
          tenderId: this.tender.tenderId,
          messageId:this.messageId,
          operation:"yes"
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          console.log(res.data.code);
          this.open2('通过招标设置成功');
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {      /* 点击取消按钮，向服务器传送id值，不通过商家认证 */
      this.axios
        .post("/reMessageOperation", {
          tenderId: this.tender.tenderId,
          messageId:this.messageId,
          operation:"no"
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          console.log(res.data.code);
          this.open2('不通过招标设置成功');
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMerName(merName) {      /* 根据名字查找商家 */
      console.log(merName);
    },
    handleSizeChange(val) {      /* 每页多少条数据 */
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {      /* 获取当前页码 */
      this.axios
        .post("/reShowMessages", {
          currentPage: val, //当前页
          pageSize: this.pageSize, //每页显示的条数
          messageStatus:this.messageStatus
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          console.log('认证数据',res.data.data.merchantList);
          this.tableData = res.data.data.merchantList;
          this.totalCount = res.data.data.page.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    open2(message) {
        this.$message({
          message: message,
          type: 'success'
        })
    },
    getData() {//获取数据
      this.axios
        .post("/reShowMessages", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize, //每页显示的条数
          messageStatus:this.messageStatus
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          console.log('认证数据',res.data.data.merchantList);
          this.tableData = res.data.data.merchantList;
          console.log('分页',res.data.data);
          this.totalCount = res.data.data.page.totalCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    tabData(target,event) {//tab切换事件
      // console.log(target.label);
      this.messageStatus = target.label
      this.currentPage = 1
      console.log(event);
      this.axios
        .post("/reShowMessages", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize,//每页显示的条数
          messageStatus:this.messageStatus
        },
        {
            headers: {
              "content-type": "application/json",
              "token": sessionStorage.getItem("token")
            }
          })
        .then(res => {
          // console.log('认证数据',res.data.data.messageList);
          this.tableData = res.data.data.merchantList;
          this.totalCount = res.data.data.page.totalCount;
          console.log(this.currentPage);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTime(time) {
      /**
       * 时间对象的格式化;
       */
      Date.prototype.format = function(format) {
        /*
         * eg:format="YYYY-MM-dd hh:mm:ss";
         */
        var o = {
          "M+": this.getMonth() + 1, // month
          "d+": this.getDate(), // day
          "h+": this.getHours(), // hour
          "m+": this.getMinutes(), // minute
          "s+": this.getSeconds(), // second
          "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
          S: this.getMilliseconds() // millisecond
        };
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
      var jsDate = new Date(time).toLocaleDateString();
      var date = jsDate.split("/");
      var times = date.join("-");
      return times
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
.particulars {
  width: 100%;
}
.particulars,li {
  list-style:none
}
.particulars li {
  float: left;
  width: 50%;
}
.particulars li span {
  font-size: 16px;
  font-weight: 700;
}

.el-dialog__wrapper {
  height: 100vh;
}
</style>
