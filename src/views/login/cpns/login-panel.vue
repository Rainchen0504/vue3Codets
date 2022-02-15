<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span
            ><el-icon><user-filled /></el-icon>账号登录</span
          >
        </template>
        <!-- 组件account -->
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon><iphone /></el-icon>手机登录</span
          >
        </template>
        <!-- 组件phone -->
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
//引入图标
import { UserFilled } from '@element-plus/icons-vue'
import { Iphone } from '@element-plus/icons-vue'

import { ref } from 'vue'
//引入组件
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

//记住密码
const isKeepPassword = ref(true)
//account组件实例
const accountRef = ref<InstanceType<typeof LoginAccount>>()
//phone组件实例
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
//当前tab
const currentTab = ref<string>('account')

//点击登陆方法
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.accountLoginAction(isKeepPassword.value)
  } else {
    //调用了LoginPhone组件里面的loginAction方法
    phoneRef.value?.phoneLoginAction()
  }
}
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
