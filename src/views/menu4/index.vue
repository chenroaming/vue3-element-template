<template>
 <div class="">
 {{ title }}
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'menu4_child1',
  setup () {
    const title = ref('这是菜单4')
    return {
      title
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
