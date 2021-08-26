// 示例菜单1
import Layout from '@/layout'
export default {
  path: '/menu1',
  component: Layout,
  name: 'menu1',
  meta: {
    title: '菜单一',
    icon: 'el-icon-location',
    roles: ['admin']
  },
  redirect: '/menu1/index',
  isCollapse: false,
  children: [
    {
      path: 'index',
      component: () => import('@/views/menu1'),
      meta: {
        title: '菜单一子菜单1',
        roles: ['admin']
      },
      name: 'child1'
    }
  ]
}
