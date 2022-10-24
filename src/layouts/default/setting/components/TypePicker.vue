<template>
  <div class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <n-tooltip placement="bottom">
        <template #trigger>
        <div
          @click="handler(item)"
          :class="[
            'prefixCls__item',
            `prefixCls__item--${item.type}`,
            {
              ['prefixCls__item--active']: def === item.type,
            },
          ]"
        >
          <div class="mix-sidebar"></div>
        </div>
        </template>
        {{item.title}}
      </n-tooltip>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { NTooltip } from 'naive-ui';
  // import { useDesign } from '/@/hooks/web/useDesign';

  import { menuTypeList } from '../enum';
  export default defineComponent({
    name: 'MenuTypePicker',
    components: { NTooltip },
    props: {
      menuTypeList: {
        type: Array as PropType<typeof menuTypeList>,
        defualt: () => [],
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({}),
      },
      def: {
        type: String,
        default: '',
      },
    },
    setup() {
      // const { prefixCls } = useDesign('setting-menu-type-picker');

      return {
        // prefixCls,
      };
    },
  });
</script>
<style lang="less" scoped>
  //@prefix-cls: ~'@{namespace}-setting-menu-type-picker';

  .prefixCls{
    display: flex;

    &__item {
      position: relative;
      width: 56px;
      height: 48px;
      margin-right: 14px;
      overflow: hidden;
      cursor: pointer;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--sidebar,
      &--light {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--mix {
        &::before {
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--top-menu {
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--dark {
        background-color: #273352;
      }

      &--mix-sidebar {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 25%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        .mix-sidebar {
          position: absolute;
          left: 25%;
          width: 15%;
          height: 100%;
          background-color: #fff;
        }
      }

      &:hover,
      &--active {
        padding: 12px;
        border: 2px solid #ffb9b9;
        border: 2px solid;

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
