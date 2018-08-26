import {get, post} from '../utils/fetch'


// ************************* 账号相关 ************************/
export const login = (params) => post('/account/login', params, {
  requireToken: false
});
export const logout = (params) => post('/account/logout', params, {
  requireToken: false
});
export const updateProfile = (params) => get('/account/modify/username', params)
export const modifyPwd = (params) => post('/account/pwd/update', params)
export const sendEmail = (params) => post('/account/pwd/email', params)
export const resetPassword = (params) => post('/account/pwd/reset', params)
export const register = (params) => post('/account/register', params)
export const getInfor = (params) => get('/account/profile ',params)

// ************************* 订单 ************************/
export const getOrderList = (params) => get('/order/list', params)
export const postInvoice = (params) => post('/bill/draw',params)
export const getInvoiceDetail = (params) => get('bill',params)
export const postRefund = (params) => post('/order/refund',params)
export const saleList= (params) =>  get('operator/list',params)
export const salemodifyRemark = (params) =>  post('operator/update',params)
// ************************* 用户数据 ************************/
export const getUserList = (params) => get('/user/user/list', params)
export const getUserInfo = (params) => get('/user/base/info', params)
export const getUserBusinessData = (params) => get('/user/business/data', params)
export const getUserStatus = (params) => get('/user/current/status', params)
export const getUserPayData = (params) => get('/user/pay/data', params)
export const getUserActivityList = (params) => get('/activity/list', params)
export const modifyRemark = (params) => get('/user/modify/remark', params)
export const getMemberList = (params) => get('/user/member/list',params);
export const postRole = (params) => post('/user/modify/role',params)
export const postmendel = (params) => post('user/member/del',params)


// ************************* 活动相关 ************************/
export const getActivityList = (params) => get('/papp/label/activity/list', params)
export const getActivityPics = (params) => get('/papp/label/pic/list', params)
export const postScore = (params) => post('/papp/label/pic/label', params)
export const getPic = (params) => get('/papp/pic/label',params)
export const postModify = (params) => post('/papp/pic/label/modify',params)
export const getNewActive = (params) => get('/papp/label/list',params)
export const getAllActive = (params) => get('activity/all/list',params)
export const getFindMeList = (params) => get('/papp/find/me/activity/list',params)
export const getFindMePic = (params) => get('/papp/find/me/user/pics',params)
export const getFindMeUser = (params) => get('/papp/find/me/users',params)


export const activityPeopleConfig = (params) => get('/activity/player/list', params)
export const activityPlusNoConfig = (params) => get('/activity/plus/player/list', params)
export const activityAddRetoucher = (params) => get('/activity/add/retoucher', params)
export const activityRemoveRetoucher = (params) => get('/activity/free/retoucher', params)
export const activitySearchPerson = (params) => get('/activity/player/all/list', params)
export const activitySearchPlusPerson = (params) => get('/activity/player/plus/list', params)

//*********************** 经销商相关 *****************************/
export const getDistributorList = (params) => get('/dealer/list',params)
export const getDistributorDetail = (params) => get('/dealer/detail',params)
export const getDistributorHistry = (params) => get('/dealer/record',params)
export const getDistributorReple = (params) => post('/dealer/fill',params)
export const distributorAdd = (params) => post('/dealer/add',params)
export const getActivation = (params) => get('/dealer/activation',params)
export const getAccess = (params) => get('/dealer/access',params)

//*********************** 优惠券相关 *****************************/
export const getCouponList  = (params) => get('/coupon/list',params)
export const addCoupon = (params) => post('/coupon/add',params)
export const getFundBaseinfo = (params) => get('/coupon/fund/baseinfo',params)
export const getfundEarn = (params) => get('/coupon/fund/earn/record',params)
export const getFundUse = (params) => get('/coupon/fund/use/record',params)

//*********************** 数据管理 *****************************/
export const getdatadetail  = (params) => get('/data/survey',params)
export const getdatasale  = (params) => get('/data/sale',params)
export const getdatatime  = (params) => get('/data/operator/times',params)
export const getdatatrend  = (params) => get('/data/account/trend',params)
export const getactivetrend  = (params) => get('/data/activity/trend',params)
export const getatrend  = (params) => get('/data/active/trend',params)
export const postexport = (params) => get('/data/export/sale',params)
export const getexport = (params) => get('/data/account/export',params)
