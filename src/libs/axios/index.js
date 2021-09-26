import axios from 'axios'
import { ElMessage } from 'element-plus'
import { omit } from 'lodash'
import $router from '@/router'
let showTips = false
const CONTENT_TYPES = {
  1: 'application/json',
  2: 'multipart/form-data',
  3: 'application/x-www-form-urlencoded'
}
// // create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: process.env === 'production' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_TEST_API,
  // 超时，注意！axios的超时是中断请求，即canceled，非timeout，具体参见http://www.axios-js.com/zh-cn/docs/#axios-create-config
  timeout: 50000
})
// let config1 = {}
// // request interceptor
service.interceptors.request.use(
  config => {
    showTips = !!config.showTips
    if (config.method === 'post') {
      if (!(config.data instanceof FormData)) { // formData的情况单独处理
        config.data = {
          ...config.data
        }
      }
    }
    if (config.funds) {
      config.headers.Host = 'api.fund.eastmoney.com'
      config.headers.Referer = 'http://fundf10.eastmoney.com/'
    }
    config.headers['x-tenant-id'] = 0
    config.headers['x-app-id'] = 1040
    return config
  },
  error => {
    showTips = false
    // do something with request error
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message || 'Error'))
  }
)

// // response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 20000) {
      showTips && ElMessage({
        message: res.message,
        type: 'success',
        duration: 5 * 1000
      })
      showTips = false
      return res
    } else {
      ElMessage({
        message: `错误信息：${res.message}`,
        type: 'error',
        duration: 5 * 1000
      })
      showTips = false
      return res
      // return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    if (error.response.status === 401) { // 401为token失效，重定向到登录页
      $router.replace({ path: '/login', query: {} })
      return
    }
    showTips = false
    error.message && ElMessage.error(`服务器或者网络出错！错误信息：${error.message}，HTTP错误码：${error.response.status || '暂无'}`)
    return Promise.reject(new Error(error.message || 'Error'))
  }
)

export function ajax (method = 'post', url, options, showTips) {
  options.data = options.data || {}
  const opts = {
    url,
    method,
    headers: {
      'Content-type': CONTENT_TYPES[options.cType || '1']
    },
    showTips
  }
  if (method === 'get') {
    opts.params = options.data
  }
  if (method === 'delete') {
    /**
     * 2020年11月16日 @chenxiaoming
     * delete 请求  兼容rest风格（请求参数拼接在路径上）
     */
    const [params] = Object.values(options.data)
    opts.url = `${opts.url}/${params}`
  }
  if (method === 'post' || method === 'put') {
    opts.data = options.data
  }
  return service(opts)
}

export function generate (config) {
  const map = {}
  const { items } = config
  for (let i = 0, len = items.length; i < len; i++) {
    map[items[i].key] = function (data) {
      return ajax(items[i].method, (items[i].prefix || config.prefix || '') + items[i].url, {
        data,
        ...(omit(items[i], ['key', 'url', 'method', 'prefix', 'params']) || {})
      }, items[i].showTips)
    }
  }
  return map
}

export default {}
