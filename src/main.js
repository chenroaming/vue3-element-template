import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入element组件库
import installElementPlus from './libs/element'
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
