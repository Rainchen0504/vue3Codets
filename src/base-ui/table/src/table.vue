<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ props.title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <!-- 封装表格 -->
    <el-table
      :data="props.listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 配置checkbox列 -->
      <el-table-column
        v-if="props.showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>

      <!-- 配置序号列 -->
      <el-table-column
        v-if="props.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>

      <!-- 遍历表格列 -->
      <template v-for="propItem in props.propList" :key="propItem.prop">
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

    <!-- 翻页组件 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  //表体数据
  listData: {
    type: Array,
    required: true
  },
  //表头对象信息
  propList: {
    type: Array,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['selectionChange'])

const handleSelectionChange = (value: any) => {
  emits('selectionChange', value)
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 10px;

  .el-pagination {
    text-align: right;
  }
}
</style>
