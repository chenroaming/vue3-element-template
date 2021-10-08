// 将*.vue后缀的文件交给defineComponent模块来处理
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module '*.scss'
declare module '*.ts'
declare module '*.js'
declare module 'mockjs'
declare module 'js-cookie'
