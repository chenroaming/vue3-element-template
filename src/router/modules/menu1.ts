// 示例菜单1
import Layout from '@/layout/index.vue'
export default {
  path: '/menu1',
  component: Layout,
  redirect: '/menu1/child1',
  name: 'menu1',
  meta: {
    title: '菜单一',
    icon: 'el-icon-location',
    roles: ['admin', 'editor']
  },
  isCollapse: false,
  children: [
    {
      path: '/menu1/child1',
      component: ():any => import('@/views/menu1/index.vue'),
      meta: {
        title: '菜单一',
        roles: ['admin', 'editor'],
        icon: 'el-icon-menu'
      },
      name: 'menu1_child1'
    }
  ]
}
