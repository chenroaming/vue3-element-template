import { asyncRoutes } from '@/router'
import { toRaw } from 'vue'
const app = {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    asyncRouter: asyncRoutes,
    secondMenus: []
  }),
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setSecondMenus (state, secMenus) {
      state.secondMenus = secMenus
    }
  },
  actions: {
    changeCollapse ({ commit }) {
      commit('setCollapse')
    },
    setSecondMenus: ({ state, commit }, [path]) => {
      const { children } = toRaw(state.asyncRouter).find(item => {
        return item.path === path
      })
      commit('setSecondMenus', children)
    }
  },
  getters: {
    isCollapse: state => {
      return state.isCollapse
    },
    asyncRouter: state => {
      return state.asyncRouter.filter(item => !item.hide)
    },
    secondMenus: state => {
      return state.secondMenus
    }
  }
}

export default app
