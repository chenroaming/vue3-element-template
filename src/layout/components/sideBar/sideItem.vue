<template>
 <el-sub-menu :index="item.path" v-if="hasChildNode">
    <template #title>
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
  </el-sub-menu>
  <el-menu-item :index="item.path" v-else>
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { computed, defineComponent } from 'vue'
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
