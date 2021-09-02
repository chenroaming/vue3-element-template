<template>
  <div class="m-page">
    <SideBar></SideBar>
    <div class="main">
      <NavBar></NavBar>
      <div class="app-main">
        <div class="app-main-header">
          <BreadCrumb></BreadCrumb>
          <Avatar></Avatar>
        </div>
        <TabsItem></TabsItem>
        <el-scrollbar class="scrollbar-wrapper">
          <div class="app-main-section">
            <router-view/>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/nav'
import SideBar from './components/sideBar'
import TabsItem from './components/tabsItem'
import BreadCrumb from './components/breadCrumb'
import Avatar from './components/avatar'
export default {
  name: 'Layout',
  components: {
    NavBar,
    SideBar,
    TabsItem,
    BreadCrumb,
    Avatar
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
  .m-page{
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main {
      width: 100%;
      height: 100vh;
    }
    .app-main {
      width: 100%;
      height: calc(100vh - 60px);
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        height: 50px;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      }
      &-section {
        width: 100%;
        padding: 10px;
        padding-bottom: 100px;
      }
    }
  }
</style>
