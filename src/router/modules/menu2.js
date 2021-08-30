// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu2',
  component: Layout,
  name: 'menu2',
  redirect: '/menu2/child1',
  meta: {
    title: '菜单二',
    icon: 'el-icon-user',
    roles: ['admin']
  },
  isCollapse: false,
  children: [
    {
      path: '/menu2/child1',
      component: () => import('@/views/menu2'),
      meta: {
        title: '菜单二',
        roles: ['admin']
      },
      name: 'child2-1'
    }
  ]
}
