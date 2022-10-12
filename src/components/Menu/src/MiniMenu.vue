<template>

  <NSpace class="miniMenuWrapper" vertical>

    <NButton tertiary class="miniMenuBtn">
      <template #icon>
        <Icon size="35">
          <MenuSharp/>
        </Icon>
      </template>
    </NButton>
    <NCard class="miniMenu" embedded>
      <n-space @click="handleClick">
        <MenuCategoryItem v-for="menuItem in menus" :item="menuItem"/>
<!--        <MenuCategoryItem  :item="menus[4]"/>-->
      </n-space>

      <span>bot</span>

    </NCard>

  </NSpace>


</template>

<script>
import {defineComponent} from 'vue';
import {NButton, NCard, NSpace} from 'naive-ui';
import {Icon} from "@vicons/utils";
import {MenuSharp} from '@vicons/ionicons5';
import {useI18n} from "@/hooks/web/useI18n";
import {usePermissionStore} from "@/store/modules/permission";
import MenuCategoryItem from './MenuCategoryItem.vue';

const permissionStore = usePermissionStore();
const {t} = useI18n();

export default defineComponent({
  name: "MiniMenu",
  components: {Icon, MenuSharp, NButton, NCard, NSpace, MenuCategoryItem},
  setup() {
    const menus = permissionStore.getFlattedRoutes;
    const handleClick=(a)=>{
      console.log("a",a);
    };
    // console.log("menus",menus);
    return {t,
      menus,
      handleClick
    }

  }

});
</script>

<style lang="less" scoped>

.miniMenuWrapper {
  position: relative;
  float: left;
  display: block;

  .miniMenuBtn {
    z-index: 3;
  }

  .miniMenu {
    display: none;
  }

  &:hover {
    .miniMenu {
      display: block;
      position: fixed;
      width: auto;
      z-index: 2;
      overflow: auto;
      max-height: 90vh;
      max-width: 80vw;
    }
  }

}

</style>
