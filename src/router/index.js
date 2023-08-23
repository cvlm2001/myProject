import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/details.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: () => import('../views/commodity.vue')
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: () => import('../views/shopCart.vue')
    }
  ]
})

export default router
