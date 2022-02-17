<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavHeader from '@/component/nav-header'
import NavMenu from '@/component/nav-menu'
import { ref } from 'vue'

//侧边栏是否收起
const isCollapse = ref(false)
//子组件传过来的方法控制点击图标后侧边栏变化
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  //宽度0.3s内匀速变化
  transition: width 0.3s linear;
  //是否允许滚动条时出现厚度
  scrollbar-width: none;
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
