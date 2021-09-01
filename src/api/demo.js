/**
 * 示例接口
 */

import { generate } from '@/utils/request'
const config = {
  items: [
    // 加载广告位列表
    {
      key: 'getList',
      url: '/getList',
      method: 'post',
      showTips: true
    }
  ]
}

export default {
  ...generate(config)
}
