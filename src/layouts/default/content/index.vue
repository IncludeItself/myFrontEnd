<template>
  <n-layout-content class="layout-content">
    <div class="layout-content-main">
      <div class="main-view">
<!--        <div v-for="a in 1000">-->
<!--          <span>{{a}}This is mainview!!This is mainview!!This is mainview!!This is mainview!!{{a}}</span>-->
<!--        </div>-->

        <!--            <MainView />-->
        <router-view/>
      </div>
    </div>
  </n-layout-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutContent,NSpace} from 'naive-ui';

export default defineComponent({
  name: "LayoutContent",
  components: {NLayoutContent,NSpace},
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.layout-content {
  flex: auto;
  flex-direction: column;
  height: 100vh;
  padding-top: 35px;

  .layout-content-main {
    margin: 0 10px 10px;
    position: relative;
    //padding-top: 64px;
  }
}




</style>
