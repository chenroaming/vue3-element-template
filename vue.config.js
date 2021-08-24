'use strict'
const path = require('path')
const port = process.env.port || process.env.npm_config_port || 80 // dev port
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'vue3 ElementPlus Template'
module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  // 在开发模式下开启保存时eslint格式化
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境下不展示源码
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
