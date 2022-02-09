//对axios的封装
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { CommonRequestInterceptors, HYRequestConfig } from './type'

class CommonRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
}

export default CommonRequest
