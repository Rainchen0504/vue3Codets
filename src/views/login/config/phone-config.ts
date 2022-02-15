export const rules = {
  num: [
    {
      required: true,
      message: '请输入电话号码',
      trigger: 'blur'
    },
    {
      pattern: /^[[0-9]{8,11}$/,
      message: '电话号码为8到11位数字',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[[0-9]{4}$/,
      message: '请输入4位验证码',
      trigger: 'blur'
    }
  ]
}
