import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

// 这是啥
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    //虽然封装方法相同，但是不同页面的值需要进行区分
    return {
      //user页面列表数据
      userList: [],
      //user页面列表数据总数
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //获取pageUrl
      const pageName = payload.pageName
      console.log('47', pageName)

      const pageUrl = `/${pageName}/list`
      console.log('50', pageUrl)

      // 对页面发送请求，拿到表格列表数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 2.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      //表格数据对象数组
      commit(`change${changePageName}List`, list)
      //总数
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}

export default systemModule
