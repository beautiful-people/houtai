<template>
    <div class="changePasswrod">
        <h3>修改密码</h3>
        <div class="form-changepass">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>                    
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="text" @click="dialogVisible = true" class="sure">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    <!-- type="primary" @click="submitForm('ruleForm',ruleForm.checkPass)" -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <span class="span">是否修改密码</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false,submitForm('ruleForm',ruleForm.checkPass)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"changePasswrod",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        dialogVisible: false,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName,checkPass) {
            console.log(checkPass);//获取输入的密码
            var accountId = sessionStorage.getItem("accountId");
            console.log(accountId);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/base.less';
.el-form-item {
    margin-bottom: 22px;
    height: 50px;
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
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
    &:hover {
        background-color: rgba(64, 160, 255, 0.315);
        border-color: rgba(64, 160, 255, 0.315);
    }
}
.el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-left: 20px;

    &:hover {
        color: #606266;
        background-color: rgba(64, 160, 255, 0.315);
    }
}
h3 {
    margin-bottom: 40px;
}
.span {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 16px;
}
.sure {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-left: 20px;

    &:hover {
        color: #606266;
        background-color: rgba(64, 160, 255, 0.315);
    }
}
</style>