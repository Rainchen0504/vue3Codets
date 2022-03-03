import hyRequest from '../index'
import { IAccount, IPhone, ILoginResult } from './type'
import { IDataType } from '../types'
//枚举类型定义接口
enum LoginAPI {
  AccountLogin = '/login',
  //没有手机验证的接口
  PhoneLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
//导出方法二
// export const accountLoginRequest = function accountLoginRequest(account: IAccount) {
//   return hyRequest.post({
//     url: LoginAPI.AccountLogin,
//     data: account
//   })
// }

function phoneLoginRequest(phone: IPhone) {
  return hyRequest.post({
    url: LoginAPI.PhoneLogin,
    data: phone
  })
}

function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

export { accountLoginRequest, phoneLoginRequest, requestUserInfoById, requestUserMenusByRoleId }
