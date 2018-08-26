<template>
  <el-dialog
    title="修改密码"
    :visible=true
    width="524px"
    :append-to-body=true
    :close-on-click-modal=true
    custom-class="dialog-resetpwd"
    :before-close="beforeClose"
  >
    <div class="ps-dialog__con text-left">
      <el-form :model="configForm" status-icon :rules="rules2" ref="configForm" label-width="100px" class="form-content">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="configForm.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="configForm.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPwd">
          <el-input type="password" v-model="configForm.confirmPwd" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    		<el-button size="small" @click="hideDialog">取 消</el-button>
			  <el-button size="small" type="primary" :loading="loading" @click="submitForm('configForm')">确认修改</el-button>
		</span>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .form-content{
    width: 450px;
  }
</style>

<script>

  // import {modifyPwd} from 'api/api'
  // import md5 from 'js-md5'

  export default {
    data() {
      var checkOrgPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }
        if(value.length<6){
          return callback(new Error('原密码长度至少6位'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.configForm.confirmPwd !== '') {
            this.$refs.configForm.validateField('confirmPwd');
          }
          if (value.length < 6) {
            return callback(new Error('密码长度至少6位'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.configForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading:false,
        configForm: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        rules2: {
          oldPwd: [
            { validator: checkOrgPass, trigger: 'blur' }
          ],
          newPwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
      sendForm(){
        var form = {}
        for (let key of Object.keys(this.configForm)) {
          form[key] = md5(this.configForm[key]);
        }
        return form;
      }
    },
    methods: {
      beforeClose(done){
        this.hideDialog();
      },
      hideDialog(){
        this.$emit('hideRestPwd');
      },
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       this.loading = true;
      //       modifyPwd(this.sendForm).then((json)=>{
      //         this.loading = false;
      //         if(json.success){
      //           this.$message.success('密码修改成功');
      //           this.configForm = {
      //             oldPwd: '',
      //             newPwd: '',
      //             confirmPwd: ''
      //           }
      //           this.hideDialog();
      //         }else{
      //           this.$message.error(json.message);
      //         }
      //       }).catch((e)=>{
      //         this.loading = false;
      //       });
      //     } else {
      //       return false;
      //     }
      //   });
      // }
    }
  }
</script>
