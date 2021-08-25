import router from './index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单路径
// const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // console.log('ROUTER.BEFORE_EACH>>>>>>>>>>', to, from, next)
  // 开始加载显示进度条
  NProgress.start()
  next()
})

router.afterEach(() => {
  // 停止加载显示进度条
  NProgress.done()
})
