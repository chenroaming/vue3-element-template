// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu2',
  component: Layout,
  name: 'menu2',
  redirect: '/menu2/index',
  meta: {
    title: '菜单二',
    icon: 'el-icon-user',
    roles: ['admin']
  },
  isCollapse: false,
  children: [
    {
      path: 'index',
      component: () => import('@/views/menu2'),
      meta: {
        title: '菜单二子菜单2',
        roles: ['admin']
      },
      name: 'child2'
    }
  ]
}
