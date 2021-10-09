interface module {
  [moduleName:string]: string
}
import { createStore } from 'vuex'
// 导入所有的vuex模块
const storeModels = require.context('./modules/', false, /\.ts$/)
const modules = storeModels.keys().reduce((module:module, modulePath:string):any => {
  // 解析文件名
  const moduleName = modulePath.replace(/^.\/(.*)\.ts/, '$1')
  const value = storeModels(modulePath)
  module[moduleName] = value.default
  return module
}, {})

export default createStore({
  ...modules
})
