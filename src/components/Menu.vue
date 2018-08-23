<template>
  <el-aside width='200px'>
    <ul class="menu">
      <li :class="cpath == '/index' ?'active' : ''" @click="linkto('/index')">index</li>
      <li :class="cpath == '/about' ?'active' : ''" @click="linkto('/about')">about</li>
      <li :class="cpath == '/my' ?'active' : ''" @click="linkto('/home/my')">my</li>

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
  .active {

      color: red;
  }
</style>
