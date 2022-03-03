<template>
  <!-- 表单组件 -->
  <div class="hy-form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单封装 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 布局配置，响应式格栅属性，即不同分辨率下每行分为多少份 -->
          <el-col :span="props.colLayout.span">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <!-- 默认情况下，组件的v-modal使用:modal-value和@update:modelValue -->
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>

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
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
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
    default: () => ({ padding: '10px 10px' })
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
const emits = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    emits('update:modelValue', newValue)
  },
  { deep: true }
)

// const handleValueChange = (value: any, field: string) => {
//   emits('update:modelValue', { ...props.modelValue, [field]: value })
// }
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
