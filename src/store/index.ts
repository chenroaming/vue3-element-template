import { createStore } from 'vuex'
// 导入所有的vuex模块
const storeModels = require.context('./modules/', false, /\.js$/)
const modules = storeModels.keys().reduce((module, modulePath) => {
  // 解析文件名
  const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
  const value = storeModels(modulePath)
  module[moduleName] = value.default
  return module
}, {})

export default createStore({
  modules: {
    ...modules
  }
})
