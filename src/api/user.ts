interface items {
  key: string
  url: string
  method: string
  showTips?: boolean
}
interface config {
  items: Array<items>
}
/**
 * 示例接口
 */
import { generate } from '@/libs/axios/index.ts'
const config:config = {
  items: [
    // 登录接口
    {
      key: 'login',
      url: '/vue3-element-template/user/login',
      method: 'post',
      showTips: true
    },
    // 获取用户角色接口
    {
      key: 'getRoles',
      url: '/vue3-element-template/user/getRoles',
      method: 'get',
      showTips: false
    }
  ]
}

export default {
  ...generate(config)
}
