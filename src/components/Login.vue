<template lang="html">
  <div class="ps-login-wrapper">
    <img class="ps-login-wrapper__logo" src="../assets/images/photoplus/login-logo1.png" alt="">
    <div class="login-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  components: {}
}
</script>

<style lang="scss">
@import 'src/assets/sass/var.scss';
@import 'src/assets/sass/mixins/mixins.scss';
@include b(login-wrapper) {
    width: 631px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -315px;
    margin-top: -200px;

  @include e(logo) {
      width: 200px;
      float: left;
      margin-top: 110px;
      margin-right: 60px;
  };
  .login-wrapper{
      float:left;
  }
};
</style>
