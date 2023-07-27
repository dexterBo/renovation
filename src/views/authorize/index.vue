<script setup lang="ts">
import { showNotify } from 'vant'
import { onMounted, reactive } from 'vue'
import { queryColourPage } from '@/api/color'
import { addAuthorize } from '@/api/index'
import logo from '@/assets/logo.jpg'

// back
const onClickLeft = () => history.back()

const form = ref()

const formModal = reactive({
  compName: '',
  userName: '',
  phone: '',
  projectName: '',
  projectAddr: '',
  useType: '',
  useTypeLabel: '',
  projectScale: undefined,
  colourId: undefined,
  colourIdLabel: undefined,
  projectStage: '',
  projectStageLabel: '',
  constructionInfo: '',
  serviceContent: '',
  authorizeStartDate: '',
})

const showCalendar = ref(false)
const onConfirm = (date) => {
  formModal.authorizeStartDate = `${date.getFullYear()}-${(date.getMonth() + 1) >= 10 ? `${(date.getMonth() + 1)}` : `0${date.getMonth() + 1}`}-${date.getDate()}`
  showCalendar.value = false
}

const useTypeVisible = ref(false)
const options = [{
  text: '零售',
  value: 'retail',
},
{
  text: '地产',
  value: 'property',
},
{
  text: '医疗',
  value: 'medical',
},
{
  text: '商业空间',
  value: 'commercial',
},
{
  text: '交通',
  value: 'traffic',
},
{
  text: '外墙',
  value: 'exteriorWall',
}]

const onConfirmUseType = ({ selectedOptions }) => {
  formModal.useTypeLabel = selectedOptions[0]?.text
  formModal.useType = selectedOptions[0]?.value
  useTypeVisible.value = false
}

const colorIdVisible = ref(false)

const onConfirmColorId = ({ selectedOptions }) => {
  formModal.colourIdLabel = selectedOptions[0]?.text
  formModal.colourId = selectedOptions[0]?.value
  colorIdVisible.value = false
}

const options3 = ref<any>([])

const getColors = async () => {
  const result: any = await queryColourPage({ current: 1, size: 999 })
  options3.value = result?.page?.records.map((item: any) => ({
    text: item.colourName,
    value: item.id,
  }))
}

const options2 = [{
  text: '上图',
  value: 'upper',
},
{
  text: '出样',
  value: 'sampling',
},
{
  text: '投标',
  value: 'bid',
},
{
  text: '商业签约',
  value: 'commercialSigning',
}]
const projectStageVisible = ref(false)

const onConfirmProjectStage = ({ selectedOptions }) => {
  formModal.projectStageLabel = selectedOptions[0]?.text
  formModal.projectStage = selectedOptions[0]?.value
  projectStageVisible.value = false
}

const onSubmit = async () => {
  const result = await addAuthorize(formModal)
  if (result.code === 0) {
    showNotify({
      type: 'success',
      message: '新增授权成功，等待管理员审核',
    })
  }
  history.back()
}

onMounted(() => {
  getColors()
})
</script>

<template>
  <van-nav-bar title="授权申请" left-arrow fixed @click-left="onClickLeft" />

  <div class="container">
    <div class="header">
      <van-image width="80px" height="80px" :radius="20" :src="logo" />
      <div class="desc">
        <div class="title">
          授权申请
        </div>
      </div>
    </div>
    <div class="content">
      <van-form ref="form" label-align="top" class="form" @submit="onSubmit">
        <van-field
          v-model="formModal.compName" label="公司名称" placeholder="请输入公司名称"
          :rules="[{ required: true, message: '请输入公司名称' }]" required
        />
        <van-field
          v-model="formModal.userName" label="联系人姓名" placeholder="请输入联系人姓名"
          :rules="[{ required: true, message: '请输入联系人姓名' }]" required
        />

        <van-field
          v-model="formModal.phone" label="联系人电话" placeholder="请输入联系人电话"
          :rules="[{ required: true, message: '请输入联系人电话' }]" required
        />

        <van-field
          v-model="formModal.projectName" label="项目名称" placeholder="请输入项目名称"
          :rules="[{ required: true, message: '请输入项目名称' }]" required
        />

        <van-field
          v-model="formModal.projectAddr" label="项目地址" placeholder="请输入项目地址"
          :rules="[{ required: true, message: '请输入项目地址' }]" required
        />

        <van-field
          v-model="formModal.useTypeLabel" is-link readonly name="picker" label="应用" placeholder="请选择应用"
          :rules="[{ required: true, message: '请选择应用类型' }]" required @click="useTypeVisible = true"
        />
        <van-popup v-model:show="useTypeVisible" position="bottom">
          <van-picker :columns="options" @confirm="onConfirmUseType" @cancel="useTypeVisible = false" />
        </van-popup>

        <van-field
          v-model="formModal.projectScale" label="项目规模" placeholder="请输入项目规模"
          :rules="[{ required: true, message: '请输入项目规模' }]" required
        />

        <van-field
          v-model="formModal.colourIdLabel" is-link readonly name="picker" label="产品型号(颜色)" placeholder="请选择产品型号"
          :rules="[{ required: true, message: '请选择产品型号' }]" required @click="colorIdVisible = true"
        />
        <van-popup v-model:show="colorIdVisible" position="bottom">
          <van-picker :columns="options3" @confirm="onConfirmColorId" @cancel="colorIdVisible = false" />
        </van-popup>

        <van-field
          v-model="formModal.projectStageLabel" is-link readonly name="picker" label="项目阶段" placeholder="请选择项目阶段"
          :rules="[{ required: true, message: '请选择项目阶段' }]" required @click="projectStageVisible = true"
        />
        <van-popup v-model:show="projectStageVisible" position="bottom">
          <van-picker :columns="options2" @confirm="onConfirmProjectStage" @cancel="projectStageVisible = false" />
        </van-popup>

        <van-field
          v-model="formModal.constructionInfo" label="业主/设施/施工信息" placeholder="请输入业主/设施/施工信息"
          :rules="[{ required: true, message: '请输入业主/设施/施工信息' }]" required
        />

        <van-field
          v-model="formModal.serviceContent" label="项目服务内容" placeholder="请输入项目服务内容"
          :rules="[{ required: true, message: '请输入项目服务内容' }]" required
        />

        <van-field
          v-model="formModal.authorizeStartDate" is-link readonly name="calendar" label="授权开始日期"
          :rules="[{ required: true, message: '请选择授权申请日期' }]" required placeholder="点击选择日期"
          @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />

        <van-button class="button" type="primary" block native-type="submit">
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
    width: 100%;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form {
      padding-left: 6px;
      width: 100%;
    }
  }

  .button {
    margin: auto;
    width: 300px;
    margin-top: 15px;
    margin-left: 16px;
    height: 40px;
  }
}

:deep(.van-field__control) {
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

:deep(.van-cell:after) {
  display: none;
}

:deep(.van-cell > .van-badge__wrapper) {
  display: none;
}
</style>
