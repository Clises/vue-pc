<template lang="html">
  <div class="ps-login">
    <div class="ps-login__title">运营后台</div>
    <div class="ps-login__content">
      <div class="ps-login__box">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
          <el-form-item prop="email">
            <el-input placeholder="请输入您的邮箱" prefix-icon="iconfont icon-tianxieshoujihao" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
            placeholder="请输入密码" :type="inputType" prefix-icon="iconfont icon-mimasuo"
            @keyup.enter.native="signIn" v-model="loginForm.password">
            </el-input>
            <i class="iconfont icon-chakan" @click="changeInputType"></i>
          </el-form-item>
        </el-form>
        <div class="" style="margin-top:20px">
          <el-checkbox v-model="rememberpwd">记住我</el-checkbox>
          <span @click="sendmail" class="cp" style="margin-left:172px">忘记密码</span>
        </div>
      </div>
      <el-button type="primary" :loading="isLoading" @click="signIn">登录</el-button>
      <div class="ps-login__router">
      </div>
    </div>
  </div>
</template>

<script>
import { isEmail } from '@/utils/validate'
import md5 from 'js-md5'
import {sendEmail} from 'api/api'
import user from 'utils/user'
import Cookie from 'js-cookie'
//import { USER_INFO } from '@/store/mutation-types'

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入邮箱'));
      }else if (!isEmail(value)) {
        //callback(new Error('请输入正确的邮箱'));
        callback();
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

    return {
      loginForm: {
        email: '',
        password: '',
        remember:1
      },
      rememberpwd:true,
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      isLoading: false,
      inputType: 'password'
    }
  },
  created(){
    const _ticket = Cookie.get('ticket')
    //判断用户之前是否选择过记住密码,如果是并却有票据，直接跳转
		if(localStorage.getItem('remember') ==  'true' &&  _ticket){
			// this.$router.push('/home')
		}
  },
  methods: {
    signIn() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.rememberpwd ? this.loginForm.remember = 1 : this.loginForm.remember = 0;
          if(this.rememberpwd){
            localStorage.setItem('remember',true);
            // localStorage.setItem('name',this.loginForm.email);
            // localStorage.setItem('token',md5(this.loginForm.password));
          }else{
            localStorage.setItem('remember',false);
          }
          user.login(this.loginForm).then((data)=>{
            this.isLoading = false;

            //判断是否为经销上第一次登陆，跳转到重置密码页面
            if(data.result.first_login == true && Cookie.get('role') == 204 ){
                this.$router.push('/resetpwd')
            }else{
                this.$router.push('/home')
            }
          }).catch((data) => {
            this.isLoading = false;
          })
        } else {
          console.log('用户信息校验不通过');
        }
      })
    },
    changeInputType() {
      this.inputType = this.inputType === 'password' ? 'tel' : 'password';
    },
    sendmail(){
      if(this.loginForm.email == '' || !isEmail(this.loginForm.email )){
        this.$message({
                  message: '请输入正确的邮箱',
                  type: 'error'
        });
        return false;
      }
      sendEmail({
            email:this.loginForm.email
      }).then((res) => {
            if(res.code == 1){
                this.$message({
                  message: '重置密码的链接已发送到您的邮箱，请打开邮箱查看',
                  type: 'success'
                });
            }
      })
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
    color: #262626;
  }
}

</style>
