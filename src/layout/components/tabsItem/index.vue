<template>
  <div class="tabs">
    <el-icon style="cursor: pointer;" :size="size" color="#000" @click="collaspse">
      <Fold />
    </el-icon>
    <div class="tabs-container" ref="container">
      <el-icon
        style="cursor: pointer;z-index:99;background: #fff;"
        @click="move('left')"
        :size="size"
        :color="color"
      >
        <ArrowLeft />
      </el-icon>
      <div
        class="tabs-container-inner"
        ref="inner"
        :style="{ left: dynamicLeft + 'px' }"
      >
        <el-tag
          class="tabs-container-item"
          :style="{ margin: marginStyle }"
          v-for="(item, i) in tabsMenus"
          :key="item.name"
          :ref="
            item => {
              if (item) tags[i] = item;
            }
          "
          :effect="isChoise(item.path)"
          @click="handleClick(item.path, i)"
          @close="handleClose(item.path)"
          :closable="closable"
          size="mini"
          >{{ item.meta.title }}</el-tag
        >
      </div>
    </div>
    <el-icon
      style="cursor: pointer;"
      @click="move('right')"
      :size="size"
      :color="color"
    >
      <ArrowRight />
    </el-icon>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onBeforeUpdate, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { last } from 'lodash'
import { ArrowLeft, ArrowRight, Fold } from '@element-plus/icons'
export default {
  components: {
    ArrowLeft,
    ArrowRight,
    Fold
  },
  setup () {
    const size = ref(20)
    const color = ref('#aaa')
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
    const margin = 20
    const marginStyle = `0px ${margin / 2}px`
    const move = type => {
      if (type === 'left' && dynamicLeft.value >= 0) return false
      const containerWidth = container.value.clientWidth // 外部盒子的长度
      const innerWidth = inner.value.clientWidth // 内部盒子的长度
      if (type === 'right' && innerWidth < containerWidth) return false
      if (
        type === 'right' &&
        innerWidth - containerWidth < -dynamicLeft.value
      ) {
        return false
      }
      type === 'left' && (dynamicLeft.value += 30)
      type === 'right' && (dynamicLeft.value -= 30)
    }
    const tabsMenus = computed(() => {
      // hide属性表示该路由需隐藏
      return state.app.tabsMenus.filter(item => !item.meta.hide)
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
    const countTotalWidth = i => {
      const curArr = tags.value.slice(0, i + 1)
      const totalWidth = curArr.reduce((acc, cur) => {
        return acc + cur.$el.clientWidth + margin
      }, 0)
      return totalWidth
    }
    // 计算当前点击的tabs标签的长度
    const countWidth = i => {
      const width = i < tags.value.length ? tags.value[i].$el.clientWidth : 0
      return width
    }
    const handleClick = itemPath => {
      $router.replace(itemPath)
    }
    // 是否不在可视区域内
    const isHide = index => {
      // 判断是否在可视区域左侧
      if (-dynamicLeft.value > countTotalWidth(index)) {
        return {
          type: 'hideInLeft',
          diff: -dynamicLeft.value - countTotalWidth(index)
        }
      }
      // 判断是否在可视区域右侧
      if (
        -dynamicLeft.value + container.value.clientWidth <
        countTotalWidth(index)
      ) {
        return {
          type: 'hideInRight',
          diff:
            countTotalWidth(index) -
            (-dynamicLeft.value + container.value.clientWidth)
        }
      }
      // 在可视区域内
      return {
        type: 'noHide',
        diff: 0
      }
    }
    const moveTabs = index => {
      const { type, diff } = isHide(index)
      const containerWidth = container.value.clientWidth // 外部盒子的长度
      // 当点击的是第一个或者第二个时，则直接将移动的距离置为0
      if ([0, 1].includes(index) || type === 'hideInLeft') {
        dynamicLeft.value = 0
        return
      }
      if (type === 'hideInRight') {
        dynamicLeft.value -= diff + margin
        return
      }
      // 计算当前点击的tab距离右边的距离是否小于下一个tab的距离
      if (
        containerWidth - (countTotalWidth(index) + dynamicLeft.value) <=
        countWidth(index + 1)
      ) {
        // 计算该tag和下一个tag的长度之和，常量margin是marginLeft和marginRight之和
        dynamicLeft.value -= countWidth(index) + countWidth(index + 1) + margin
        return
      }
      // 计算当前点击的tab与父容器偏移值与偏移值之和是否小于本标签长度
      if (
        tags.value[index].$el.offsetLeft + dynamicLeft.value <
        countWidth(index)
      ) {
        // 计算该tag和上一个tag的长度之和，常量margin是marginLeft和marginRight之和
        dynamicLeft.value += countWidth(index) + countWidth(index - 1) + margin
      }
    }
    watch($route, async cur => {
      // 当检测到接下去要跳转的页面的hide为true时，说明该页面不需要添加入标签栏
      if (cur.matched.every(item => item.meta.hide)) return
      await dispatch('app/addTabsMenus', last(cur.matched))
      const index = tabsMenus.value.findIndex(item => item.path === cur.path)
      moveTabs(index)
    })
    // 确保在每次更新之前重置ref，源自官方文档写法
    // 参见：https://v3.cn.vuejs.org/guide/migration/array-refs.html
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
      dynamicLeft,
      size,
      color,
      move,
      marginStyle
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
      cursor: pointer;
    }
    &-inner {
      display: flex;
      align-items: center;
      position: relative;
      transition: left 0.3s;
    }
  }
}
</style>
