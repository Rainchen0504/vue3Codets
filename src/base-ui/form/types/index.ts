type IFormType = 'input' | 'password' | 'select' | 'datepicker'
//表单组件接收父组件传过来的数据配置项的类型
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

//所有配置项的类型，包括表单数据项、文字宽度、布局参数、每栏样式
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
