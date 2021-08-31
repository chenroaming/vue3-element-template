import { asyncRoutes } from '@/router'
import { toRaw } from 'vue'
const app = {
  namespaced: true,
  state: () => ({
    isCollapse: false,
    asyncRouter: asyncRoutes,
    secondMenus: [],
    tabsMenus: []
  }),
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
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
      const { children } = toRaw(state.asyncRouter).find(item => {
        return item.path === path
      })
      commit('setSecondMenus', children)
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
      return state.asyncRouter.filter(item => !item.hide)
    },
    secondMenus: state => {
      return state.secondMenus
    }
  }
}

export default app
