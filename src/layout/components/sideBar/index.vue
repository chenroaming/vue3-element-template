<template>
  <div class="aside">
    <div class="logo">Logo</div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="nowActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF">
        <sideItem
          v-for="item in filterRouter"
          :key="item.meta.title"
          :item="item"></sideItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import sideItem from './sideItem'
// import { last } from 'lodash'
export default defineComponent({
  name: 'sideBar',
  components: {
    sideItem
  },
  setup () {
    const store = useStore()
    // const { matched, path } = useRoute()
    const { path } = useRoute()
    const isCollapse = computed(() => store.getters['app/isCollapse'])
    const filterRouter = computed(() => store.getters['app/secondMenus'])
    const nowActive = ref('')
    // const setNowActive = () => {
    //   const [head] = matched
    //   if (head.children.length < 2 && matched.length < 3) {
    //     nowActive.value = head.path
    //     return
    //   }
    //   nowActive.value = last(matched).path
    // }
    const setSecondMenusActive = () => {
      nowActive.value = path
    }
    // setNowActive()
    setSecondMenusActive()
    return {
      isCollapse,
      filterRouter,
      nowActive
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
    background: #304156;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #304156;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
</style>
