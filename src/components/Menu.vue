<template>
  <el-aside width='200px'>
    <ul class="menu">
      <li :class="cpath == '/home/index' ?'active' : ''" @click="linkto('/home/index')">首页一些东西</li>
      <li :class="cpath == '/home/about' ?'active' : ''" @click="linkto('/home/about')">图表</li>
      <li :class="cpath == '/home/my' ?'active' : ''" @click="linkto('/home/my')">个人中心</li>
    </ul>
  </el-aside>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    data() {
      return {}
    },
    created() {
      console.log(this.$store);
    },
    computed: mapState({
      cpath: state => state.curRouter,
    }),
    methods: {
      linkto: function (msg) {
        this.$router.push(msg);
        this.$store.commit("URL_CHANGE", msg);
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" type="text/scss">
  .menu{
    display: flex;
    align-items: center;
    flex-direction: column;
    li{
      width: 100%;
      height: 30px;
      text-align: center;
    }
  }
  .active {
      color: red;
  }
</style>
