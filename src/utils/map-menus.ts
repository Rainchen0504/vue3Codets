import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //第一步：先加载默认所有的routes

  const allRoutes: RouteRecordRaw[] = []
  //require.context是一个webpack的API，该函数可以获取一个特定的上下文，可以实现自动化导入
  //应用场景：在Vue写的项目中,把路由通过不同的功能划分成不同的模块,在index.js中一个个导入,但是如果项目变大了之后,每次手动import会显得有些力不从心,这里可以使用require.context函数遍历modules文件夹的所有文件一次性导入到index.js中
  //该函数接收三个参数，分别是读取文件的路径、是否遍历文件的子目录、匹配文件的正则
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    //key可以拿到基于router/main目录下的所有路由地址
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  //第二步：根据菜单筛选需要添加的routes

  //根据userMenus的数据结构
  //当type为1时说明有子类 children -> type为1
  //当type为2时无子类 url-> toute
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
//获取默认展开菜单的数据
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      //如果类型为1时，即有子菜单的情况下，继续递归扁平化菜单
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
      //当没有子菜单的情况下，如果当前链接和遍历的菜单url相同时，返回菜单对象
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
