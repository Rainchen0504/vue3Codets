<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-if="isFold" /><expand v-else
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
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
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
