<template>
  <n-popselect>
    <NButton tertiary>
      <template #icon>
        <Icon size="35">
          <MenuSharp/>
        </Icon>
      </template>
    </NButton>
    <template #empty>
      <n-space class="miniMenu">
        <n-scrollbar style="max-height: 90vh;display: flex;position: relative;overflow: visible">


          <MenuCategoryItem v-for="menuItem in menus" :item="menuItem"
                            style="display: inline-block;width: auto"/>
        </n-scrollbar>
      </n-space>

    </template>
  </n-popselect>

</template>
<script>
import {defineComponent} from 'vue';
import {NButton, NCard, NSpace, NPopselect, NLayoutContent, NScrollbar} from 'naive-ui';
import {Icon} from "@vicons/utils";
import {MenuSharp} from '@vicons/ionicons5';
import {useI18n} from "@/hooks/web/useI18n";
import {usePermissionStore} from "@/store/modules/permission";
import MenuCategoryItem from './MenuCategoryItem.vue';

const permissionStore = usePermissionStore();
const {t} = useI18n();

export default defineComponent({
  name: "MiniMenu",
  components: {Icon, MenuSharp, NButton, NCard, NSpace, NPopselect, NLayoutContent, NScrollbar, MenuCategoryItem},
  setup() {
    const menus = permissionStore.getFlattedMenu;


    return {
      t,
      menus,
    }

  }

});
</script>

<style lang="less" scoped>


.miniMenu {
  display: flex;
  z-index: 2;
  overflow: auto;
  height: 90vh;
  width: 80vw;
}

.empty {
  width: 0px;
  height: 0px;
}

.scroll {
  height: 900px;
  width: 100%;
}

</style>
