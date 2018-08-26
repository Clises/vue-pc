<template>
  <div class="home">
    <el-container>
      <el-aside width='200px'>
          <Menu></Menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Menu from '@/components/Menu'
  export default {
    data() {
      return {}
    },
    created() {
    },
    computed: {},
    methods: {},
    components: {
      Menu
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
