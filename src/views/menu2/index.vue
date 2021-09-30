<template>
 <div class="">
   {{ title }}
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'menu2_child1',
  setup () {
    const title = ref('菜单二')
    return {
      title
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
