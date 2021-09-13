/**
 * 示例接口
 */

import { generate } from '@/libs/axios'
const config = {
  items: [
    // 加载列表数据
    {
      key: 'getList',
      url: '/f10/lsjz',
      method: 'get',
      showTips: true
    },
    {
      key: 'login',
      url: '/vue3-element-template/user/login',
      method: 'post',
      showTips: true
    }
  ]
}

export default {
  ...generate(config)
}
