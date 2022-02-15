interface IAccount {
  name: string
  password: string
}

interface IPhone {
  num: number
  code: number
}

interface ILoginResult {
  id: number
  name: string
  token: string
}

interface IDataType<T = any> {
  code: number
  data: T
}

export { IAccount }
export { IPhone }
export { ILoginResult }
export { IDataType }
