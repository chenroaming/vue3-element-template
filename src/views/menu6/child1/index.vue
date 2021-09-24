<template>
 <div class="">
  {{title}}
  <div>只有超级管理员账号才能看到这个页面</div>
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
