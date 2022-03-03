<template>
  <!-- 搜索表单组件，可配置生成 -->
  <div class="page-search">
    <!-- 引入封装的form组件 -->
    <HyForm v-bind="props.searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">搜索部分</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon><refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </HyForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyForm from '@/base-ui/form'

import { Refresh } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  //配置文件
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['resetBtnClick', 'queryBtnClick'])
//1、逻辑一
//搜索框双向绑定的属性值应该是由配置文件的属性来决定的
//符号？？的意思是当左侧返回null和undefined时才会返回右侧的数
const formItems = props.searchFormConfig?.formItems ?? []
//初始化formData数组
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
//hyform表单绑定值初始值，把传过来的searchFormConfig中formItems中的field的值都设置为空
const formData = ref(formOriginData)

//2、逻辑二
//点击重置按钮,需要把formData的值恢复成初始化formOriginData的值
const handleResetClick = () => {
  formData.value = formOriginData
  emits(['resetBtnClick'])

  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }
}

// 点击搜索时
const handleQueryClick = () => {
  emits('queryBtnClick', formData.value)
}
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
