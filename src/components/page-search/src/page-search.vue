<template>
  <!-- 搜索表单组件，可配置生成 -->
  <div class="page-search">
    <!-- 引入封装的form组件 -->
    <hy-form v-bind="props.searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button>
            <el-icon><refresh /></el-icon>重制</el-button
          >
          <el-button type="primary"
            ><el-icon><search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyForm from '@/base-ui/form'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
