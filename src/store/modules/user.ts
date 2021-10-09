import { set, remove } from 'js-cookie'
import { user } from '@/api/index.ts'
import asyncRoutes from '@/router/asyncRoutes.ts'
const hasPermission = (route:any, roles:Array<string>) => {
  // 判断单个路由中的角色是否包含在角色列表中，或者为any即所有角色均可访问
  return route.meta.roles.some((el:string) => roles.includes(el)) || route.meta.roles.includes('any')
}
const filterRoutes = (routes:Array<any>, roles:Array<string>) => {
  // 递归过滤出具备权限的菜单
  const asyncRoutes = routes.filter(el => {
    if (el.children && el.children.length > 0) {
      el.children = filterRoutes(el.children, roles)
    }
    return hasPermission(el, roles)
  })
  return asyncRoutes
}
const users = {
  namespaced: true,
  state: ():any => ({
    isLogin: false,
    token: '',
    roles: []
  }),
  mutations: {
    setLogin (state:any, status:boolean):void {
      state.isLogin = status
    },
    setToken (state:any, token:string):void {
      state.token = token
    },
    setRoles (state:any, roles:Array<string>):void {
      state.roles = roles
    }
  },
  actions: {
    setLogin ({ commit }:any, token:string):void {
      // 设置登录状态和token
      commit('setLogin', true)
      commit('setToken', token)
      // 设置登录token的cookie，有效期可自定义
      set('vue3-element-template-token', token, { expires: 3 })
    },
    setRoles ({ commit }:any, roles:Array<string>):void {
      commit('setRoles', roles)
    },
    logout ({ commit }:any):void {
      // 设置登录状态为false
      commit('setLogin', false)
      // 清空token
      commit('setToken', '')
      remove('vue3-element-template-token')
      location.reload()
    },
    getRoles ({ commit }:any):any {
      return new Promise((resolve, reject) => {
        user.getRoles().then((res:any) => {
          commit('setRoles', res.data)
          const asyncRoute = filterRoutes(asyncRoutes, res.data)
          resolve(asyncRoute)
        }).catch((err:any) => {
          reject(err)
        })
      })
    }
  },
  getters: {
    isLogin: (state:any) => state.isLogin,
    roles: (state:any) => state.roles
  }
}

export default users
