import {defHttp, myHttp} from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
import {AppRouteRecordRaw} from "@/router/types";
import {ContentTypeEnum} from "@/enums/httpEnum";

enum Api {
  // GetMenuList = '/getMenuList',
  GetMenuList = '/admin/menu/tree',
  UpdateMenu='/admin/menu/update',
  AddMenu='/admin/menu/save'
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
  return myHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const updateMenu = (data) => {
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
  return myHttp.post({ url: Api.UpdateMenu,data});
};

export const addMenu = (data) => {
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
  return myHttp.post({ url: Api.AddMenu,data });
};

