<template>
  <div class="tabs">
    <el-button type="text" @click="collaspse">{{ status }}</el-button>
    <div class="tabs-container">
      <el-tag
        class="tabs-container-item"
        v-for="item in tabsMenus"
        :key="item.name"
        :effect="isChoise(item.path)"
        @click="handleClick(item.path)"
        @close="handleClose(item.path)"
        :closable="closable"
        size="mini"
        >{{ item.meta.title }}</el-tag
      >
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { last } from 'lodash'
export default {
  setup () {
    const { getters, state, dispatch, commit } = useStore()
    const $route = useRoute()
    const $router = useRouter()
    const collaspse = () => {
      dispatch('app/changeCollapse')
    }
    const tabsMenus = computed(() => {
      return state.app.tabsMenus
    })
    const status = computed(() => {
      return getters['app/isCollapse'] ? '展开' : '收起'
    })
    const closable = computed(() => {
      return state.app.tabsMenus.length > 1
    })
    const isChoise = itemPath => {
      return itemPath === $route.path ? 'dark' : 'plain'
    }
    const handleClick = itemPath => {
      $router.replace(itemPath)
    }
    const handleClose = itemPath => {
      commit('app/subTabsMenus', itemPath)
      if (itemPath === $route.path) {
        const { path } = last(tabsMenus.value)
        $router.replace(path)
      }
    }
    return {
      collaspse,
      status,
      isChoise,
      tabsMenus,
      handleClick,
      handleClose,
      closable
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  height: 35px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  display: flex;
  padding: 0 10px;
  align-items: center;
  &-container {
    padding: 0 10px;
    &-item {
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
