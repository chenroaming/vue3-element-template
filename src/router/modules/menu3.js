// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu3',
  component: Layout,
  name: 'menu3',
  redirect: '/menu3/index',
  meta: {
    title: '菜单三',
    icon: 'el-icon-phone',
    roles: ['admin']
  },
  isCollapse: true,
  children: [
    {
      path: '/menu3/index',
      meta: {
        title: '菜单三子菜单1',
        roles: ['admin']
      },
      name: 'child3-1'
    },
    {
      path: '/menu3/child1',
      meta: {
        title: '菜单三子菜单2',
        roles: ['admin']
      },
      name: 'child3-2'
    }
  ]
}
