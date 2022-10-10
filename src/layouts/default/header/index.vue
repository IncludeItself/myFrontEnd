<template>


  <n-layout-header class="layout-header" position="absolute">

    <MiniMenu class="miniMenu"/>
    <AppLocalePicker class="locale-picker"/>
    <AppThemeToggle class="themeToggle"></AppThemeToggle>


  </n-layout-header>


</template>

<script>
import {computed, defineComponent} from 'vue';
import {AppLocalePicker, AppThemeToggle} from "@/components/Application";
import {MiniMenu} from '@/components/Menu';
import {NLayoutHeader, NButton} from 'naive-ui';
// import {useHeaderSetting} from "@/hooks/setting/useHeaderSetting.js";

export default defineComponent({
  name: "LayoutHeader",
  components: {AppThemeToggle, AppLocalePicker, NLayoutHeader, MiniMenu, NButton},
  setup() {
    // const {getFixed}=useHeaderSetting();
    // const fixedMenu= computed(()=>getFixed?'absolute':'static');

    // console.log("fixedMenu",fixedMenu);

    return {
      // fixedMenu
    }

  }

});
</script>

<style lang="less">
.layout-header {
  position: relative;
  height: 35px;
}


.miniMenu {
  position: relative;
  float: left;
  display: inline-block;

}

.themeToggle {
  //position: relative;
  float: right;
  //display: inline-block;
  //line-height: 35px;
  //text-align: right;
  //vertical-align: middle;
}

.locale-picker {
  //position: relative;
  float: right;
  //display: block;
  ////line-height: 35px;
  //margin: auto 5px;
  //width: auto;
}


</style>



