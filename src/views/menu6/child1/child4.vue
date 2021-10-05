<template>
 <div class="">
 {{title}}
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'menu6_child4',
  setup () {
    const title = ref('这是菜单6子菜单4')
    return {
      title
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
