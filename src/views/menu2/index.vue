<template>
 <div class="">
   {{ title }}
   {{ data.name }}
   {{ data.age }}
   {{ data.gender }}
 </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent } from 'vue'
interface TsTestData {
  name: string;
  age: string | number;
  gender: string;
}
export default defineComponent({
  name: 'menu2_child1',
  setup () {
    const title = ref('菜单二')
    const data = reactive({
      name: 'zhangsan',
      age: 20,
      gender: 'male'
    }) as TsTestData
    return {
      title,
      data
    }
  }
})
</script>

<style scoped lang = "scss">

</style>
