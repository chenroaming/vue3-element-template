<template>
 <el-submenu :index="item.path" v-if="hasChildNode">
    <template v-slot:title>
      <i :class="item.meta.icon"></i>
      <span>{{ item.meta.title }}</span>
    </template>
    <!-- 递归显示子菜单 -->
    <el-menu-item-group
      v-for="child in item.children"
      :key="child.meta.title"
      >
      <slideItem
        v-if="child.children && child.children.length > 0"
        :item="child"></slideItem>
      <el-menu-item
        v-if="!child.children"
        :key="child.name"
        :index="child.path">{{ child.meta.title }}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item :index="item.path" v-else>
    <i :class="item.meta.icon"></i>
    <template v-slot:title>
      <span>{{ item.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'slideItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const hasChildNode = computed(() => {
      return props.item.children && props.item.children.length > 0 && props.item.isCollapse
    })
    return {
      hasChildNode
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
