<template>
 <div class="">
  {{title}}
  <router-view />
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const title = ref('这是菜单6')
    return {
      title
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
