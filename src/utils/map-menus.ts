import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //require.context是一个webpack的API，该函数可以获取一个特定的上下文，可以实现自动化导入
  //应用场景：在Vue写的项目中,把路由通过不同的功能划分成不同的模块,在index.js中一个个导入,但是如果项目变大了之后,每次手动import会显得有些力不从心,这里可以使用require.context函数遍历modules文件夹的所有文件一次性导入到index.js中
  //该函数接收三个参数，分别是读取文件的路径、是否遍历文件的子目录、匹配文件的正则
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  //根据菜单获取需要添加的routes
  //根据userMenus的数据结构
  //当type为1时说明有子类 children -> type为1
  //当type为2时无子类 url-> toute
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
