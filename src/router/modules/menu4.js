// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu4',
  component: Layout,
  name: 'menu4',
  meta: {
    title: '菜单四',
    icon: 'el-icon-picture-outline-round',
    roles: ['admin']
  },
  redirect: '/menu4/index',
  isCollapse: false,
  children: [
    {
      path: 'index',
      component: () => import('@/views/menu4'),
      meta: {
        title: '菜单四子菜单1',
        roles: ['admin']
      },
      name: 'child4-1'
    }
  ]
}
