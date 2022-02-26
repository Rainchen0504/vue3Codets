<template>
  <!-- 面包屑组件 -->
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in props.breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IBreadcrumb } from '../types'

const props = defineProps({
  breadcrumbs: {
    //使用断言as
    type: Array as PropType<IBreadcrumb[]>,
    // Props在设置默认值default时若值类型为Object或者Array时不能直接default而是需要使用函数通过return将值返回出来才可以
    default: () => []
  }
})
</script>

<style scoped></style>
