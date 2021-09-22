<template>
  <el-dropdown placement="bottom-end">
    <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
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
    return {
      ...toRefs(params),
      logout
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
