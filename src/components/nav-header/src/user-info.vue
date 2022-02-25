<template>
  <div class="user-info">
    <el-dropdown>
      <!-- 头像名称 -->
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <!-- 下拉菜单 -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="outLogin">退出登陆</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

import { useRouter } from 'vue-router'
const router = useRouter()

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)

//退出登陆，不止退出到登陆页，也要清除本地存储
const outLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
