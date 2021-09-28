<template>
 <div class="">
   <div>
     <el-button @click="add">点击添加行数</el-button>
   </div>
   <div v-for="(item, index) in count" :key="index">{{ msg }}{{ index }}</div>
 </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup () {
    const msg = ref('测试keepAlive效果')
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
