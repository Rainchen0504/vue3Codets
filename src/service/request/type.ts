import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CommonRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
}
