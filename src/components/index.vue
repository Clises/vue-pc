<template>
  <div class="page-wrapper">
    <el-form :inline="true">
      <el-form-item label="">
        <el-tabs v-model="searchForm.payStatus" @tab-click="payStatusChange">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="已支付" name="1"></el-tab-pane>
          <el-tab-pane label="未支付" name="2"></el-tab-pane>
          <el-tab-pane label="已退款" name="3"></el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="searchForm.type" @change="handtypechange" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input placeholder="请输入搜索内容" size="small" v-model="searchForm.searchContext"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </el-form-item>

    </el-form>

    <el-table v-show="searchForm.payStatus!=2" :data="tableData" style="width: 100%;" height="1" v-loading="loading"
    >
      <el-table-column prop="createTime" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="accountName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
    </el-table>

    <el-table :data="tableData2" v-show="searchForm.payStatus==2" stripe style="width: 100%" height="1"
              v-loading="loading">
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="createTime" label="订单时间"></el-table-column>
      <el-table-column prop="accountName" label="订单用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="orderContent" label="订单内容"></el-table-column>
      <el-table-column prop="price" label="金额"></el-table-column>
    </el-table>

    <!--
    layout:定义
    page-count：总页数
    current-page：当前页
    handleCurrentChange：改变时触发
    -->
    <div class="ps-pagination">
      <el-pagination v-if="totalPage > 1"
                     layout="prev, pager, next"
                     :page-count="totalPage"
                     :current-page="searchForm.page"
                     @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    getOrderList
  } from 'api/api'

  export default {
    data() {
      return {
        activeName: '0',
        options: [{
          value: 1,
          label: '订单号'
        }, {
          value: 2,
          label: '手机号'
        }, {
          value: 3,
          label: '订单类型'
        }, {
          value: 4,
          label: '销售负责人'
        }
        ],
        totalNum: 1,
        totalPage: 1,
        tableData: [],
        tableData2: [],
        loading: true,
        searchForm: {
          type: 1,
          searchContext: '',
          payStatus: 0, //0 全部,1支付,2未支付
          page: 1,
          size: 20
        },
      }


    },
    created() {
      this.getOrderList();
    },
    computed: {},
    methods: {
      //tab切换
      payStatusChange(tab, event) {
        //当前页面为1
        this.loading = true;
        this.searchForm.page = 1;
        this.getOrderList();

      },
      //翻页切换
      handleCurrentChange(val) {
        this.loading = true;
        this.searchForm.page = val;
        this.getOrderList();
      },
      search() {
        this.searchForm.page = 1;
        this.getOrderList();
      },
      getOrderList() {
        //获取数据
        getOrderList(this.searchForm).then((res) => {
          if (this.searchForm.payStatus == 2) {
            var _da2 = []
            res.result.forEach(element => {
              var odatalsit = {
                orderNo: element.orderNo,
                createTime: element.createTime,
                orderType: element.orderType,
                accountName: element.accountName,
                orderContent: element.orderContent,
                price: element.price,
                phone: element.phone
              };
              _da2.push(odatalsit)
            });
            if (_da2.length >=0) this.loading = false;
            this.tableData2 = _da2;

          } else {
            var data = [];
            res.result.forEach((v, i) => {
              v.editingRemark = false;
              v.remarkBak = v.operator;
              data[i] = v;
            })
            if (data.length >=0) this.loading = false;
            this.tableData = data;
          }
          this.totalNum = res.page.total;
          this.totalPage = res.page.totalPage;
        }).catch((r) => {

        })
      },

      handtypechange(val) {
        console.log(val)
        if (val != 3) {
          this.searchForm.searchContext = "";
        }
      },

    },
    components: {},
    mounted() {

    }
  }
</script>

<style lang="scss" type="text/scss">
</style>
