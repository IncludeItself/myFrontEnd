import { genMessage } from '../helper';
import {enUS as naiveLocale} from 'naive-ui';
import {dateEnUS as dateLocale} from "naive-ui";

const modules :Record<string, Record<string, any>> = import.meta.glob('./en/**/*.ts',{eager:true});
export default {
  message: {
    ...genMessage(modules, 'en')
  },
  naiveLocale,
  dateLocale
};
