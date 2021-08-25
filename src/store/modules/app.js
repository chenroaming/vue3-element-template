const app = {
  namespaced: true,
  state: () => ({
    isCollapse: false
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
    }
  }
}

export default app
