<template>
 <div class="">
 {{title}}
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'menu6_child3',
  setup () {
    const title = ref('这是菜单6子菜单3')
    return {
      title
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
