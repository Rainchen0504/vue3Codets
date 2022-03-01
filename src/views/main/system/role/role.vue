<template>
  <div class="role">
    <PageContent :searchFormConfig="searchFormConfig"></PageContent>
    <PageSearch :contentTableConfig="contentTableConfig" pageName="role"></PageSearch>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
