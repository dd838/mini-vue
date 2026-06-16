import { isObject } from "@vue/shared";
import { mutableHandlers, ReactiveFlags } from "./baseHandler";

// //用于记录我们代理后的结果 ，可以复用
const reactiveMap = new WeakMap();

export function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  //统一做判断，响应式对象必须是对象才行
  if (!isObject(target)) {
    return target;
  }

  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  //取缓存，如果有直接取走
  const exitsProxy = reactiveMap.get(target);
  if (exitsProxy) {
    return reactiveMap;
  }

  let proxy = new Proxy(target, mutableHandlers)
  //根据对象缓存代理后的结果
  reactiveMap.set(target, proxy);
  return proxy;
}



