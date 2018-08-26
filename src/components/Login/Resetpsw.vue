<template lang="html">
  <div class="ps-login">
    <div class="ps-login__title">重置密码</div>
    <div class="ps-login__content">
      <div class="ps-login__box">
        <el-form :model="resetpswForm"  :rules="rules" ref="resetForm" class="demo-ruleForm">
          <el-form-item prop="email">
            <el-input placeholder="请输入您的邮箱" prefix-icon="iconfont icon-tianxieshoujihao" v-model="resetpswForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input
            placeholder="请输入密码" :type="inputType" prefix-icon="iconfont icon-mimasuo"
            v-model="resetpswForm.newPwd">
            </el-input>
            <i class="iconfont icon-chakan" @click="changeInputType"></i>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input
                placeholder="确认密码" :type="inputType2" prefix-icon="iconfont icon-mimasuo"
                v-model="resetpswForm.confirmPwd">
            </el-input>
            <i class="iconfont icon-chakan" @click="changeInputType2"></i>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" :loading="isLoading" @click="resetpsw">确定</el-button>
      <div class="ps-login__router">
      </div>
    </div>
  </div>
</template>

<script>
import { isEmail } from '@/utils/validate'
import {resetPassword} from 'api/api'
import user from 'utils/user'
import md5 from 'js-md5'
import Cookie from 'js-cookie'
//import { USER_INFO } from '@/store/mutation-types'

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入邮箱'));
      }else if (!isEmail(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入密码'));
      }else if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    };
    const checkConfirmPwd = (rule, value, callback) => {
      if (value != this.resetpswForm.newPwd) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        email: '',
        password: ''
      },
      resetpswForm:{
         email:'',
         newPwd:'',
         confirmPwd:''
      },
      remember:false,
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        newPwd: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        confirmPwd:[
          { validator: checkConfirmPwd, trigger: 'blur' }
        ]
      },
      isLoading: false,
      inputType: 'password',
      inputType2: 'password'
    }
  },
  methods: {
    resetpsw(){
       this.$refs.resetForm.validate(valid => {
          if(valid){
            resetPassword({
              email:this.resetpswForm.email,
              newPwd:md5(this.resetpswForm.newPwd),
              confirmPwd:md5(this.resetpswForm.confirmPwd)
            }).then((res) => {
                    if(res.code == 1){
                        this.$message({
                          message: '重置密码成功',
                          type: 'success'
                        });
                        Cookie.remove('ticket');
                        this.$router.push({path:'/'});
                    }
            })
          }
       })
    },
    changeInputType() {
      this.inputType = this.inputType === 'password' ? 'tel' : 'password';
    },
    changeInputType2() {
      this.inputType2 = this.inputType2 === 'password' ? 'tel' : 'password';
    },
    sendEmail(){

    }
  },
}
</script>

<style lang="scss">
@import 'src/assets/sass/var.scss';
@import 'src/assets/sass/mixins/mixins.scss';

@include b(login) {
  width: 371px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // 公共覆盖
  input {
    @include placeholder() {
      color: #b3b3b3;
    }
  }
  // 覆盖饿了么
  .el-form-item {
    &:last-child {
      margin: 0;
    }
  }
  .icon-chakan{
    cursor: pointer;
  }
  .el-button {
    width: 100%;
  }
  .el-input--prefix {
    .el-input__inner {
      padding-left: 37px;
      height: 44px;
      color: #333;
      font-weight: 700;
      border-color: #E1E1E6;
    }
    .el-input__prefix {
      left: 12px;
      .el-input__icon {
        line-height: 45px;
        color: #C4C4CC;
        font-size: 18px;
      }
    }
  }
  .icon-chakan {
    position: absolute;
    right: 12px;
    top: 50%;
    font-size: 14px;
    color: #CCCCD3;
    transform: translateY(-50%);
    &:hover {
      color: #333;
    }
  }
}

@include e(title) {
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, .4);
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@include e(content) {
  width: 100%;
  padding: 0 36px 42px;
  background: rgba(255, 255, 255, 1);
};
@include e(box) {
  width: 100%;
  margin: 36px 0;
  .el-form-item {
    margin-bottom: 28px;
  }
}
@include e(router) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0 0;
  p {
    color:#262626;
  }
}

</style>
