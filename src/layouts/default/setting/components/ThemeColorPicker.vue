<template>
  <div class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
          @click="handleClick(color)"
          class="prefixCls__item"
          :class="{'prefixCls__item--active': def === color}"
          :style="{ background: color }"
      >
        <CheckmarkOutline />
      </span>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { CheckmarkOutline } from '@vicons/ionicons5';

  // import { useDesign } from '/@/hooks/web/useDesign';

  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { CheckmarkOutline },
    props: {
      colorList: {
        type: Array as PropType<string[]>,
        defualt: [],
      },
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      def: {
        type: String,
      },
    },
    setup(props) {
      // const { prefixCls } = useDesign('setting-theme-picker');

      function handleClick(color: string) {
        props.event && baseHandler(props.event, color);
      }
      return {
        // prefixCls,
        handleClick,
      };
    },
  });
</script>
<style lang="less">
  //@prefix-cls: ~'@{namespace}-setting-theme-picker';

  .prefixCls{
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {
        //border: 1px solid lighten(@primary-color, 10%);

        svg {
          display: inline-block;
          margin: 0 0 3px 3px;
          font-size: 12px;
          //fill: @white !important;
        }
      }
    }
  }
</style>
