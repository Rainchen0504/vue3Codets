<template>
  <!-- 顶部组件，包括伸缩和右侧个人信息 -->
  <div class="nav-header">
    <!-- 图标部分 -->
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-if="isFold" /><expand v-else
    /></el-icon>
    <div class="content">
      <!-- 面包屑组件 -->
      <HyBreadcrumb :breadcrumbs="breadcrumbs" />
      <!-- 顶部右侧个人信息和退出登陆 -->
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './user-info.vue'
//引入面包屑组件
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'

//引入图标
import { Expand } from '@element-plus/icons-vue'
import { Fold } from '@element-plus/icons-vue'

import { ref, computed } from 'vue'

const isFold = ref(false)

const emits = defineEmits(['foldChange'])

//点击事件，是否打开或收缩菜单
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}

const store = useStore()
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  //返回当前链接的路由菜单对象
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
