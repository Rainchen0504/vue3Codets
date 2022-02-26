<template>
  <div class="app">
    <!-- 提供全局的配置选项，让配置能够在全局都能够被访问到 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.app {
  height: 100%;
}
</style>
