import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: '晨哥',
      age: 25
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    //登陆的请求信息、获得的数据、发送其他请求、拿到用户菜单等操作都放到vuex中
    login
  }
})

//初始化就调用该方法，验证当前登陆状态，有没有token
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
