// 示例菜单2
import Layout from '@/layout/index.vue'
export default {
  path: '/menu5',
  component: Layout,
  name: 'menu5',
  meta: {
    title: '菜单五',
    icon: 'el-icon-s-ticket',
    roles: ['admin']
  },
  redirect: '/menu5/index',
  isCollapse: true,
  children: [
    {
      path: '/menu5/index',
      component: ():any => import('@/views/menu5/index.vue'),
      meta: {
        title: '菜单五子菜单1',
        roles: ['admin'],
        icon: 'el-icon-menu'
      },
      name: 'menu5_child1'
    },
    {
      path: '/menu5/child1',
      component: ():any => import('@/views/menu5/child1.vue'),
      meta: {
        title: '菜单五子菜单2',
        roles: ['admin'],
        icon: 'el-icon-menu'
      },
      name: 'menu5_child2'
    },
    {
      path: '/menu5/child3',
      component: ():any => import('@/views/menu5/child2.vue'),
      meta: {
        title: '菜单五子菜单3',
        roles: ['admin'],
        icon: 'el-icon-menu'
      },
      name: 'menu5_child3'
    }
  ]
}
