import { toRaw } from 'vue'
interface theme {
  menuBg?: string
  fontColor?: string
  activeColor?: string
}
const theme:theme = JSON.parse(window.localStorage.getItem('vue3-element-template-theme'))
const app = {
  namespaced: true,
  state: ():any => ({
    isCollapse: false,
    asyncRouter: [],
    secondMenus: [],
    tabsMenus: [],
    avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    nowActive: '',
    theme: {
      menuBg: theme?.menuBg ?? '#304156',
      fontColor: theme?.fontColor ?? '#fff',
      activeColor: theme?.activeColor ?? '#409EFF'
    }
  }),
  mutations: {
    setCollapse (state:any):void {
      state.isCollapse = !state.isCollapse
    },
    setAsyncRoutes (state:any, routes:Array<any>):void {
      state.asyncRouter = routes
    },
    setSecondMenus (state:any, secMenus:Array<any>):void {
      state.secondMenus = secMenus
    },
    addTabsMenus (state:any, menu:Array<any>):void {
      state.tabsMenus.push(menu)
    },
    subTabsMenus (state:any, path:string):void {
      state.tabsMenus = toRaw(state.tabsMenus).filter((item:any) => item.path !== path)
    },
    setNowActive (state:any, path:string):void {
      state.nowActive = path
    },
    setTheme (state:any, theme:string):void {
      state.theme = theme
    }
  },
  actions: {
    changeCollapse ({ commit }:any):void {
      commit('setCollapse')
    },
    setSecondMenus: ({ state, commit }:any, [path]:Array<string>):void => {
      const secondMenus = toRaw(state.asyncRouter).find((item:any):boolean => {
        return item.path === path
      })
      secondMenus && commit('setSecondMenus', secondMenus.children)
    },
    addTabsMenus ({ state, commit }:any, menu:any):void {
      const hasMenu = state.tabsMenus.some((item:any) => item.path === menu.path)
      if (!hasMenu) {
        commit('addTabsMenus', menu)
      }
    }
  },
  getters: {
    isCollapse: (state:any) => state.isCollapse,
    asyncRouter: (state:any) => state.asyncRouter.filter((item:any) => !item.meta.hide),
    secondMenus: (state:any) => state.secondMenus,
    appTheme: (state:any) => state.theme
  }
}

export default app
