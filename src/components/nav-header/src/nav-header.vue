<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-if="isFold" /><expand v-else
    /></el-icon>
    <div class="content">
      <HyBreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import UserInfo from './user-info.vue'
//引入图标
import { Expand } from '@element-plus/icons-vue'
import { Fold } from '@element-plus/icons-vue'

import { ref, computed } from 'vue'
const isFold = ref(false)

const emits = defineEmits(['foldChange'])

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}

const store = useStore()
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
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
