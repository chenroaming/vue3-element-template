/**
 * 自动导入 api 文件夹下各个模块包 并且生成对应的api映射
 */
// 不需要导入的文件
const noImport = ['index']
// 请求api文件夹下所有文件
const apiModels = require.context('../api/', false, /\.js$/)
const modules = apiModels.keys().reduce((module, modulePath) => {
  // 解析文件名
  const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
  const value = apiModels(modulePath)
  if (!noImport.includes(moduleName)) {
    module[moduleName] = value.default
  }
  return module
}, {})

module.exports = {
  ...modules
}
