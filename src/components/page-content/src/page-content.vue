<template>
  <div class="page-content">
    <!-- 传参表体数据和配置项 -->
    <HyTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="props.contentTableConfig"
      v-model="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="default">新建用户</el-button>
      </template>

      <!-- 列中的插槽1状态列 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <!-- 列中的插槽2创建时间 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <!-- 列中的插槽3更新时间 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 插槽操作列 -->
      <template #handler>
        <div class="handle-btns">
          <el-button v-if="isUpdate" size="small" type="text">编辑</el-button>
          <el-button v-if="isDelete" size="small" type="text">删除</el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSLots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyTable>
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

//双向绑定pageinfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 })
watch(pageInfo, () => getPageData())

//声明发送请求的方法,重置时不用传参数，搜索时要传参
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
const otherPropSLots = props.contentTableConfig?.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
