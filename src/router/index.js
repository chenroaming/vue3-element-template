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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
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

const routes = constantRoutes.concat(asyncRoutes)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
