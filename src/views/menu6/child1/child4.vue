<template>
 <div class="">
 {{title}}
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'menu6_child4',
  setup () {
    const title = ref('这是菜单6子菜单4')
    return {
      title
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
