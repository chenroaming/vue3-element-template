import { createRouter, createWebHashHistory } from 'vue-router'

// 默认的固定路由，这里暂时就包括登录页，因为所有前往非法地址的操作都会在导航守卫中拦截回登录页
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
