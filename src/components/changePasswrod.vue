<template>
    <div class="changePasswrod">
        <h3>修改密码</h3>
        <div class="form-changepass">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input v-model.number="ruleForm.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item> -->
                <el-form-item>                    
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm',ruleForm.pass,ruleForm.checkPass)">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:"changePasswrod",
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
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
          checkPass: '',
          oldPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName,pass,checkPass) {
          console.log(pass);
          console.log(checkPass);//获取输入的密码
        /* this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        }); */
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
</style>