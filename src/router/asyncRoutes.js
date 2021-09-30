// 这里实际上也可以使用webpack自动导入文件的功能来做
// 但是这需要事先对文件进行排序化命名，避免一级菜单不符合预定的排序
import home from './modules/home'
import menu1 from './modules/menu1'
import menu2 from './modules/menu2'
import menu3 from './modules/menu3'
import menu4 from './modules/menu4'
import menu5 from './modules/menu5'
import menu6 from './modules/menu6'

const asyncRoutes = [
  home,
  menu1,
  menu2,
  menu3,
  menu4,
  menu5,
  menu6,
  // vue-router4.x取消了星标或者通配符，参见：
  // https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/404'),
    meta: {
      title: 'NoFound',
      roles: ['any'],
      hide: true
    }
  }
]

export default asyncRoutes
