<template>
 <div class="">
   <div v-for="(item, index) in 100" :key="index">{{ msg }}</div>
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup () {
    const msg = ref('首页')
    return {
      msg
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
