<script setup lang="ts">
import { showNotify } from 'vant'
import { queryAuthorizeInfo } from '@/api/index'
import logo from '@/assets/logo.jpg'

// back
const onClickLeft = () => history.back()
const formModal = reactive({
  userName: '',
  addr: '',
  phone: '',
})

const onSubmit = async () => {
  const result = await queryAuthorizeInfo(formModal)
  if (result.code === 0) {
    showNotify({
      type: 'success',
      message: '有效授权码',
    })
  } else {
    showNotify({
      type: 'warning',
      message: '无授权码',
    })
  }
}
</script>

<template>
  <van-nav-bar title="质保查询" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="header">
      <van-image width="80px" height="80px" :radius="20" :src="logo" />
      <div class="desc">
        <div class="title">
          质保查询
        </div>
        <div class="detail">
          请输入信息
        </div>
      </div>
    </div>
    <div class="content">
      <van-form ref="form" label-width="120px" class="form" @submit="onSubmit">
        <van-field
          v-model="formModal.userName" label="姓名" placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]" required
        />
        <van-field
          v-model="formModal.phone" label="电话" placeholder="请输入联系人电话"
          :rules="[{ required: true, message: '请输入联系人电话' }]" required
        />
        <van-field
          v-model="formModal.addr" label="收货地址" placeholder="请输入收货地址"
          :rules="[{ required: true, message: '请输入收货地址' }]" required
        />
        <van-button type="primary" round block native-type="submit">
          提交
        </van-button>
      </van-form>
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
