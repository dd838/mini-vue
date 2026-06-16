import { track } from "./reactiveEffect";

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
}


//proxy 需要搭配reflect 使用
export const mutableHandlers: ProxyHandler<any> = {
  get(target, key, recevier) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    //当取值的时候  应该让响应式属性 和 effect 映射起来

    //依赖收集  todo...

    track(target, key);  //收集这个对象上的属性和effect关联再一起



    return Reflect.get(target, key, recevier);
  },
  set(target, key, value, recevier) {
    // 找到属性 让对应的effect重新执行

    //触发更新  todo...
    return Reflect.set(target, key, value, recevier);
  }
}