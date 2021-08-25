<template>
  <div class="m-page">
    <SideBar></SideBar>
    <div class="main">
      <Nav></Nav>
      <div class="app-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './components/nav'
import SideBar from './components/sideBar'
export default {
  name: 'Layout',
  components: {
    Nav,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
  .m-page{
    display: flex;
    width: 100%;
    height: 100%;
    .main {
      width: calc(100vw - 200px);
      height: 100vh;
    }
    .app-main {
      width: 100%;
      height: calc(100vh - 60px);
    }
  }
</style>
