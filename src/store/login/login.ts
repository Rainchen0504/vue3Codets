import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'
import localCache from '@/utils/cache'

import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

import {
  //账号登陆的请求
  accountLoginRequest,
  //获取用户信息的请求
  requestUserInfoById,
  //获取角色的菜单
  requestUserMenusByRoleId
} from '@/service/login/login'

import { IAccount, IPhone } from '@/service/login/type'

//Module类型需要两个范型参数，一个是模块state的类型，另一个是根组件state的类型
const loginMoule: Module<ILoginState, IRootState> = {
  //模块命名空间
  namespaced: true,
  state() {
    return {
      //token
      token: '',
      //请求回来的用户信息
      userInfo: {},
      //用户菜单
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    // 修改token
    changeToken(state, token: string) {
      state.token = token
    },
    // 修改用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //这里必须保证组件名称和后台返回的名称保持一致
      console.log(`在这里动态注册路由`)
      const routes = mapMenusToRoutes(userMenus)

      //把router和routes拼在一起
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    //账号登陆请求过程，参数有上下文对象
    async accountLoginAction({ commit }, payload: IAccount) {
      //1.实现登陆逻辑

      //避免出现回调地狱，使用async.await
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      console.log('73基础路由', userMenusResult)

      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳转到首页
      router.push('/main')
    },

    //手机登陆流程
    phoneLoginAction({ commit }, payload: IPhone) {
      console.log('执行phone登陆操作,发送请求', payload)
      commit('changeToken', 'woshinichenge')
    },

    //初始化请求方法
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginMoule
