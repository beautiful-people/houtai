<template>
  <div class="peakfire">
    <!-- <div class="search-content">
      <input type="text" v-model="search" placeholder="请输入商家名称" />
      <button type="button" @click="getMerName(search)" class="search">查找</button>
    </div> -->
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
                @click="particulars = true,handleDelete(scope.row)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-table :data="tableData" style="width: 100%" max-height="390">
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
            @click="particulars = true,handleDelete(scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- 查看商家认证按钮的模态框 -->
    <el-dialog
      title="详情"
      :visible.sync="particulars"
      width="30%"
      :before-close="handleClose"
      class="model"
    >
      <ul class="particulars">
        <li><span>账户Id:</span>{{merchant.accId}}</li>
        <li><span>账户对象:</span>{{merchant.account}}</li>
        <li><span>省份名:</span>{{merchant.merProName}}</li>
        <li><span>是否认证</span>{{merchant.credentials}}</li>
        <li><span>商家简称:</span>{{merchant.merAbbr}}</li>
        <li><span>详细地址:</span>{{merchant.merAddress}}</li>
        <li><span>是否开通预约功能:</span>{{merchant.merAppo}}</li>
        <li><span>资质:</span>{{merchant.merAptitude}}</li>
        <li><span>注册资本:</span>{{merchant.merAsset}}</li>
        <li><span>市名:</span>{{merchant.merCityName}}</li>
        <li><span>业务范围:</span>{{merchant.merCoverage}}</li>
        <li><span>区县名:</span>{{merchant.merDisName}}</li>
        <li><span>职务:</span>{{merchant.merDuty}}</li>
        <li><span>400电话:</span>{{merchant.merFourPhone}}</li>
        <li><span>免费服务:</span>{{merchant.merFreeserve}}</li>
        <li><span>商家Id:</span>{{merchant.merId}}</li>
        <li><span>行业库:</span>{{merchant.merIndustry}}</li>
        <li><span>联系人:</span>{{merchant.merLinkman}}</li>
        <li><span>商家全称:</span>{{merchant.merName}}</li>
        <li><span>商家性质:</span>{{merchant.merNature}}</li>
        <li><span>经营模式:</span>{{merchant.merPattern}}</li>
        <li><span>手机:</span>{{merchant.merPhone}}</li>
        <li><span>承接价位:</span>{{merchant.merPrice}}</li>
        <li><span>省份名:</span>{{merchant.merProName}}</li>
        <li><span>主营产品或服务:</span>{{merchant.merProServe}}</li>
        <li><span>是否开通最新招标提醒:</span>{{merchant.merRemind}}</li>
        <li><span>信誉分:</span>{{merchant.merReputation}}</li>
        <li><span>服务区域:</span>{{merchant.merServeArea}}</li>
        <li><span>商家简介:</span>{{merchant.merSynopsis}}</li>
        <li><span>商家类型</span>{{merchant.merType}}</li>
        <li><span>400电话开关:</span>{{merchant.merfourSwitch}}</li>
        <li><span>省对象:</span>{{merchant.province}}</li>
        <li><span>注册时间:</span>{{getTime(merchant.userDate)}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="particulars = false">取消认证</el-button>
        <el-button type="primary" @click="particulars = false,dialogVisible = true" class="sure">通过认证</el-button>
      </span>
    </el-dialog>

    <!-- 通过商家认证按钮的模态框 -->
    <el-dialog
      title="注意"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="model"
    >
      <span class="span">是否通过当前商家认证？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel(),dialogVisible = false">不通过</el-button>
        <el-button type="primary" @click="dialogVisible = false,Deauthentication()" class="sure">通过</el-button>
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
      messageInfoId: "",
      messageId:"",
      tableData: [],
      currentPage: 1 /* 当前页码 */,
      totalCount: 0, //获取数据的总条数
      pageSize: 3,
      provinceList: [],
      merchant:{},//认证详情
      messageStatus:"",
      tabPosition: 'top'
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleDelete(row) {/* 商家认证按钮,获取id值，并向服务器传送id值 */
      console.log(row.messageInfoId);
      this.messageInfoId = row.messageInfoId;
      this.messageId = row.messageId;
      this.axios
        .post("/peShowMerchantInfos", {
          messageInfoId: this.messageInfoId
        })
        .then(res => {
          console.log('认证详情',res.data.data.merchant);
          this.merchant = res.data.data.merchant;
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
    Deauthentication() {      /* 点击确定按钮，向服务器传送id值，通过商家认证 */
      this.axios
        .post("/peMessageOperation", {
          merId: this.merchant.merId,
          messageId:this.messageId,
          operation:"yes"
        })
        .then(res => {
          console.log(res.data.code);
          this.open2('认证成功');
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {      /* 点击取消按钮，向服务器传送id值，不通过商家认证 */
      this.axios
        .post("/peMessageOperation", {
          merId: this.merchant.merId,
          messageId:this.messageId,
          operation:"no"
        })
        .then(res => {
          console.log(res.data.code);
          this.open2('否认认证成功');
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
        .post("/peShowMessages", {
          currentPage: val, //当前页
          pageSize: this.pageSize, //每页显示的条数
          messageStatus:this.messageStatus
        })
        .then(res => {
          // console.log('认证数据',res. data.data.messageList);
          this.tableData = res.data.data.messageList;
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
    getData() {
      this.axios
        .post("/peShowMessages", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize,//每页显示的条数
          messageStatus:this.messageStatus
        })
        .then(res => {
          console.log('认证数据',res.data.data);
          this.tableData = res.data.data.messageList;
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
        .post("/peShowMessages", {
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize,//每页显示的条数
          messageStatus:this.messageStatus
        })
        .then(res => {
          // console.log('认证数据',res.data.data.messageList);
          this.tableData = res.data.data.messageList;
          this.totalCount = res.data.data.page.totalCount;
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
.el-table th {
  background: #99a9bf;
  color: white;
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
