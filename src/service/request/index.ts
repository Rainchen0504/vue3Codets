import axios from 'axios'
//axios实例类型
import type { AxiosInstance } from 'axios'
import type { YCRequestInterceptors, YCRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class YCRequest {
  instance: AxiosInstance
  interceptors?: YCRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: YCRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)
    //基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors
    //使用拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('请求拦截失败')
        return err
      }
    )
  }
}
