import { asyncRoutes } from '@/router'
const app = {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    asyncRouter: asyncRoutes
  }),
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    changeCollapse ({ state, commit, rootState }) {
      commit('setCollapse')
    }
  },
  getters: {
    isCollapse: (state) => {
      return state.isCollapse
    },
    asyncRouter: (state) => {
      return state.asyncRouter.filter(item => !item.hide)
    }
  }
}

export default app
