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
      v-bind="childrenProps"
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
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
  listCount: {
    type: Number,
    default: 0
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
  },
  //后台请求回来的page对象
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  },
  // 渲染嵌套数据的配置选项,必须设置row-key，再tree-props中设置children
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['selectionChange', 'update:page'])

const handleSelectionChange = (value: any) => {
  emits('selectionChange', value)
}

const handleSizeChange = (currentPage: number) => {
  emits('update:page', { ...props.page, currentPage })
}

const handleCurrentChange = (pageSize: number) => {
  emits('update:page', { ...props.page, pageSize })
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
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
