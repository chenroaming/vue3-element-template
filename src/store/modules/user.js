import { set, remove } from 'js-cookie'
import { user } from '@/api'
import asyncRoutes from '@/router/asyncRoutes'
const hasPermission = (route, roles) => {
  // 判断单个路由中的角色是否包含在角色列表中，或者为any即所有角色均可访问
  return route.meta.roles.some(el => roles.includes(el)) || route.meta.roles.includes('any')
}
const filterRoutes = (routes, roles) => {
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
  state: () => ({
    isLogin: false,
    token: '',
    roles: []
  }),
  mutations: {
    setLogin (state, status) {
      state.isLogin = status
    },
    setToken (state, token) {
      state.token = token
    },
    setRoles (state, roles) {
      state.roles = roles
    }
  },
  actions: {
    setLogin ({ commit }, token) {
      // 设置登录状态和token
      commit('setLogin', true)
      commit('setToken', token)
      // 设置登录token的cookie，有效期可自定义
      set('vue3-element-template-token', token, { expires: 3 })
    },
    setRoles ({ commit }, roles) {
      commit('setRoles', roles)
    },
    logout ({ commit }) {
      // 设置登录状态为false
      commit('setLogin', false)
      // 清空token
      commit('setToken', '')
      remove('vue3-element-template-token')
      location.reload()
    },
    getRoles ({ commit }) {
      return new Promise((resolve, reject) => {
        user.getRoles().then(res => {
          commit('setRoles', res.data)
          const asyncRoute = filterRoutes(asyncRoutes, res.data)
          resolve(asyncRoute)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    roles: state => state.roles
  }
}

export default users
