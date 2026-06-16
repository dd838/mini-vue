const person = {
  name: 'zhangsan',
  get aliasName() {
    return this.aliasName + 'handsome';
  },
};

let proxy = new proxy(person, {
  get(target, key, receiver) {  //receiver是代理对象
    return target[key];
    //return Reflect.get(target, key, receiver);  //（receiver[key]） //person.name 不会触发get
  },
});

console.log(person.aliasName);
