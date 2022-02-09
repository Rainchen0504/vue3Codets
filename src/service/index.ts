//封装service，设置请求和响应拦截
import CommonRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const commonRequest = new CommonRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //对携带的token进行拦截
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求拦截成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responeInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responeInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default commonRequest
