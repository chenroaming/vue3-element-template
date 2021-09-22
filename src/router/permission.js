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
    if (path === 'login') {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // 停止加载显示进度条
  NProgress.done()
})
