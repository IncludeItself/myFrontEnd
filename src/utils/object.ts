import {isArray, isObject} from "/@/utils/is";

export default function getObjectWithoutNull(obj:Object):Object{

  return Object.entries(obj).reduce((a,[k,v])=>{
    if(v==null || k=="pid" || v=='' || v==[] || k=="id" || k=="metaId" || k=="shown" || k=="type"){
      return a;
    }else if(isObject(v) || isArray(v)){
      a[k]=getObjectWithoutNull(v);
      return a;
    }else{
      a[k]=v;
      return a;
    }
  },isArray(obj)?[]:{});


}
