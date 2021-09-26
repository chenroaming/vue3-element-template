import { toRaw } from 'vue'

const app = {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    asyncRouter: [],
    secondMenus: [],
    tabsMenus: [],
    avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  }),
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setAsyncRoutes (state, routes) {
      state.asyncRouter = routes
    },
    setSecondMenus (state, secMenus) {
      state.secondMenus = secMenus
    },
    addTabsMenus (state, menu) {
      state.tabsMenus.push(menu)
    },
    subTabsMenus (state, path) {
      state.tabsMenus = toRaw(state.tabsMenus).filter(item => item.path !== path)
    }
  },
  actions: {
    changeCollapse ({ commit }) {
      commit('setCollapse')
    },
    setSecondMenus: ({ state, commit }, [path]) => {
      const secondMenus = toRaw(state.asyncRouter).find(item => {
        return item.path === path
      })
      secondMenus && commit('setSecondMenus', secondMenus.children)
    },
    addTabsMenus ({ state, commit }, menu) {
      const hasMenu = state.tabsMenus.some(item => item.path === menu.path)
      if (!hasMenu) {
        commit('addTabsMenus', menu)
      }
    }
  },
  getters: {
    isCollapse: state => {
      return state.isCollapse
    },
    asyncRouter: state => {
      return state.asyncRouter.filter(item => !item.meta.hide)
    },
    secondMenus: state => {
      return state.secondMenus
    }
  }
}

export default app
