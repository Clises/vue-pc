<template>
  <div>

    <el-form :model="userInfoForm" status-icon :rules="rules" ref="userInfoForm" label-width="100px"
             class="form-content">
      <el-form-item label="昵称" prop="username">
        <el-input size="small" v-model="userInfoForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input size="small" v-model="userInfoForm.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="city">
        <el-button size="small" type="primary" @click="showRestPwd()">修改密码</el-button>
      </el-form-item>
    </el-form>
    <modify-pwd v-if="isShowResetPwd" @hideRestPwd="hideRestPwd"></modify-pwd>
  </div>
</template>
<script>
  import resetPwdDialog from "../components/resetPwdDialog";

  export default {
    data() {

      var validateUsername = (rule, value, callback) => {
        //if(value){
        //    return callback(new Error('用户名不能为空'));
        //}else{
        this.submitForm();
        return callback();
        //}
      };
      var validateEmail = (rule, value, callback) => {
        if (value.length && !isEmail(value)) {
          return callback(new Error("请输入正确格式的邮箱"));
        }
        this.submitForm();
        return callback();
      }
      return {

        userInfoForm: {
          username: '',
          email: ''
        },
        //验证
        rules: {
          username: [{validator: validateUsername, trigger: "blur"}],
          email: [{validator: validateEmail, trigger: "blur"}]
        },
        isShowResetPwd: false
      }
    },
    created() {

    },
    computed: {

    },
    methods: {
      //弹cen
      showRestPwd() {
        console.log(1)
        this.isShowResetPwd = true;
      },
      //弹cen关闭
      hideRestPwd() {
        this.isShowResetPwd = false;
      },

    },
    components: {
      "modify-pwd": resetPwdDialog
    },
    mounted() {

    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  /*@import "src/assets/sass/var.scss";*/
  /*@import "src/assets/sass/mixins/mixins.scss";*/
  .form-content{
    width: 500px;
  }
</style>
