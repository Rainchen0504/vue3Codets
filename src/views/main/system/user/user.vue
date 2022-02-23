<template>
  <div class="user">
    <!-- 搜索组件 -->
    <PageSearch :searchFormConfig="searchFormConfig" />
    <!-- 内容表格 -->
    <PageContent :contentTableConfig="contentTableConfigs" pageName="users" />
  </div>
</template>

<script setup lang="ts">
//引入组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less"></style>
