'use strict'
const path = require('path')
const port = process.env.port || process.env.npm_config_port || 80 // dev port
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'vue3 ElementPlus Template'
const apiPath = 'http://api.fund.eastmoney.com'
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
    },
    proxy: {
      '/api': {
        target: apiPath,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        _vi: resolve('src/views'),
        _ut: resolve('src/utils')
      }
    }
  },
  chainWebpack: config => {
    // 分类打包配置
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        elementUI: {
          name: 'chunk-element-plus', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
        }
      }
    })
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
