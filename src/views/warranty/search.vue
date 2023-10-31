<script setup lang="ts">
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import { queryWarrantyInfo } from '@/api/index'
import logo from '@/assets/logo.jpg'
const router = useRouter()

// back
const onClickLeft = () => history.back()
const formModal = reactive({
  userName: '',
  addr: '',
  phone: '',
})

const onSubmit = async () => {
  const result = await queryWarrantyInfo(formModal)
  if (result.code === 0) {
    showNotify({
      type: 'success',
      message: '有效授权码',
    })
    router.push({
      name: 'warrantyDetail',
      query: result.cust,
    })
  } else {
    showNotify({
      type: 'warning',
      message: '无授权码',
    })
  }
}

// const handleSearchWarranty = () => {
//   router.push({
//     name: 'warrantyList',
//   })
// }
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
      <input v-model="formModal.userName" class="input" placeholder="请输入姓名">
      <input v-model="formModal.phone" class="input" placeholder="请输入联系人电话">
      <input v-model="formModal.addr" class="input" placeholder="请输入收货地址">
      <van-button class="button" type="primary" block native-type="submit" @click="onSubmit">
        提交
      </van-button>
      <!-- <div class="my" @click="handleSearchWarranty">
        我的质保卡
      </div> -->
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
    padding: 50px;
    padding-bottom: 30px;
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
    margin-top: 10px;
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
.button{
    width: 300px;
    margin-top: 15px;
    height: 40px;
  }
  .my{
    margin-top: 20px;
    font-size: 14px;
    color: #444;
  }
</style>
