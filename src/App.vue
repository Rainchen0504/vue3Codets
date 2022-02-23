<template>
  <div class="app">
    <!-- 提供全局的配置选项，让配置能够在全局都能够被访问到 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
