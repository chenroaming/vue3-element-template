// 示例菜单2
import Layout from '@/layout'
export default {
  path: '/menu6',
  component: Layout,
  name: 'menu6',
  meta: {
    title: '菜单六',
    icon: 'el-icon-s-ticket',
    roles: ['admin']
  },
  isCollapse: true,
  redirect: '/menu6/index',
  children: [
    {
      path: '/menu6/index',
      meta: {
        title: '菜单六子菜单1',
        roles: ['admin']
      },
      isCollapse: true,
      name: 'child6-1',
      children: [
        {
          path: '/menu6/index',
          meta: {
            title: '菜单六第三级菜单1',
            roles: ['admin']
          },
          name: 'child6-1-1'
        },
        {
          path: '/menu6/child2',
          meta: {
            title: '菜单六第三级菜单2',
            roles: ['admin']
          },
          name: 'child6-1-2'
        }
      ]
    }
  ]
}
