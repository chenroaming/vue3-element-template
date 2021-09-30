<template>
  <div v-if="noShow" class="header">
    <el-menu
      :default-active="nowActive"
      @select="handleSelect"
      class="el-menu-demo"
      mode="horizontal"
      :background-color="theme.menuBg"
      :text-color="theme.fontColor"
      :active-text-color="theme.activeColor"
    >
      <el-menu-item
        v-for="item in firstMenu"
        :key="item.name"
        :index="item.path"
        >{{ item.meta.title }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'NavBar',
  setup () {
    const store = useStore()
    // 本地存储取出来为string格式，需用JSON.parse转换一下
    const noShow = JSON.parse(window.localStorage.getItem('vue3-element-template-needTopNav'))
    const $route = useRoute()
    const nowActive = computed(() => {
      const [{ path }] = $route.matched
      return path
    })
    const theme = computed(() => store.getters['app/appTheme'])
    store.dispatch('app/setSecondMenus', [nowActive.value])
    const firstMenu = computed(() => store.getters['app/asyncRouter'])
    const handleSelect = (...arg) => {
      store.dispatch('app/setSecondMenus', arg[1])
    }
    watch($route, ({ matched: [{ path }] }) => {
      handleSelect('', [path])
    })
    return {
      noShow,
      nowActive,
      handleSelect,
      firstMenu,
      theme
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  background: #304156;
}
</style>
