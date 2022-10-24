import {defHttp, myHttp} from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  // GetMenuList = '/getMenuList',
  GetMenuList = '/admin/menu/tree',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
  return myHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};


