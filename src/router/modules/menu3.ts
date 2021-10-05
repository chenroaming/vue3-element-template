// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu3',
  component: Layout,
  name: 'menu3',
  redirect: '/menu3/child1',
  meta: {
    title: '菜单三',
    icon: 'el-icon-phone',
    roles: ['admin', 'editor']
  },
  isCollapse: true,
  children: [
    {
      path: '/menu3/child1',
      component: () => import('@/views/menu3'),
      meta: {
        title: '菜单三子菜单1',
        roles: ['admin', 'editor'],
        icon: 'el-icon-menu'
      },
      name: 'menu3_child1'
    },
    {
      path: '/menu3/child2',
      component: () => import('@/views/menu3/child'),
      meta: {
        title: '菜单三子菜单2',
        roles: ['admin', 'editor'],
        icon: 'el-icon-menu'
      },
      name: 'menu3_child2'
    }
  ]
}
