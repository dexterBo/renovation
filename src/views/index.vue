<script setup lang="ts">
import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'

const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref<boolean>(themeStore === 'dark')

watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStorage.set('theme', 'dark')
  }
  else {
    store.mode = 'light'
    localStorage.set('theme', 'light')
  }
})
</script>

<template>
  <div class="container">
    <div class="logo" />
    <van-cell-group title="路由列表" inset>
      <van-cell title="色卡展示" to="color" is-link />
      <van-cell title="产品列表" to="product" is-link />
      <van-cell title="提交授权" to="authorize" is-link />
      <van-cell title="授权查询" to="authorize/search" is-link />
      <van-cell title="防伪查询" to="security" is-link />
      <van-cell title="质保查询" to="warranty" is-link />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  position: relative;

  .logo {
    width: 150px;
    height: 150px;
    background-image: url('@/assets/logo.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
