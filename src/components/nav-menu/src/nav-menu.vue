<template>
  <!-- 导航菜单组件 -->
  <div class="nav-menu">
    <div class="logo">
      <!-- 在template模板中使用别名的语法是～@ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="props.collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 动态参数包括：默认激活菜单id；水平伸缩菜单属性 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 标题 -->
            <template #title>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单里面的子类 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- type不同的菜单，比如没有子类的 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menus'

const store = useStore()
//登陆后存在vuex里的用户菜单
const userMenus = computed(() => store.state.login.userMenus)

const props = defineProps({
  //是否水平折叠收起菜单
  collapse: {
    type: Boolean,
    default: false
  }
})

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

//默认打开的菜单，把菜单和页面路由联系起来。
const currentPath = route.path
const menu = pathMapToMenu(userMenus.value, currentPath)
const defaultValue = ref(menu.id + '')

//点击叶子结点触发路由跳转
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    //默认左对齐
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

// css伪类，匹配不符合一组选择器的元素（反选伪类）
.el-menu-vertical:not(.el-menu-collapse) {
  width: 100%;
  height: calc(100%-48px);
}
</style>
