<template>
  <div class="tabs">
    <el-button type="text" @click="collaspse">{{ status }}</el-button>
    <div class="tabs-container" ref="container">
      <div class="tabs-container-inner" ref="inner" :style="{ left: dynamicLeft + 'px' }">
        <el-tag
          class="tabs-container-item"
          v-for="(item, i) in tabsMenus"
          :key="item.name"
          :ref="item => { if (item) tags[i] = item }"
          :effect="isChoise(item.path)"
          @click="handleClick(item.path, i)"
          @close="handleClose(item.path)"
          :closable="closable"
          size="mini"
          >{{ item.meta.title }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onBeforeUpdate, watch } from 'vue'
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
    const container = ref(null)
    const inner = ref(null)
    const tags = ref([])
    const dynamicLeft = ref(0)
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

    const handleClose = itemPath => {
      commit('app/subTabsMenus', itemPath)
      if (itemPath === $route.path) {
        const { path } = last(tabsMenus.value)
        $router.replace(path)
      }
    }
    const moveTabs = (index) => {
      const containerWidth = container.value.clientWidth // 外部盒子的长度
      // 计算当前点击的tab及该tab之前的总长度与偏移值之和是否大于可视区域
      if (countTotalWidth(index) + dynamicLeft.value >= containerWidth) {
        dynamicLeft.value -= countWidth(index) + 50
      }
      // 计算当前点击的tab与父容器偏移值与偏移值之和是否小于本标签长度
      if (tags.value[index].$el.offsetLeft + dynamicLeft.value < countWidth(index)) {
        dynamicLeft.value += countWidth(index) - 10
      }
    }
    // 计算当前点击的tabs标签的总长度
    const countTotalWidth = (i) => {
      const curArr = tags.value.slice(0, i + 1)
      const totalWidth = curArr.reduce((acc, cur) => {
        return acc + cur.$el.clientWidth + 22
      }, 0)
      return totalWidth
    }
    // 计算当前点击的tabs标签的长度
    const countWidth = (i) => {
      const width = tags.value[i].$el.clientWidth
      return width
    }
    const handleClick = (itemPath, index) => {
      moveTabs(index)
      $router.replace(itemPath)
    }
    watch($route, cur => {
      const index = tabsMenus.value.findIndex(item => item.path === cur.path)
      index ?? moveTabs(index)
    })
    // 确保在每次更新之前重置ref，源自官方文档写法
    onBeforeUpdate(() => {
      tags.value = []
    })
    return {
      collaspse,
      status,
      isChoise,
      tabsMenus,
      handleClick,
      handleClose,
      closable,
      container,
      inner,
      tags,
      dynamicLeft
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
    overflow: hidden;
    width: 95%;
    height: 30px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    &-item {
      margin: 0 10px;
      cursor: pointer;
    }
    &-inner {
      display: flex;
      align-items: center;
      position: relative;
      transition: left .3s;
    }
  }
}
</style>
