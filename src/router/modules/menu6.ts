// 示例菜单2
import Layout from '@/layout/index.vue'
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
      component: ():any => import('@/views/menu6/child1/index.vue'),
      meta: {
        title: '菜单六子菜单1',
        roles: ['admin'],
        icon: 'el-icon-menu'
      },
      isCollapse: true,
      name: 'menu6_child1',
      children: [
        {
          path: '/menu6/index/child1',
          component: ():any => import('@/views/menu6/child1/child1.vue'),
          meta: {
            title: '菜单六第三级菜单1',
            roles: ['admin'],
            icon: 'el-icon-menu'
          },
          name: 'menu6_child1_1'
        },
        {
          path: '/menu6/index/child2',
          component: ():any => import('@/views/menu6/child1/child2.vue'),
          meta: {
            title: '菜单六第三级菜单2',
            roles: ['admin'],
            icon: 'menu6_child1_2'
          },
          name: 'child6-1-2'
        },
        {
          path: '/menu6/index/child3',
          component: ():any => import('@/views/menu6/child1/child3.vue'),
          meta: {
            title: '菜单六第三级菜单3',
            roles: ['admin'],
            icon: 'el-icon-menu'
          },
          name: 'menu6_child1_3'
        },
        {
          path: '/menu6/index/child4',
          component: ():any => import('@/views/menu6/child1/child4.vue'),
          meta: {
            title: '菜单六第三级菜单4',
            roles: ['admin'],
            icon: 'el-icon-menu'
          },
          name: 'menu6_child1_4'
        },
        {
          path: '/menu6/index/child5',
          component: ():any => import('@/views/menu6/child1/child5.vue'),
          meta: {
            title: '菜单六第三级菜单5',
            roles: ['admin'],
            icon: 'el-icon-menu'
          },
          name: 'menu6_child1_5'
        }
      ]
    }
  ]
}
