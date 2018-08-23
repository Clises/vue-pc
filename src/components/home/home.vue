<template>
  <div class="home">
    <el-container>
      <el-aside width='200px'>
        <ul class="menu">
          <li :class="cpath == '/index' ?'active' : ''" @click="linkto('/index')">index</li>
          <li :class="cpath == '/about' ?'active' : ''" @click="linkto('/about')">about</li>
          <li :class="cpath == '/my' ?'active' : ''" @click="linkto('/home/my')">my</li>

        </ul>
      </el-aside>


      <el-main>
        <div class="page-wrapper">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  // import Menu from '@/components/Menu'
  export default {
    data() {
      return {}
    },
    created() {

    },
    computed: {},
    methods: {},
    components: {
      // Menu
    },
    mounted() {

    }
  }
</script>
<style lang="scss" type="text/scss">
  .home {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
