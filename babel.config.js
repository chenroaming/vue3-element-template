module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          name = name.slice(3)
          // 如果你需要 [name].css 文件，你需要 return 下面这一行
          return `element-plus/es/${name}/style/css`
          // 如果你需要 [name].scss 文件，那么你需要注释上一行代码并取消注释下一行代码
          // return `element-plus/es/${name}/style`;
        }
      }
    ]
  ]
}
