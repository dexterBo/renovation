<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const url = computed((): any => route.query.url)
const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar title="pdf预览" left-arrow fixed @click-left="onClickLeft" />
  <iframe v-if="url" :src="url" class="iframe" />
</template>

<style lang="less" scoped>
.iframe{
  margin-top: 50px;
  width: 100vw;
  height: calc(100vh - 50px);
}
</style>
