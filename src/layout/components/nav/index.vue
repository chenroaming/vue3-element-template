<template>
  <div v-if="noShow" class="header">

  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'nav',
  setup () {
    const noShow = true

    return {
      noShow
    }
  }
})
</script>

<style scoped lang = "scss">
  .header {
    width: 100%;
    height: 60px;
    background: #545c64;
  }
</style>
