<template>
 <div class="">
 {{title}}
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'menu6_child2',
  setup () {
    const title = ref('这是菜单6子菜单2')
    return {
      title
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
