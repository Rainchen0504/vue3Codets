<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单封装 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 布局配置，响应式格栅属性，即不同分辨率下每行分为多少份 -->
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
