import { activeEffect } from "./effect";

export function track(target, key) {
  //activeEffect 有这个属性说明这个key是在effect中访问的，没有则说明是在effect之外访问的，不用进行收集
  if (activeEffect) {
    console.log(key, activeEffect);

  }
}