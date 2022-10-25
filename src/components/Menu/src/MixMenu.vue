<template>
  <n-space>
    <n-space vertical style="display: block;position: relative">

      <n-button v-for="a in 5" size="large" text style="margin: 15px;" @click="openDrawer">
        <template #icon>
          <IconWithText
              size="28px"
              icon="ion:layers-outline"
              text="我的电脑"
              text-size="2px"
          />
        </template>
      </n-button>

    </n-space>
    <div
        id="drawerHome"
        :style="getMenuStyle"
        style="
      position: relative;
      /*width: 100%;*/
      height: 100vh;
      /*border: 1px solid rgba(128, 128, 128, 0.2);*/
      margin-top: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
    >
      adsffffff

    </div>
  </n-space>

  <n-drawer
      :show="isOpen" to="#drawerHome" placement="left"
      :trap-focus="false"
      :block-scroll="false"
      style="
        position: absolute;
        top: 0;
        width: 200px;
        height: calc(100%);
        background-color: #fff;
        transition: all 0.2s;"
  >
    <n-drawer-content>
      <n-button @click="closeDrawer">
        aaaaaaaaabsdf
      </n-button>
      <span>asfewfefe</span>

    </n-drawer-content>
  </n-drawer>

</template>

<script lang="ts">
import {computed, CSSProperties, defineComponent, ref, unref} from "vue";
import {NButtonGroup, NButton, NSpace, NTooltip, NDrawer, NDrawerContent} from "naive-ui";
import Icon from "@/components/Icon/src/Icon.vue";
import IconWithText from "@/components/Icon/src/IconWithText.vue";
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";


export default defineComponent({
  name: "MixMenu",
  components: {IconWithText, Icon, NButtonGroup, NButton, NSpace, NTooltip, NDrawer, NDrawerContent},
  setup() {
    const {
      getMenuWidth
    } = useMenuSetting();
    const isOpen = ref<Boolean>(false);

    function openDrawer() {
      console.log("getMenuWidth", getMenuWidth);
      isOpen.value = true;
    }

    function closeDrawer() {
      isOpen.value = false;
    }

    const getMenuStyle = computed((): CSSProperties => {
      return {
        width: unref(isOpen) ? `${unref(getMenuWidth)}px` : 0,
      }

    });

    return {
      isOpen,
      openDrawer,
      closeDrawer,
      getMenuStyle
    };
  }
});
</script>

<style scoped>

</style>
