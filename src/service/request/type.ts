import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YCRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YCRequestInterceptors<T>
  showLoading?: boolean
}
