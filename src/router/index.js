import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { API_CHECK_TOKEN } from '@/api/apis'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/Index'),
      children: [{
        path: '/index/home',
        name: 'home',
        meta: {}, //???怎么写权限
        component: () => import('../pages/index/Home'),
      }, {
        path: '/index/order',
        name: 'order',
        component: () => import('../pages/index/Order'),
      }, {
        path: '/index/shops',
        name: 'shops',
        component: () => import('../pages/index/Shops'),
      },
      // ---------------------  账号管理 -------------------------------//
      {
        path: '/index/addaccount',  //添加账号
        name: 'addaccount',
        component: () => import('../pages/index/account/AddAccount'),
      },
      {
        path: '/index/changepwd',  //修改密码
        name: 'changepwd',
        component: () => import('../pages/index/account/ChangePwd'),
      },
      {
        path: '/index/accountlist',  //账号列表
        name: 'accountlist',
        component: () => import('../pages/index/account/AccountList'),
      },
      {
        path: '/index/personal',  //个人中心
        name: 'personal',
        component: () => import('../pages/index/Personal'),
      }
    
    ]
    }
  ]
})

//添加路由前置守卫
router.beforeEach((to, from , next) => {

  // to： 即将进入的route对象
  // from: 现在的route对象（就没有切换之前的）
  if(to.path != '/'){
    // 只要不是登录的页面，想进入其他页面都需要判断一次是否登录!
    API_CHECK_TOKEN(localStorage.token).then(res => {
     
      if(res.data.code == 0){
        //还在登录状态
        next()//放行，执行下一步

        // 功能2： 权限拦截，不能通过hash值访问到非自己权限的页面！
        // to.meta  localStorage.role//拿到当前路由对象的参数
        

      }else{
        //拦截，进行跳转到登录页面
        next('/') //next函数，如果传参，就表示跳转到指定hash地址
      }
    })
  }else next()

  
})

export default router