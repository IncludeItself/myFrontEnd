<template>
<n-layout >
  <n-space block style="width: 100vw;height: 100vh" :theme="darkTheme">
    <AppThemeToggle class="themeToggle"></AppThemeToggle>
    <LoginForm/>


  </n-space>
</n-layout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import LoginForm from './LoginForm.vue';
import {NSpace,darkTheme,NLayout} from 'naive-ui';
import { AppThemeToggle} from "@/components/Application";

export default defineComponent({
  name: "Login",
  components: {LoginForm,NSpace,AppThemeToggle,NLayout},
  setup() {
    return {darkTheme}

  }

});
</script>

<style lang="less" scoped>

.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

</style>

