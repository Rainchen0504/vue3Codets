<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-if="isFold" /><expand v-else
    /></el-icon>
    <div class="content">
      <div>面包屑标题</div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './user-info.vue'
//引入图标
import { Expand } from '@element-plus/icons-vue'
import { Fold } from '@element-plus/icons-vue'

import { ref } from 'vue'
const isFold = ref(false)

const emits = defineEmits(['foldChange'])

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
