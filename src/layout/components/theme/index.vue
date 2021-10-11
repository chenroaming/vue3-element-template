<template>
  <div class="theme">
    <span>选择菜单背景颜色</span>
    <el-color-picker
      v-model="theme.menuBg"
      @change="handleChange"
      size="mini"
    />
    <span>选择菜单字体颜色</span>
    <el-color-picker
      v-model="theme.fontColor"
      @change="handleChange"
      size="mini"
    />
    <span>选择菜单激活字体颜色</span>
    <el-color-picker
      v-model="theme.activeColor"
      @change="handleChange"
      size="mini"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
interface theme {
  menuBg?: string
  fontColor?: string
  activeColor?: string
}
export default defineComponent({
  name: 'theme',
  setup () {
    const { commit } = useStore()
    const getTheme = JSON.parse(window.localStorage.getItem('vue3-element-template-theme') || '')
    const theme:theme = reactive({
      menuBg: getTheme?.menuBg ?? '#304156',
      fontColor: getTheme?.fontColor ?? '#fff',
      activeColor: getTheme?.activeColor ?? '#409EFF'
    })
    const handleChange = () => {
      commit('app/setTheme', theme)
      window.localStorage.setItem('vue3-element-template-theme', JSON.stringify(theme))
    }
    return {
      theme,
      handleChange
    }
  }
})
</script>

<style scoped lang="scss">
.theme {
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 15px;
  font-size: 13px;
}
</style>
