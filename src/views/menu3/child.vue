<template>
 <div class="">
 {{title}}
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'menu3_child2',
  setup () {
    const title = ref('这是菜单三子菜单2')
    return {
      title
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
