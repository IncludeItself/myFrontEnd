import {ref, unref} from "vue";

const isOpen = ref<Boolean>(false);

export function useJobDrawer() {
    const toggle=():void=>{
        isOpen.value=!unref(isOpen);
    };

    return {isOpen,toggle}
}
