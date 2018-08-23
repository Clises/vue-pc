import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import my from '@/components/home/my'
import About from '@/components/home/about'
import Index from '@/components/home/index'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {path: 'my', component: my},
      ]
    },
    // {path: '*', redirect: 'home/my'}, /*默认跳转路由*/

    // {
    //   path: '/my',
    //   component: My
    // },
    // {
    //   path: '/about',
    //   component: About
    // },
    //
    {
      path: '/index',
      component: Index
    }
  ]

})

