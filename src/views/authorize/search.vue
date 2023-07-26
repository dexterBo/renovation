<script setup lang="ts">
import { showNotify } from 'vant'
import { queryAuthorizeInfo } from '@/api/index'
import logo from '@/assets/logo.jpg'

// back
const onClickLeft = () => history.back()
const code = ref('')
const handleSearch = async () => {
  if (!code.value) {
    showNotify({
      type: 'warning',
      message: '请输入授权码',
    })
  }
  const result = await queryAuthorizeInfo({ code: code.value })
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
  <van-nav-bar title="授权查询" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="header">
      <van-image width="80px" height="80px" :radius="20" :src="logo" />
      <div class="desc">
        <div class="title">
          授权查询
        </div>
        <div class="detail">
          请在下方填写
        </div>
      </div>
    </div>
    <div class="content">
      <input v-model="code" class="input" placeholder="请输入授权码查询">
      <van-button type="primary" size="small" class="button" block @click="handleSearch">
        查询
      </van-button>
      <div class="email">
        如您现有授权函上<span style="color: red;">无授权码</span>
        <br>
        请发送邮件至123456@mail.com与我们联系
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding: 100px 50px;
  background-color: white;

  .header {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

    .form {
      width: 100%;
    }
  }
  .input {
    width: 245px;
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
  .email{
    margin-top: 10px;
    font-size: 12px;
  }
  .button{
    margin-top: 15px;
    height: 40px;
  }
}
</style>
