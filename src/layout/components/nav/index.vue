<template>
  <div v-if="noShow" class="header">
    <ul class="firstLevel-menu">
      <li v-for="item in menuList" :key="item.name" @click="go(item)">
        <span :style="{ color: setColor(item.name) }">{{ item.title }}</span>
        <span :style="{ opacity: setOpacity(item.name) }"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'nav',
  setup () {
    const noShow = true
    const data = reactive({ currentMenu: 'fir' })
    const menuList = [
      { name: 'fir', title: '首页' },
      { name: 'sec', title: '菜单11111' },
      { name: 'tri', title: '菜单22222' }
    ]
    const go = item => {
      data.currentMenu = item.name
    }
    const setOpacity = name => { return data.currentMenu === name ? '1' : '0' }
    const setColor = name => { return data.currentMenu === name ? '#409EFF' : '#fff' }
    return {
      noShow,
      menuList,
      go,
      data,
      setOpacity,
      setColor
    }
  }
})
</script>

<style scoped lang = "scss">
  .header {
    width: 100%;
    height: 60px;
    background: #304156;
    .firstLevel-menu {
      display: flex;
      margin: 0;
      padding: 0;
      list-style-type: none;
      li {
        max-width: 80px;
        margin: 0 10px;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        span:nth-child(1) {
          display: inline-block;
          transition: color .3s;
        }
        span:nth-child(2) {
          width: 30px;
          display: inline-block;
          height: 2px;
          background: #304156;
          transition: opacity .3s;
        }
      }
    }
  }
</style>
