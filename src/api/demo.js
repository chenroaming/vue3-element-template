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
    }
  ]
}

export default {
  ...generate(config)
}
