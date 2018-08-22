<template>
  <div class="home">
    <el-container>
      <el-header height="100px">
        Header
      </el-header>
      <el-container>
        <Menu>

        </Menu>
        <el-main>
          main
        </el-main>
      </el-container>
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
