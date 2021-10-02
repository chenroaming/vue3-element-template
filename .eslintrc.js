module.exports = {
  extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended'
  ],
  plugins: [
      'vue',
      '@typescript-eslint'
  ],
  rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      // 允许非空断言
      '@typescript-eslint/no-non-null-assertion': 'off',
      // 允许自定义模块和命名空间
      '@typescript-eslint/no-namespace': 'off',
      // 允许对this设置alias
      '@typescript-eslint/no-this-alias': 'off',
      // 允许使用any类型
      '@typescript-eslint/no-explicit-any': ['off'],
  }
}