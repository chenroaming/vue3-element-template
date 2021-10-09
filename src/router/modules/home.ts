// 首页
import Layout from '@/layout/index.vue'
export default {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  meta: { title: '首页', roles: ['admin', 'editor'] },
  children: [
    {
      path: '/dashboard',
      name: 'Home',
      component: ():any => import('@/views/dashboard/index.vue'),
      meta: { title: '主页面', roles: ['admin', 'editor'], icon: 'el-icon-menu' }
    }
  ]
}
