<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const onClickLeft = () => history.back()
const current = computed(() => route.query)
</script>

<template>
  <van-nav-bar title="质保卡详情" left-arrow fixed @click-left="onClickLeft" />
  <div class="content">
    <div class="info">
      <div>{{ current.prodCode }}</div>
      <div>{{ current.custAddr }}</div>
      <div>{{ current.buyDate }}</div>
      <div>{{ current.size }}</div>
      <div>{{ current.colour }}</div>
      <div>{{ current.material }}</div>
      <div>{{ current.dealer }}</div>
      <div>{{ current.phone }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .content{
    width: 100vw;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    background: url("./warranty.jpg");
    background-size: 100% 100%;
    background-position-y: 46px;
  }
  .info{
    position: absolute;
    top: 50.5%;
    right: 10%;
    text-align: right;
    color: #666;
    font-size: 14px;
    & div{
      height: 4vh;
    }
  }
</style>
