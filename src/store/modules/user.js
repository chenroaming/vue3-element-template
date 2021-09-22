import { set, remove } from 'js-cookie'
const user = {
  namespaced: true,
  state: () => ({
    isLogin: false,
    token: ''
  }),
  mutations: {
    setLogin (state, status) {
      state.isLogin = status
    },
    setToken (state, token) {
      state.token = token
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
    logout ({ commit }) {
      // 设置登录状态为false
      commit('setLogin', false)
      // 清空token
      commit('setToken', '')
      remove('vue3-element-template-token')
      location.reload()
    }
  },
  getters: {
    isLogin: state => state.isLogin
  }
}

export default user
