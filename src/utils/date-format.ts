import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

//引入dayjs实现时间格式从utc到年月日的转化
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).format(format)
}

export function formatTimestamp(timestamp: number, format: string = DATE_TIME_FORMAT) {
  return ''
}
