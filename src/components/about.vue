<template>
  <div class="page-wrapper">
    <div class="char_form">
      <div class="char_nav">
        <span :class=" searchform.searchType == 0 ? 'active' : ''" @click="searchform.searchType = 0">新增付费金额趋势</span>
        <span :class=" searchform.searchType == 1 ? 'active' : ''" @click="searchform.searchType = 1">累计付费金额趋势</span>
      </div>
      <div class="char_time">
        <el-date-picker
          v-model="value7"
          type="daterange"
          size="small"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="getdata" size="mini">搜索</el-button>
      </div>
    </div>
    <div class="char_bar" id="salebar"></div>

  </div>
</template>
<script>
  import {getdatasale, postexport} from 'api/api';

  export default {
    data() {
      return {
        searchform: {
          searchType: 0,
          orderType: '201,221,202,222,211,212,301,302,304,305,303,',
          startTime: '',
          endTime: '',
        },
        //图表快捷选项
        pickerOptions2: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //对时间空间的默认显示
        value7: '',
        execlhref: '',
        trshowobj: {
          'usb2.0套装': true,
          'usb3.0套装': true,
          '全部': true,
          '包年去广告': true,
          '包年无广告': true,
          '包年有广告': true,
          '单次去广告': true,
          '单次无广告': true,
          '单次有广告': true,
          '支架包': true
        },
      }
    },
    created() {
      const end = new Date();
      const start = new Date();
      end.setTime(end.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      const t = [];
      t.push(start.toLocaleDateString().replace(/\//g, '-'));
      t.push(end.toLocaleDateString().replace(/\//g, '-'));
      this.value7 = t;
      this.getdata();

    },
    computed: {},


    methods: {
      createbar: function (msg) {
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('salebar'));
        var tableData = this.tableData;
        var that = this
        myChart.setOption({
          color: ['#B23AEE', '#fd912a', '#800000', '#FFD700', '#50abf2', '#d6395b', '#B3EE3A', '#008B8B', '#e53d00', '#537e75'],

          title: {
            show: false,
            text: '累计销售数据',
            textStyle: {
              fontSize: 14,
              color: '#333'
            },
            padding: [
              15,  // 上
              20, // 右
              5,  // 下
              30, // 左
            ]
          },
          //提示框组件
          tooltip: {
            // trigger:'axis',
            formatter: function (data) {
              console.log(data);
              var sin = data.seriesIndex;
              var din = data.dataIndex;
              // console.log(msg.tips[sin].time)
              var html = '';
              html = data.seriesName + '</br>' + '次数:' + msg.tips[din].time[sin] + '</br>' + '金额:' + data.value + '<br>' + data.name;

              return html;
            }
          },
          dataZoom: [{
            type: 'inside'
          }],
          legend: {
            show: true,
            top: 20,
            width: '70%'
            // formatter:function(msg){
            //       console.log(msg)
            // }
          },
          grid: {
            left: '5%',
            right: '5%',
            top: 100,
          },
          xAxis: {
            data: msg.time,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d5d5d5'
              },
            },
            axisLabel: {
              color: '#999'
            },
            axisTick: {
              show: false
            }

          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee',
                // type:'dashed'
              }
            }
          },
          series: [{
            name: '全部',
            type: 'line',
            smooth: true,
            data: msg.len,
          },
            {
              name: '单次有广告',
              type: 'line',
              smooth: true,
              data: msg['201'],

            },
            {
              name: '单次无广告',
              type: 'line',
              smooth: true,
              data: msg['221'],
            },
            {
              name: '包年有广告',
              type: 'line',
              smooth: true,
              data: msg['202'],
            },
            {
              name: '包年无广告',
              type: 'line',
              smooth: true,
              data: msg['222'],
            },
            {
              name: '单次去广告',
              type: 'line',
              smooth: true,
              data: msg['211'],
            },
            {
              name: '包年去广告',
              type: 'line',
              smooth: true,
              data: msg['212'],
            },
            {
              name: 'usb2.0套装',
              type: 'line',
              smooth: true,
              data: msg['304'],
            },
            {
              name: 'usb3.0套装',
              type: 'line',
              smooth: true,
              data: msg['305'],
            },
            {
              name: '支架包',
              type: 'line',
              smooth: true,
              data: msg['303'],
            }]
        });
        myChart.on('legendselectchanged', function (obj) {
          var selected = obj.selected;
          var legend = obj.name;
          that.trshowobj[legend] ? that.trshowobj[legend] = false : that.trshowobj[legend] = true;
        });

      },
      //表格导出
      dataexport: function () {
        var host = location.origin;
        var type = [];
        this.execlhref = host + '/data/export/sale?searchType=' + this.searchform.searchType + '&orderType=' + this.searchform.orderType + '&startTime=' + this.searchform.startTime + '&endTime=' + this.searchform.endTime;
        console.log(this.execlhref);
      },
      getdata: function () {
        this.searchform.startTime = this.value7[0] + ' 00:00:00';
        this.searchform.endTime = this.value7[1] + ' 23:59:59';
        getdatasale(this.searchform).then((res) => {
          this.tableData = res.result;
          var chardata = {
            time: [],
            len: [],
            '201': [],
            '221': [],
            '202': [],
            '221': [],
            '222': [],
            '211': [],
            '212': [],
            '301': [],
            '302': [],
            '303': [],
            '304': [],
            '305': [],
            tips: []
          }
          res.result.forEach(element => {
            chardata.time.push(element.date.substr(0, 10));
            var tc = {
              time: []
            }
            var total = element.totalMoney;
            tc.time.push(element.totalTime);
            var a201 = 0,
              a202 = 0,
              a221 = 0,
              a222 = 0,
              a211 = 0,
              a212 = 0,
              a301 = 0,
              a302 = 0,
              a303 = 0,
              a304 = 0,
              a305 = 0;
            var zj = 0;
            var zm = 0;

            for (var i = 0; i < element.sale.length; i++) {

              switch (parseInt(element.sale[i].orderType)) {
                case 201:
                  a201 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 202:
                  a202 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 221:
                  a221 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 222:
                  a222 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 211:
                  a211 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 212:
                  a212 = element.sale[i].money;
                  tc.time.push(element.sale[i].time);
                  break;
                case 301:
                  a301 = element.sale[i].money;
                  zj = element.sale[i].time;
                  break;
                case 302:
                  a302 = element.sale[i].money;
                  zm = parseInt(element.sale[i].time);
                  break;
                case 303:
                  a303 = element.sale[i].money;
                  tc.time.push(parseInt(element.sale[i].time));
                  break;
                case 304:
                  a304 = a301 + element.sale[i].money;
                  tc.time.push(zj + parseInt(element.sale[i].time));
                  break;
                case 305:
                  a305 = a303 + element.sale[i].money;
                  tc.time.push(zm + parseInt(element.sale[i].time));
                default:
                  break;
              }
            }
            chardata.len.push(total);
            chardata['201'].push(a201);
            chardata['202'].push(a202);
            chardata['221'].push(a221);
            chardata['222'].push(a222);
            chardata['211'].push(a211);
            chardata['212'].push(a212);
            chardata['301'].push(a301);
            chardata['302'].push(a302);
            chardata['303'].push(a303);
            chardata['304'].push(a304);
            chardata['305'].push(a305);
            chardata.tips.push(tc);
          });
          this.createbar(chardata);
        })
      }
    },
    components: {},
    mounted() {

    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .char {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .char_form {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .char_nav span {
    padding: 5px 10px;
    border: 1px solid #e53d00;
    color: #e53d00;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
  }

  .char_nav span.active {
    background-color: #e53d00;
    color: #fff;
    border: 1px solid #e53d00;
  }

  .char_bar {
    height: 400px;
    background-color: #fff;
  }

  .char_table {
    margin-top: 20px;
  }

  .datapexport {
    text-align: right;
    margin-top: 20px;
  }

  .hideexpot {
    width: 0;
    height: 0;
    opacity: 0;
  }
</style>
