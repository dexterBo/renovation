<script setup lang="ts">
import { showNotify } from 'vant'
import { queryProdCodeInfo } from '@/api/index'
import logo from '@/assets/logo.jpg'

// back
const onClickLeft = () => history.back()
const code = ref('')
const handleSearch = async () => {
  if (!code.value) {
    showNotify({
      type: 'warning',
      message: '请输入产品编码',
    })
  }
  const result = await queryProdCodeInfo({ code: code.value })
  if (result.code === 0) {
    showNotify({
      type: 'success',
      message: '有效产品编码',
    })
  } else {
    showNotify({
      type: 'warning',
      message: '无效产品编码',
    })
  }
}
</script>

<template>
  <van-nav-bar title="防伪查询" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="header">
      <van-image width="80px" height="80px" :radius="20" :src="logo" />
      <div class="desc">
        <div class="title">
          防伪查询
        </div>
        <div class="detail">
          感谢您的支持，请输入产品编码
        </div>
      </div>
    </div>
    <div class="content">
      <van-field v-model="code" label="产品编码" placeholder="请输入产品编码" />
      <van-button type="primary" round block @click="handleSearch">
        查询
      </van-button>
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
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;

    .form {
      width: 100%;
    }
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
