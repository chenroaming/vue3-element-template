import { set, remove } from 'js-cookie'
import { user } from '@/api'
import { asyncRoutes } from '@/router'
const filterRoutes = (routes, roles) => {
  routes.filter(el => el.meta.roles)
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
          resolve()
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
