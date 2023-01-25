<template>
  <n-popselect  v-if="getIsTopMenu">
    <NButton tertiary style="outline: 0px">
      <template #icon>
        <Icon size="30">
          <MenuSharp/>
        </Icon>
      </template>
    </NButton>
    <template #empty>
<!--      <n-space class="miniMenu">-->
        <n-scrollbar style="max-height: 100%;height: 80vh;width: 50vw;">


          <MenuCategoryItem v-for="menuItem in menus" :item="menuItem"
                            style="display: inline-block;width: auto"/>
        </n-scrollbar>
<!--      </n-space>-->

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
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import MenuCategoryItem from './MenuCategoryItem.vue';
import {MenuModeEnum, MenuTypeEnum} from "@/enums/menuEnum";





export default defineComponent({
  name: "MiniMenu",
  components: {Icon, MenuSharp,NButton, NCard, NSpace, NPopselect, NLayoutContent, NScrollbar, MenuCategoryItem},
  setup() {
    const {getIsTopMenu} = useMenuSetting();
    const permissionStore = usePermissionStore();
    const menus = permissionStore.getFlattedMenu;
    const {t} = useI18n();



    return {
      t,
      menus,
      getIsTopMenu,
    }

  }

});
</script>

<style lang="less" scoped>


.miniMenu {
  display: flex;
  z-index: 2;
  overflow: auto;
  height: 80vh;
  width: 50vw;
}

.empty {
  width: 0px;
  height: 0px;
}

//.scroll {
//  height: 900px;
//  width: 100%;
//}

</style>
