<template>
 <div class="">
   {{ title }}
   <router-view />
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'menu3_child1',
  setup () {
    const title = ref('这是菜单3子菜单1')
    return {
      title
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
