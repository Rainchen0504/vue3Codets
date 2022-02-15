<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

const store = useStore()

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const accountLoginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    //校验是否符合rules定义的规则
    if (valid) {
      //1、判断是否记住密码
      if (isKeepPassword) {
        //本地缓存
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      //2、然后执行登陆验证,使用vuex，把账号密码传过去
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({
  accountLoginAction
})
</script>

<style scoped></style>
