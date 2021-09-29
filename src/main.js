import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission' // 引入路由控制
import '@/style/index.scss' // 引入公共样式
import store from './store'
// 按需引入element组件库
import installElementPlus from './libs/element'
import 'element-plus/dist/index.css'
import { mockXHR } from './mock'
// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'element-plus/packages/theme-chalk/src/base.scss'
// mockjs模拟接口数据引入
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

// 创建vue3应用实例
const app = createApp(App)

// 引入vuex
app.use(store)

// 引入vue-router
app.use(router)

// 按需加载element组件
installElementPlus(app)

// 挂载vue实例
app.mount('#app')
