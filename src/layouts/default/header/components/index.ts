import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import FullScreen from './FullScreenBtn.vue';

export const UserDropdown = createAsyncComponent(() => import('./user-dropdown/index.vue'), {
  loading: true,
});

export const MultipleTabs = createAsyncComponent(() => import('./tabs/index.vue'), {
  loading: true,
});

// export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'));
//
// export const Notify = createAsyncComponent(() => import('./notify/index.vue'));
//
// export const ErrorAction = createAsyncComponent(() => import('./ErrorAction.vue'));
//
export { FullScreen };
