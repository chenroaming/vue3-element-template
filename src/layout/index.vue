<template>
  <div class="m-page">
    <SideBar></SideBar>
    <div class="main">
      <Nav></Nav>
      <div class="app-main">
        <TabsItem></TabsItem>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './components/nav'
import SideBar from './components/sideBar'
import TabsItem from './components/tabsItem'
import { onMounted } from 'vue'
export default {
  name: 'Layout',
  components: {
    Nav,
    SideBar,
    TabsItem
  },
  setup () {
    console.log('fatherCreated')
    onMounted(() => {
      console.log('father Mounted')
    })
  }
}
</script>

<style lang="scss" scoped>
  .m-page{
    display: flex;
    width: 100%;
    height: 100%;
    .main {
      width: 100%;
      height: 100vh;
    }
    .app-main {
      width: 100%;
      height: calc(100vh - 60px);
    }
  }
</style>
