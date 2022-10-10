import { genMessage } from '../helper';
import {zhCN as naiveLocale} from 'naive-ui';
import {dateZhCN as dateLocale} from "naive-ui";

const modules :Record<string, Record<string, any>>  = import.meta.glob('./zh-CN/**/*.ts',{eager:true});
export default {
  message: {
    ...genMessage(modules, 'zh-CN')
  },
  naiveLocale,
  dateLocale
};
