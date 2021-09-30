<template>
  <el-dropdown placement="bottom-end">
    <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click="changeLayout">切换菜单栏布局</el-dropdown-item>
        <el-dropdown-item @click="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'avatar',
  setup () {
    const { state, dispatch } = useStore()
    const params = reactive({
      size: 'medium',
      squareUrl: computed(() => state.app.avatar)
    })
    const logout = () => {
      dispatch('user/logout')
    }
    const changeLayout = () => {
      // 本地存储取出来为string格式，需用JSON.parse转换一下
      const needNav = JSON.parse(window.localStorage.getItem('vue3-element-template-needTopNav'))
      const text = needNav ? '关闭' : '打开'
      ElMessageBox.confirm(
        `确认${text}顶部菜单栏布局吗？此操作将刷新页面`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          window.localStorage.setItem('vue3-element-template-needTopNav', !needNav)
          location.reload()
        })
        .catch(() => {})
    }
    return {
      ...toRefs(params),
      logout,
      changeLayout
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
