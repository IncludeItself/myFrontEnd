<template>
  <n-button size="large" text style="margin: 15px;">
    <template #icon>
      <IconWithText
          size="35px"
          icon="ion:layers-outline"
          text="我的电脑"
          text-size="2px"
      />
    </template>

  </n-button>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Icon from '../Icon'
import {NSpace, NElement, NButton} from 'naive-ui'
import IconWithText from "@/components/Icon/src/IconWithText.vue";

export default defineComponent({
  components: {IconWithText, Icon, NSpace, NElement, NButton},
  name: "VerticalButton",
  setup() {
    const buttonRef = ref();

    function handleClick() {
      console.log("buttonRef", buttonRef);
    }

    return {
      buttonRef,
      handleClick
    };
  }
});
</script>

<style lang="less" scoped>

</style>
