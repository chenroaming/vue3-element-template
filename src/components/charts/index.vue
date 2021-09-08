<template>
 <div class="container">
   <div>{{ isEmpty }}</div>
   <div class="container-title">
     <div class="container-title-item" v-for="item in title" :key="item.name">
       <span>{{ item[options.title] }}</span>
       <span :style="{ background: item.color }"></span>
     </div>
   </div>
   <div class="container-item" v-for="item in list" :key="item.name">
     <div class="container-item-title">{{ item[options.title] }}</div>
     <div class="container-item-chart">
       <div :style="{ width: countWidth(item[options.key1], item[options.key2]) + '%' }"></div>
       <div :style="{ width: countWidth(item[options.key2], item[options.key1]) + '%' }"></div>
     </div>
     <div class="container-item-num">
       <div>{{ item[options.key1] }}</div>
       <div>{{ item[options.key2] }}</div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'charts',
  props: {
    options: {
      type: Object,
      default: () => ({
        title: 'name',
        key1: 'num1',
        key2: 'num2'
      })
    },
    title: {
      type: Array,
      default: () => ([])
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    isEmpty () {
      return this.title.length < 1 && this.list.length < 1 ? '暂无数据' : ''
    }
  },
  methods: {
    countWidth (num1, num2) {
      return num1 / (num1 + num2) * 100
    }
  }
}
</script>

<style scoped lang = "scss">
  .container {
    width: 500px;
    background: #DFEBFF;
    padding: 20px;
    display: flex;
    flex-direction: column;
    &-title {
      display: flex;
      &-item {
        span:nth-child(1) {
          margin: 0 10px;
        }
        span:nth-child(2) {
          display: inline-block;
          width: 10px;
          height: 10px;
        }
      }
    }
    &-item {
      display: flex;
      margin: 10px 0px;
      &-title {
        width: 15%;
      }
      &-chart {
        width: 80%;
        height: 70px;
        div:nth-child(1) {
          max-width: 100%;
          height: 30px;
          background: #DE782F;
        }
        div:nth-child(2) {
          max-width: 100%;
          height: 30px;
          background: #1CB6FF;
        }
      }
      &-num {
        width: 10%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
</style>
