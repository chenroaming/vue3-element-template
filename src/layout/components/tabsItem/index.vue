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
    // 计算当前点击的tabs标签的总长度
    const countTotalWidth = (i) => {
      const curArr = tags.value.slice(0, i + 1)
      const totalWidth = curArr.reduce((acc, cur) => {
        return acc + cur.$el.clientWidth + 20
      }, 0)
      return totalWidth
    }
    // 计算当前点击的tabs标签的长度
    const countWidth = (i) => {
      const width = i < tags.value.length ? tags.value[i].$el.clientWidth : 0
      return width
    }
    const handleClick = (itemPath) => {
      $router.replace(itemPath)
    }
    // 是否不在可视区域内
    const isHide = (index) => {
      // 判断是否在可视区域左侧
      if (-(dynamicLeft.value) > countTotalWidth(index)) {
        return {
          type: 'hideInLeft',
          diff: -(dynamicLeft.value) - countTotalWidth(index)
        }
      }
      // 判断是否在可视区域右侧
      if (-(dynamicLeft.value) + container.value.clientWidth < countTotalWidth(index)) {
        return {
          type: 'hideInRight',
          diff: countTotalWidth(index) - (-(dynamicLeft.value) + container.value.clientWidth)
        }
      }
      // 在可视区域内
      return {
        type: 'noHide',
        diff: 0
      }
    }
    const moveTabs = (index) => {
      const { type, diff } = isHide(index)
      const containerWidth = container.value.clientWidth // 外部盒子的长度
      // 当点击的是第一个或者第二个时，则直接将移动的距离置为0
      if ([0, 1].includes(index) || type === 'hideInLeft') {
        dynamicLeft.value = 0
        return
      }
      if (type === 'hideInRight') {
        dynamicLeft.value -= diff + 20
        return
      }
      // 计算当前点击的tab距离右边的距离是否小于下一个tab的距离
      if (containerWidth - (countTotalWidth(index) + dynamicLeft.value) <= countWidth(index + 1)) {
        // 计算该tag和下一个tag的长度之和，20是margin的宽度
        dynamicLeft.value -= countWidth(index) + countWidth(index + 1) + 20
        return
      }
      // 计算当前点击的tab与父容器偏移值与偏移值之和是否小于本标签长度
      if (tags.value[index].$el.offsetLeft + dynamicLeft.value < countWidth(index)) {
        // 计算该tag和上一个tag的长度之和，20是margin的宽度
        dynamicLeft.value += countWidth(index) + countWidth(index - 1) + 20
      }
    }
    watch($route, async cur => {
      await dispatch('app/addTabsMenus', last(cur.matched))
      const index = tabsMenus.value.findIndex(item => item.path === cur.path)
      moveTabs(index)
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
