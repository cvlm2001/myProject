import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        isAute:true
      },
      component: () => import('../views/Home.vue'),

    },
    {
      path: '/details',
      name: 'details',
      meta:{
        isAute:true
      },
      component: () => import('../views/details.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        isAute:true
      },
      component: () => import('../views/login.vue')
    },
    {
      path: '/commodity',
      name: 'commodity',
      meta:{
        isAute:false
      },
      component: () => import('../views/commodity.vue')
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      meta:{
        isAute:false
      },
      component: () => import('../views/shopCart.vue')
    },
    ,
    {
      path: '/order',
      name: 'order',
      meta:{
        isAute:false
      },
      component: () => import('../views/order.vue'),
    children:[{
      path: '',
      component: () => import('../views/orderlist.vue'),

    },{
      path:'address',
      component:()=>import('../views/address.vue')
    }]
    },
    
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.isAute!=true){
    if(localStorage.getItem('login')==null&&to.name!='login'){
      alert('请先登录')
      next({name:'login'})
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
