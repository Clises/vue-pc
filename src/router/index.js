import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signin from '@/components/Login/Signin'
import Resetpsw from '@/components/Login/Resetpsw'
import home from '@/components/home'
import my from '@/components/my'
import About from '@/components/about'
import Index from '@/components/index'

Vue.use(Router)
// import {routerMode} from '@/config/env' // 路由模式

export default new Router({
  // mode: routerMode,

  routes: [
    {
      path: '/',
      component: Login,
      children: [
        {
          path: '',
          name: 'Login',
          component: Signin
        },
        {
          path: '/login',
          name: 'Login',
          component: Signin
        },
        {
          path: '/reset',
          name: 'Resetpsw',
          component: Resetpsw
        }
      ]
    },
    {
      path: '/home',
      component: home,
      children: [
        {path: 'my', component: my},
        {path: 'about', component: About},
        {path: 'index', component: Index},
      ],

    },
  ]

})

