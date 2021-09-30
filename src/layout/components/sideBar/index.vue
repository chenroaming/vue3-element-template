<template>
  <div class="aside" :style="{ background: theme.menuBg }">
    <div class="logo" :style="{ background: theme.menuBg }">Logo</div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="nowActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :background-color="theme.menuBg"
        :text-color="theme.fontColor"
        :active-text-color="theme.activeColor">
        <sideItem
          v-for="item in filterRouter"
          :key="item.path"
          :item="item"></sideItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import sideItem from './sideItem'
import { last } from 'lodash'
export default defineComponent({
  name: 'sideBar',
  components: {
    sideItem
  },
  setup () {
    const { getters, commit } = useStore()
    const $route = useRoute()
    // 本地存储取出来为string格式，需用JSON.parse转换一下
    const hasTopNav = JSON.parse(window.localStorage.getItem('vue3-element-template-needTopNav'))
    // 判断是否需要顶部菜单栏从而获取不同的菜单数据源
    const filterRouter = hasTopNav ? computed(() => getters['app/secondMenus']) : getters['app/asyncRouter']
    // const { matched, path } = useRoute()
    const isCollapse = computed(() => getters['app/isCollapse'])
    const nowActive = ref('')
    const theme = computed(() => getters['app/appTheme'])
    // 当顶部菜单栏为一级菜单时执行该函数设置当前菜单高亮
    const hasTopNavSetNowActive = () => {
      nowActive.value = $route.path
      // 将当前高亮的地址同步至store中，使得顶部菜单栏能同步高亮点击的菜单
      commit('app/setNowActive', $route.path)
    }
    // 当只有侧边菜单栏时执行该函数设置当前菜单高亮
    const noTopNavSetNowActive = () => {
      const [head] = $route.matched
      if (head.children.length < 2 && $route.matched.length < 3) {
        nowActive.value = head.path
        return
      }
      nowActive.value = last($route.matched).path
    }
    const setNowActive = () => {
      hasTopNav ? hasTopNavSetNowActive() : noTopNavSetNowActive()
    }
    setNowActive()
    watch($route, async () => {
      await nextTick()
      setNowActive()
    })
    return {
      isCollapse,
      filterRouter,
      nowActive,
      theme
    }
  }
})
</script>

<style scoped>
  /* 收缩菜单样式 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  /* 菜单高度固定便于出现滚动条 */
  .scrollbar-wrapper {
    height: calc(100% - 60px);
  }
</style>

<style scoped lang = "scss">
  .aside {
    height: 100vh;
  }
  .logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
</style>
