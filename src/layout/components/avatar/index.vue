<template>
 <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'avatar',
  setup () {
    const { state } = useStore()
    const params = reactive({
      size: 'medium',
      squareUrl: computed(() => state.app.avatar)
    })
    return {
      ...toRefs(params)
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
