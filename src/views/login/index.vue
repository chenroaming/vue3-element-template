<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-title">vue3-element-template</div>
      <div class="login-form-main">
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" clearable>
              <template #append>
                <el-icon>
                  <UserFilled />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="form.pwd" show-password clearable>
              <template #append>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" :loading="isLoading" @click="handleSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Lock, UserFilled } from '@element-plus/icons'
export default {
  name: 'Login',
  components: {
    Lock,
    UserFilled
  },
  setup () {
    const isLoading = ref(false)
    const form = reactive({ userName: '', pwd: '' })
    const loginForm = ref(null)
    const rules = ref({
      userName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
      pwd: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }]
    })
    const handleSubmit = () => {
      isLoading.value = true
      loginForm.value.validate(valid => {
        isLoading.value = false
        console.log(valid)
        if (!valid) return false
      })
    }
    return {
      form,
      rules,
      loginForm,
      isLoading,
      handleSubmit
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  background-image: url("../../assets/login-background.jpg");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-form {
    width: 600px;
    height: 350px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &-title {
      width: 80%;
      margin: 15px 0;
      font-size: 20px;
      font-weight: bold;
    }
    &-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80%;
    }
  }
}
</style>
