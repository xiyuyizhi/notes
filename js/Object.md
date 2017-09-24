

- ### 枚举对象属性

*for....in*

> 列举obj的可枚举属性，包括自身和原型链上的

*object.keys()*

> 只列举对象本身的可枚举属性


- ### 创建对象的几种方式

*对象字面量*

```
    const pre='test'
    const obj= {
        "name":"luyun",
        [pre+'prop']:"wu shuang lian quan"
    }
```

*通过构造函数*

```
    const obj= new Object()
    const d = new Date()
```

*Object.create()*

>以指定的对象作为原型来创建对象

```
var Animal = {
  type: 'Invertebrates', // Default value of properties
  displayType: function() {  // Method which will display type of Animal
    console.log(this.type);
  }
};
var animal1 = Object.create(Animal);
//这样，animal1的原型就是Animal了
```

- ### 如何判断对象是否是空对象

```
    typeof {} == 'object'

    Object.keys({}).length===0

```

- ### 对象属性的描述符

属性的描述符分data描述符和访问描述符，对一个属性来说，只能存在一种描述符，configurable、enumerable是公共的。

```
    const users={
        a:'luyun'
    }
    Object.getOwnPropertyDescriptor( users, "a" );

    //数据描述符
    // {
    //      value: 2,
    //      writable: true,
    //      enumerable: true,
    //      configurable: true
    // }

```
> writeable 是否可以修改

> enumable 是否可枚举，出现在 for in 中

> configurable 是否可通过defineProperty()来修改描述符，为false时，属性不能删除

*Getter、Setter*

当你给一个属性定义getter、setter或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描
述符”相对）

```
 const users={
     'name':'luyun'
 }

Object.defineProperty(users,'kongfu',{
    get:function(){
        return '正十七'
    },
    enumerable:true
})

```
- ### 简单模拟基于数据劫持的数据绑定

思考：

1. 劫持的数据是用来绑定到模板上的 | {{ }} ng-bind

2. 怎么绑定，定义watcher监听表达式值的变化，渲染dom

3. 数据变了，怎么通知watcher更新模 | setter劫持

4. 谁来通知watcher | 发布订阅模式


首先封装Object.defineProperty监听属性的变化

```
function observe(data) {
    const keys = Object.keys(data)
    keys.forEach(key => {
        gs(data, key, data[key])
    })
}

//劫持数据
function gs(obj, key, val) {
    let originVal = val
    const subpub = new Subpub()
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            //这里应该确定订阅者是谁
            Subpub.target && subpub.addWatcher()
            return originVal
        },
        set(value) {
            originVal = value
            //订阅了当前属性的都要更新
            subpub.notice()
        }
    })
}

```

发布订阅，需要知道哪些地方用到了当前属性的值，在属性值变化时，要更新这些地方

```
function Subpub() {
    this.subList = [] //保存订阅某个属性的订阅者
}
Subpub.prototype.addSub = function (watcher) {
    this.subList.push(watcher)
}
//通知订阅者们，数据变化了，你们要各自行动了
Subpub.prototype.notice = function () {
    this.subList.forEach(item => {
        item.render()
    })
}

Subpub.prototype.addWatcher = function () {
    Subpub.target.addSubpub(this)
}
```

```
function Watcher(exp, fn) {
    Subpub.target = this
    this.exp = exp
    //监听的属性的初始值
    this.value = user[exp] //这里写死的user，应该是当前环境下的数据，比如angular中$scope
    this.fn = fn
    Subpub.target = null
}
Watcher.prototype.render = function () {
    const oldValue = this.value
    const newValue = user[this.exp]
    this.fn(newValue, oldValue)
}
Watcher.prototype.addSubpub = function (subpub) {
    subpub.addSub(this)
}

```

```
const user = {
    name: '初始的卢云',
    kongfu: '无'
}

observe(user)

//这里只是简单的打印新值
new Watcher('name', function (newVal,old) {
    console.log(old)
    console.log(newVal)
})
new Watcher('kongfu', function (newVal) {
    console.log(newVal)
})

user.name = "后来的卢云"
user.kongfu=['无双连拳','正十七', '无绝心法']

//设置name，kongfu后，会打印这些值
    初始的卢云
    后来的卢云
    [ '无双连拳', '正十七', '无绝心法' ]
```