<script setup lang="ts">
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import { queryProductPage } from '@/api/product'
import logo from '@/assets/logo.jpg'
const router = useRouter()

// back
const onClickLeft = () => history.back()
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const name = ref('')
const size = ref(0)
const current = ref(1)

const onLoad = async () => {
  try {
    size.value += 4
    const result = await queryProductPage({
      name: name.value,
      size: size.value,
      current: current.value,
    })
    if (result.code === 0) {
      list.value = result.page.records
    }
    if (size.value * current.value >= result.page.total) {
      finished.value = true
    }
  } catch (error) {
    showNotify({
      type: 'danger',
      message: String(error),
    })
  } finally {
    loading.value = false
  }
}

const to = (item) => {
  if (item.jumpType === 1) {
    router.push({
      name: 'pdf',
      query: {
        url: item.jumpUrl,
      },
    })
  }
  if (item.jumpType === 2) {
    window.location.href = item.jumpUrl
  }
}

watch(name, () => {
  size.value = 0
  onLoad()
})
</script>

<template>
  <van-nav-bar title="产品介绍" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="header">
      <van-image width="80px" height="80px" :radius="20" :src="logo" />
      <div class="desc">
        <div class="title">
          产品资料
        </div>
        <div class="detail">
          品牌名称，卓越之选，质保无忧
        </div>
      </div>
    </div>
    <div class="content">
      <input v-model="name" class="input" placeholder="请输入产品名称">

      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list">
          <div v-for="item in list" :key="item.id" class="card" @click="to(item)">
            <van-image width="90%" height="90%" :src="item?.prodImgUrl" />
            <div>
              {{ item.prodName }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 50px;
  background-color: white;

  .header {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    background-color: white;
  }

  .desc {
    width: 70%;

    .title {
      font-size: 18px;
    }

    .detail {
      font-size: 12px;
      color: #333;
    }
  }

  .content {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
  }

  .color_name {
    margin-top: 20px;
    font-size: 12px;
    color: #333;
  }

  .canvas {
    width: calc(100vw - 60px);
    height: 300px;
  }

  .color_more {
    margin-top: 10px;
  }

  .more {
    font-weight: 650;
  }

  .input {
    width: 300px;
    height: 40px;
    padding: 0 20px;
    background-color: rgba(51, 51, 51, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(204, 204, 204, 1);
    border-radius: 5px;
  }

  input::placeholder {
    color: rgb(153, 153, 153);
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
  }
}

.list {
  width: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;

  .card {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 320px;
    height: 202px;
    background: inherit;
    background-color: white;
    border: none;
    border-radius: 5px;
  }
}
</style>
