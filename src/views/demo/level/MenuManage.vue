<template>
  <n-space>
    <n-tree
        style="width: 40vw"
        :data="backMenuList"
        :render-label="renderLabel"
        key-field="id"
        draggable
        :on-update:selected-keys="handleClick"
    />
    <n-space vertical>
      <n-button-group>
        <n-button @click="handleEdit" :disabled="editDisabled">修改</n-button>
        <n-button>删除</n-button>
        <n-button @click="handleSave" :disabled="saveDisabled">保存</n-button>
        <n-button @click="handleCancel" :disabled="cancelDisabled">取消</n-button>
      </n-button-group>


      <n-form :model="formValue" label-placement="left" :disabled="formDisabled">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="formValue.name" placeholder="输入名称"></n-input>
        </n-form-item>
        <n-form-item label="Path" path="path">
          <n-input v-model:value="formValue.path" placeholder="输入path"></n-input>
        </n-form-item>
        <n-form-item label="Redirect" path="redirect">
          <n-input v-model:value="formValue.redirect" placeholder="输入redirect"></n-input>
        </n-form-item>
        <n-form-item label="组件" path="component">
          <n-input v-model:value="formValue.component" placeholder="输入component"></n-input>
        </n-form-item>
        <n-form-item label="角色" path="roles">
          <n-input v-model:value="formValue.roles" placeholder="输入roles"></n-input>
        </n-form-item>
        <n-form-item label="上一级菜单" path="pid">
          <n-tree-select v-model:value="formValue.pid" :options="backMenuList" label-field="name" key-field="id">
          </n-tree-select>
        </n-form-item>


        <n-form-item label="标题" path="meta.title">
          <n-input v-model:value="metaObj.title" placeholder="输入标题"></n-input>
        </n-form-item>
        <n-form-item label="图标" path="meta.icon">
          <n-input v-model:value="metaObj.icon" placeholder="输入图标"></n-input>
        </n-form-item>

        <n-form-item label="Meta">
            <n-space vertical item-style="display: flex;">
              <n-checkbox v-model:checked="metaObj.hideChildrenInMenu" value="hideChildrenInMenu"  label="hideChildrenInMenu"/>
              <n-checkbox v-model:checked="metaObj.hideMenu" value="hideMenu" label="hideMenu"/>
              <n-checkbox v-model:checked="metaObj.hideBreadcrumb" value="hideBreadcrumb" label="hideBreadcrumb"/>
              <n-checkbox v-model:checked="metaObj.ignoreKeepAlive" value="ignoreKeepAlive" label="ignoreKeepAlive"/>
              <n-checkbox v-model:checked="metaObj.showMenu" value="showMenu" label="showMenu"/>
            </n-space>
        </n-form-item>


      </n-form>

    </n-space>

    {{ formValue }}

    <br/>
    {{ metaObj }}

  </n-space>

</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, ref, unref} from 'vue';
// import {usePermissionStore} from "@/store/modules/permission";
import {
  NCheckboxGroup,
  NCheckbox,
  NTree,
  TreeOption,
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NTreeSelect,
  NButton,
  NButtonGroup
} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";
import {AppRouteRecordRaw} from "@/router/types";
import {addMenu, getMenuList, updateMenu} from "@/api/sys/menu";
import {findNode} from "@/utils/helper/treeHelper";
import {cloneDeep, omit} from "lodash-es";

interface FormState {
  id?: number,
  pid: number,
  name: string,
  path: string,
  roles: string,
  redirect: string,
  component: string,
  metajson: string,
  meta: {
    title: '',
  }

}

interface RouteMeta{
  title:string,
  icon:string,
  hideChildrenInMenu:boolean,
  hideMenu:boolean,
  hideBreadcrumb:boolean,
  ignoreKeepAlive:boolean,
  showMenu:boolean
}

export default defineComponent({
  name: 'MenuManage',
  components: {NCheckboxGroup, NCheckbox, NTree, NSpace, NForm, NFormItem, NInput, NTreeSelect, NButton, NButtonGroup},
  setup() {
    const {t} = useI18n();
    // const permissionStore = usePermissionStore();
    // const backMenuList = computed(() => permissionStore.getBackMenuList);
    const backMenuList = ref<AppRouteRecordRaw[]>();

    const formDisabled = ref<boolean>(true);
    const editDisabled = ref<boolean>(false);
    const cancelDisabled = ref<boolean>(true);
    const saveDisabled = ref<boolean>(true);

    const metaObj = ref<RouteMeta>({
      title:'',
      icon:'',
      hideChildrenInMenu:false,
      hideMenu:false,
      hideBreadcrumb:false,
      ignoreKeepAlive:false,
      showMenu:false
    });

    async function getBackMenuList() {
      backMenuList.value = await getMenuList() as AppRouteRecordRaw[];
      console.log("backMenuList.toRaw",backMenuList.value);
    }

    onMounted(() => {
      getBackMenuList();
    });


    const renderLabel = ({option}: { option: TreeOption }) => {
      return t((option.meta as any).title);
    };
    const formValue = ref<FormState>({
      pid: 0,
      name: '',
      path: '',
      roles: '',
      redirect: '',
      component: '',
      metajson: '',
      meta: {
        title: '',
      }
    });

    function showInfobyId(id: number | undefined) {
      if (id == undefined) {
        formValue.value = {
          pid: 0,
          name: '',
          path: '',
          roles: '',
          redirect: '',
          component: '',
          metajson: '',
          meta: {
            title: '',
          }
        };
      }
      else {
        formValue.value = findNode(unref(backMenuList), (node) => node.id === id) as any;
        metaObj.value={
          title:'',
          icon:'',
          hideChildrenInMenu:false,
          hideMenu:false,
          hideBreadcrumb:false,
          ignoreKeepAlive:false,
          showMenu:false
        };
        Object.keys(metaObj.value).forEach((key)=>{
          if(formValue.value.meta[key]){
            metaObj.value[key]=formValue.value.meta[key]
          }
        });
      }

    }

    function handleClick(a) {
      if (a.length == 0) return;
      if (a[0] == formValue.value.id) return;
      showInfobyId(a[0]);
      formDisabled.value = true;
      editDisabled.value = false;
      cancelDisabled.value = true;
      saveDisabled.value = true;
    }

    function handleEdit() {
      formDisabled.value = false;
      editDisabled.value = true;
      cancelDisabled.value = false;
      saveDisabled.value = false;
    }

    function handleCancel() {
      showInfobyId(formValue.value.id);
      formDisabled.value = true;
      editDisabled.value = false;
      cancelDisabled.value = true;
      saveDisabled.value = true;
    }

    function handleSave() {
      const formObj = omit(omit(cloneDeep(formValue.value), "meta"), "children");
      formObj.metajson=JSON.stringify(metaObj.value);
      console.log("formValue", formObj);
      if (formValue.value.id !== undefined && formValue.value.id != null) {
        updateMenu(formObj);
      } else {
        addMenu(formObj);
      }
      getBackMenuList();
      formDisabled.value = true;
      editDisabled.value = false;
      cancelDisabled.value = false;
      saveDisabled.value = true;
    }

    return {
      backMenuList,
      renderLabel,
      formValue,
      handleClick,
      formDisabled,
      handleEdit,
      editDisabled,
      cancelDisabled,
      handleCancel,
      handleSave,
      saveDisabled,
      metaObj
    }
  }
});
</script>
