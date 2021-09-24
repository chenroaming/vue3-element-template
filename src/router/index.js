import { createRouter, createWebHashHistory } from 'vue-router'
import home from './modules/home'
import menu1 from './modules/menu1'
import menu2 from './modules/menu2'
import menu3 from './modules/menu3'
import menu4 from './modules/menu4'
import menu5 from './modules/menu5'
import menu6 from './modules/menu6'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/404'),
    meta: {
      title: 'NoFound',
      roles: ['any']
    },
    hide: true
  }
]

export const asyncRoutes = [
  home,
  menu1,
  menu2,
  menu3,
  menu4,
  menu5,
  menu6,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/404'),
    meta: {
      title: 'NoFound',
      roles: ['any']
    },
    hide: true
  }
]
const routes = constantRoutes
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
