//封装localstorage本地存储
class LocalCache {
  //存储账号密码
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  //获取本地存储
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  //删除存储
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  //清空存储
  clearCache() {
    window.localStorage.clear()
  }
}
//导出这个实例对象
export default new LocalCache()
