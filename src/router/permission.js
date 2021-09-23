import router from './index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { get } from 'js-cookie'
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 白名单路径
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // console.log('ROUTER.BEFORE_EACH>>>>>>>>>>', to, from, next)
  // 开始加载显示进度条
  NProgress.start()
  const hasToken = get('vue3-element-template-token')
  const { path } = to
  if (hasToken) {
    // 有token并且前往的路径为登录页时，直接跳转至主页
    if (path === '/login') {
      next('/dashboard')
    } else {
    // 有token并且前往的非登录页，则跳转至相应页面
      next()
    }
  } else {
    // 无token，但在白名单内，则直接跳转
    if (whiteList.includes(path)) {
      next()
    } else {
    // 无token，不在白名单内，跳转至登录页
      next('/login')
    }
  }
})

router.afterEach(() => {
  // 停止加载显示进度条
  NProgress.done()
})
