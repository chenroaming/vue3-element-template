// 示例菜单1
import Layout from '@/layout'
export default {
  path: '/menu1',
  component: Layout,
  redirect: '/menu1/child1',
  name: 'menu1',
  meta: {
    title: '菜单一',
    icon: 'el-icon-location',
    roles: ['admin']
  },
  isCollapse: false,
  children: [
    {
      path: 'child1',
      component: () => import('@/views/menu1'),
      meta: {
        title: '菜单一',
        roles: ['admin']
      },
      name: 'child1-1'
    }
  ]
}
