import router from './index'
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
import { get } from 'js-cookie'
import store from '../store'
// 白名单路径
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 开始加载显示进度条
  NProgress.start()
  const hasToken = get('vue3-element-template-token')
  const { path } = to
  const hasRoles = store.getters['user/roles'].length > 0
  if (hasToken) {
    // 有token并且前往的路径为登录页时，直接跳转至主页
    if (hasRoles) {
      // 有token并且已获取动态路由，前往登录页时重定向到主页，否则继续前往目标页面
      path === '/login' ? next('/dashboard') : next()
    } else {
      // 获取用户角色，然后过滤出相应的异步路由表
      const asyncRoutes = await store.dispatch('user/getRoles')
      // 将处理好的异步路由保存至vuex
      store.commit('app/setAsyncRoutes', asyncRoutes)
      asyncRoutes.forEach(item => {
        // vue-router4.x开始不再支持router.addRoutes，需要用addRoute一个个添加路由。
        // 参考：https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1
        router.addRoute(item)
      })
      next({ path, replace: true })
    }
  } else {
    // 无token，但在白名单内，则直接跳转，否则跳转至登录页
    whiteList.includes(path) ? next() : next('/login')
  }
})

router.afterEach(() => {
  // 停止加载显示进度条
  NProgress.done()
})
