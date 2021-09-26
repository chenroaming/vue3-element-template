// 首页
import Layout from '@/layout'
export default {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  meta: { title: '首页', roles: ['admin', 'editor'] },
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard1',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', roles: ['admin', 'editor'], icon: 'el-icon-menu' }
    }
  ]
}
