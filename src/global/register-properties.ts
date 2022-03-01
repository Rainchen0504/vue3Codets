import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'
//给app.config.globalProperties添加全局属性filters
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
