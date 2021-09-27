<template>
 <el-breadcrumb separator="/">
    <transition-group appear name="breadcrumb" mode="out-in">
      <el-breadcrumb-item
        v-for="item in menuList"
        :key="item.path">{{ item.title }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { last } from 'lodash'
export default defineComponent({
  setup () {
    const $router = useRoute()
    const { dispatch } = useStore()
    const menuList = ref([])
    const getBreadCrumb = (menu) => {
      // const { meta: { title }, path } = menu
      const fullPath = menu.reduce((acc, cur) => {
        return acc.concat([{ title: cur.meta.title, path: cur.path }])
      }, [])
      // menuList.value = [{ title: '首页', path: '/' }].concat(
      //   [{ title, path }]
      // )
      menuList.value = fullPath
      dispatch('app/addTabsMenus', last($router.matched))
    }
    getBreadCrumb($router.matched)
    watch($router, (cur) => {
      getBreadCrumb(cur.matched)
    })
    return {
      menuList
    }
  }
})
</script>
