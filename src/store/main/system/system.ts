import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

// 这是啥
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  getters: {},
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log('27', payload)

      // 1.对页面发送请求，拿到表格列表数据
      const pageResult = await getPageListData(payload.pageUrl, payload.queryInfo)

      // 2.将数据存储到state中
      const { list, totalCount } = pageResult.data
      //表格数据对象数组
      commit('changeUserList', list)
      //总数
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
