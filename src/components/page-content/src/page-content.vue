<template>
  <div class="page-content">
    <!-- 传参表体数据和配置项 -->
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="default" @click="handleNewClick"
          >新建用户</el-button
        >
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate" size="small" type="text" @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button v-if="isDelete" size="small" type="text" @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { ref, computed, watch } from 'vue'
import { usePermission } from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const store = useStore()

//获取操作权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

//1、双向绑定pageinfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 })
watch(pageInfo, () => getPageData())

//2、声明发送请求的方法,重置时不用传参数，搜索时要传参
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}

//执行一次请求
getPageData()

//从vuex中获取数据
const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName))

//获取其它的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

//删除、编辑、新增操作方法
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}

const emits = defineEmits(['newBtnClick', 'editBtnClick'])
const handleNewClick = () => {
  emits('newBtnClick')
}
const handleEditClick = () => {
  emits('editBtnClick')
}

defineExpose({ getPageData })
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
