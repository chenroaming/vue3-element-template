<template>
 <div class="">
   {{ title }}
   <el-button type="primary" size="mini" @click="getList">接口调用测试</el-button>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '@/api/index.ts'
export default defineComponent({
  name: 'menu1_child1',
  setup () {
    const { demo } = api
    const title = ref('菜单一')
    const getList = async () => {
      const res = await demo.getList({
        fundCode: 160222,
        date: '11111'
      })
      console.log(res)
    }
    return {
      title,
      getList
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
