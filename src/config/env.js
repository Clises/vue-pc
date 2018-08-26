/**
 * 配置编译环境和线上环境之间的切换
 *
 * routerMode: 路由模式
 *
 */
import {dev} from '../../config/index'

let payUrl = 'http://114.215.82.218:8103'//测试环境

let routerMode = '' // router 模式

if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
  payUrl = 'http://test.saas.1sight.cn'
  //routerMode = 'history';
}

export {
  payUrl,
  routerMode
}
