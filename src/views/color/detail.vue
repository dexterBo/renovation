<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getColorInfo } from '@/api/color'

const route = useRoute()
const color = ref()
const recommendList = ref([])

// back
const onClickLeft = () => history.back()
const getColorDetail = async () => {
  const result = await getColorInfo({ id: route.query.id })
  color.value = result.colour
  recommendList.value = result.recommendList
}

watchEffect(() => {
  getColorDetail()
})
</script>

<template>
  <van-nav-bar title="色卡详情" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="logo">
      <van-image width="80" height="80" :radius="20" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    </div>
    <div class="color_name">
      {{ color?.colourCode }}
    </div>
    <div class="desc">
      {{ color?.colourInfo }}
    </div>
    <div class="color_card">
      <van-image width="100%" height="100%" :src="color?.colourImgUrl" />
    </div>
    <div class="color_more">
      <span class="more">更多色卡</span>
      <div class="list">
        <div v-for="item in recommendList" :key="item.id" class="card">
          <div>
            {{ item.colourCode }}
          </div>
          <div>
            <van-image width="130" height="150" :src="item.colourImgUrl" />
          </div>
          <div>
            {{ item.colourName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 74px 30px;

  .logo {
    border-radius: 4px;
  }

  .color_name {
    margin-top: 20px;
    font-size: 12px;
    color: #333;
  }

  .desc {
    padding: 8px 0;
  }

  .canvas {
    width: calc(100vw - 60px);
    height: 300px;
  }

  .color_more {
    margin-top: 30px;
  }

  .more {
    font-weight: 650;
  }
}

.list {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;

  .card {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 150px;
    height: 215px;
    background: inherit;
    background-color: rgba(254, 254, 254, 1);
    border: none;
    border-radius: 5px;
  }
}
</style>
