import { ILoginState } from './login/types'

//vuex根目录下state中的数据类型
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

//
export type IStoreType = IRootState & IRootWithModule
