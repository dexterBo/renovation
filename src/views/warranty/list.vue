<script setup lang="ts">
import { useRouter } from 'vue-router'
import warranty from './warranty.jpg'
const router = useRouter()
const onClickLeft = () => history.back()
const list = ref([{
  name: '纯亚克力PA1001',
  date: '2023/10/12',
  desc: 'CPG-8801',
}, {
  name: '纯亚克力PA1002',
  date: '2023/10/13',
  desc: 'CPG-8802',
}, {
  name: '纯亚克力PA1003',
  date: '2023/10/14',
  desc: 'CPG-8803',
}])

const handleDetail = (item) => {
  router.push({
    name: 'warrantyDetail',
    query: item,
  })
}
</script>

<template>
  <van-nav-bar title="我的质保卡" left-arrow fixed @click-left="onClickLeft" />
  <div class="warranty">
    <van-cell-group>
      <van-cell v-for="item in list" :key="item.name" :title="item.name" :value="item.date" :label="`产品编号: ${item.desc}`" value-class="value" @click="handleDetail(item)" />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
  .warranty{
    margin-top: 46px;
  }
  .value{
    background-color: red;
  }
</style>

<style lang="less">
  .warranty{
      .value{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
  }
</style>
