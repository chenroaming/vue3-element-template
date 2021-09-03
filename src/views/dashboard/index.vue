<template>
 <div class="">
   <div>
     <el-button @click="add">add</el-button>
   </div>
   <div v-for="(item, index) in count" :key="index">{{ msg }}</div>
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup () {
    const msg = ref('首页')
    const count = ref(10)
    const add = () => {
      count.value++
    }
    return {
      msg,
      count,
      add
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
