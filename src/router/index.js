import { createRouter, createWebHashHistory } from 'vue-router'

// 默认的固定路由，这里暂时就包括登录页和not Found页
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

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
