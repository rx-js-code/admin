import axios from 'axios'
// 设置服务器IP地址
axios.defaults.baseURL = 'http://localhost:5000'


//API： 登录
//  account: 用户名
//  password: 密码
export const API_LOGIN = (account, password) => axios.post("/users/checkLogin", { account, password })

//API: 添加账号
//  account: 用户名
//  password: 密码
//  userGroup: 用户组  超级管理员|普通管理员
export const API_ADD_ACCOUNT = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })

//API: 验证token
//  token： 用户登录保存的token
export const API_CHECK_TOKEN = (token) => axios.get("/users/checktoken", { params: { token } })

//API: 获取用户列表
//  currentPage: 当前页数
//  pageSize: 显示多少条数据
export const API_USERS_LIST = (currentPage, pageSize) => axios.get("/users/list", { params: { currentPage, pageSize } })

//API: 删除用户
//  id: 要删除用户的id
export const API_DELETE_USER = (id) => axios.get("/users/del", { params: { id } })

//API: 批量删除
//  ids: 要删除用户的字符串数组  '[1,2,3,4]'
export const API_BATCH_DELETE_USER = (ids) => axios.get("/users/batchdel", { params: { ids } })


//获取用户信息
export const API_GET_PERSONAL = (id) => axios.get("/users/accountinfo", { params: { id } })

//获取首页表格数据
export const API_GET_ORDER_TOTAL = () => axios.get("/order/totaldata")



// export 变量（暴露N个）
// -->
// import { 名字 } from 'xxx'

// export default 变量（1个东西）
// -->
// import 形参 from 'xxx'