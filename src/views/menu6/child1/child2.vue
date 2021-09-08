<template>
 <div class="">
 {{title}}
 <Charts :list="list" :title="title2" :options="options"></Charts>
 </div>
</template>

<script>
import { ref } from 'vue'
import Charts from '@/components/charts'
export default {
  components: {
    Charts
  },
  setup () {
    const title = ref('这是菜单6子菜单2')
    const options = ref({
      title: 'name',
      key1: 'num1',
      key2: 'num2'
    })
    const title2 = ref([
      { name: '最高薪酬', color: '#DE782F' },
      { name: '本人薪酬', color: '#1CB6FF' }
    ])
    const list = ref([
      { name: '下载', num1: 150, num2: 75 },
      { name: '对讲', num1: 166, num2: 75 },
      { name: '大数据', num1: 170, num2: 75 },
      { name: '公有云', num1: 122, num2: 75 },
      { name: '集团语言类', num1: 200, num2: 75 },
      { name: '云MAS', num1: 250, num2: 75 },
      { name: '工地监控', num1: 100, num2: 75 },
      { name: '和对讲', num1: 75, num2: 75 }
    ])
    return {
      title,
      title2,
      list,
      options
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
