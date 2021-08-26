<template>
  <div class="aside">
   <div class="logo">Logo</div>
   <el-menu
      uniqueOpened
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF">
      <sideItem
        v-for="item in filterRouter"
        :key="item.meta.title"
        :item="item"></sideItem>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import sideItem from './sideItem'
export default defineComponent({
  name: 'sideBar',
  components: {
    sideItem
  },
  setup () {
    console.log('children Created')
    onMounted(() => {
      console.log('children Mounted')
    })
    const store = useStore()
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const isCollapse = computed(() => store.getters['app/isCollapse'])
    const filterRouter = computed(() => store.getters['app/asyncRouter'])
    return {
      handleOpen,
      handleClose,
      isCollapse,
      filterRouter
    }
  }
})
</script>

<style scoped>
  /* 收缩菜单样式 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
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
