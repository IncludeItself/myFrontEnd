<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="username" :label="t('sys.login.userName')">
      <n-input v-model:value="model.username" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" :label="t('sys.login.password')">
      <n-input v-model:value="model.password" @keydown.enter.prevent />
    </n-form-item>
    <n-button
        type="success" size="large" block @click="handleLogin" :loading="loading"
    >
      {{ t('sys.login.loginButton') }}
    </n-button>
  </n-form>
  {{t('sys.login.loginSuccessTitle')}}
  {{model}}
</template>
<script lang="ts" setup>
  import {useI18n} from "@/hooks/web/useI18n";
  import {ref} from "vue";
  import {FormInst, FormRules,NInput,NForm,NFormItem,NButton} from "naive-ui";
  import {useUserStore} from "@/store/modules/user";
  import {useFormValid} from './useLogin';
  import {useMessage} from "@/store/modules/message";
  interface LoginData{
    username:string|null,
    password:string|null,
  };
  const userStore=useUserStore();
  const notification=useMessage();
  const {t}=useI18n();
  const loading = ref(false);
  const formRef = ref<FormInst | null>(null);
  const {validForm}=useFormValid(formRef);
  const model=ref<LoginData>({
    username:null,
    password:null
  });
  const rules: FormRules ={
    username:[
      {
        required:true,
        trigger: ['input', 'blur'],
        message:t('sys.login.userName'),

      }
    ],
    password:[
      {
        required:true,
        message:t('sys.login.password'),
      }
    ]
  };


  async function handleLogin() {
    const errors = await validForm();
    if (errors) {
      notification.error({content:errors})
      return;
    }
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: model.value.password as string,
        username: model.value.username as string,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          content: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
      });
    } finally {
      loading.value = false;
    }
  }
</script>
