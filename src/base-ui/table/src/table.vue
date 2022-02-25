<template>
  <div class="hy-table">
    <!-- 封装表格 -->
    <el-table :data="props.listData" border style="width: 100%">
      <!-- 遍历表格列 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 自定义列的显示内容 -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  //表体数据
  listData: {
    type: Array,
    required: true
  },
  //表头对象信息
  propList: {
    type: Array,
    required: true
  }
})
</script>

<style scoped></style>
