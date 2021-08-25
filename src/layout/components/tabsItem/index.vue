<template>
 <div class="tabs">
   <el-button type="text" @click="collaspse">{{ status }}</el-button>
 </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup () {
    const store = useStore()
    const collaspse = () => {
      store.dispatch('app/changeCollapse')
    }
    const status = computed(() => {
      return store.getters['app/isCollapse'] ? '展开' : '收起'
    })
    return {
      collaspse,
      status
    }
  }
}
</script>

<style scoped lang = "scss">
  .tabs {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    display: flex;
    padding: 0 10px;
  }
</style>
