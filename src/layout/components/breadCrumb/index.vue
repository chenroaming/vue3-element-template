<template>
 <el-breadcrumb separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item
        v-for="item in menuList"
        :key="item.path">{{ item.title }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const $router = useRoute()
    const menuList = ref([])
    const getBreadCrumb = (menu) => {
      // const { meta: { title }, path } = menu
      const fullPath = menu.reduce((acc, cur) => {
        return acc.concat([{ title: cur.meta.title, path: cur.path }])
      }, [{ title: '首页', path: '/' }])
      // menuList.value = [{ title: '首页', path: '/' }].concat(
      //   [{ title, path }]
      // )
      menuList.value = fullPath
    }
    getBreadCrumb($router.matched)
    console.log($router.matched)
    watch($router, (cur) => {
      getBreadCrumb(cur.matched)
    })
    return {
      menuList
    }
  }
}
</script>
