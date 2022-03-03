<template>
  <!-- 方法一：采用v-model双向绑定的方法实现搜索重置清值功能 -->
  <!-- 表单组件 -->
  <div class="hy-form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单封装 -->
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <!-- 布局配置，响应式格栅属性，即不同分辨率下每行分为多少份 -->
          <el-col :span="props.colLayout.span">
            <el-form-item :label="item.label" :rules="item.rules" :style="props.itemStyle">
              <!-- 输入栏 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <!-- 选择栏 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <!-- 选项框 -->
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 时间选择框 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 表单封装
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          布局配置，响应式格栅属性，即不同分辨率下每行分为多少份
          <el-col :span="props.colLayout.span">
            <el-form-item :label="item.label" :rules="item.rules" :style="props.itemStyle">
              输入栏
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              选择栏
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.palceholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  选项框
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              时间选择框
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form> -->

    <!-- 底部插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IFormItem } from '../types'

const props = defineProps({
  //从page-search传进来双向绑定的值
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 20px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})

// watch(
//   //监听表单中双向绑定的值，在值变化的时候（也就是填写时）把值发送给父组件显示和操作
//   formData,
//   (newValue) => {
//     emit('update:modelValue', newValue)
//   },
//   { deep: true }
// )

const emits = defineEmits(['update:modelValue'])

const handleValueChange = (value: any, field: string) => {
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
