<template>
  <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { rules } from '../config/phone-config'
import { ref, reactive } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()

const formRef = ref<InstanceType<typeof ElForm>>()

const phone = reactive({
  num: '',
  code: ''
})

const phoneLoginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //登陆验证
      store.dispatch('login/phoneLoginAction', { ...phone })
    }
  })
}

defineExpose({
  phoneLoginAction
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
