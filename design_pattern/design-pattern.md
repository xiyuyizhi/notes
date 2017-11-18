

- ### [单例模式](#user-content-单例模式-1)

- ### [策略模式](#user-content-策略模式-1)

- ### [代理模式](#user-content-代理模式-1)

- ### [观察者和发布订阅模式](#user-content-观察者和发布订阅模式-1)

- ### [命令模式](#user-content-命令模式-1)

- ### [享元模式](#user-content-享元模式-1)

- ### [责任链模式](#user-content-责任链模式-1)

- ### [装饰者模式](#user-content-装饰者模式-1)

- ### [状态模式](#user-content-状态模式-1)

*写代码容易，写出优雅的代码难，写易于维护的、容易扩展的、结构清晰的代码应该是每位开发者努力的目标，而学习设计模式，合理的的使用能让我们离这个目标更进一步。最近看了《Javascript设计模式与开发实践》这本书,一言以蔽之，好啊，真不错的一本书，在这里总结一下书中介绍的主要的在JavaScript中我们可以用到的一些设计模式。设计模式的思想是值得反复咀嚼、思考的，在以后的业务实现中，应该结合这些思想，加以合理的使用*

## 单例模式

> 单例模式保证类只有一个实例，并提供一个访问它的全局访问点

js中实现

```
  function getSingle(fn){
    let result

    return function (){
        return result || (result=fn.apply(this,arguments))
    }

  }
```

## 策略模式

> 解决一个问题的多个方法，将每种方法独立封装起来，相互可以替换

**一个基于策略模式的程序至少由两部分组成，一个是一组策略类，策略类封装了具体的算法，并负责具体的计算过程，一个是环境类，环境类接受客户的请求，随后把请求委托给某个策略类**

策略模式的一个使用场景：表单验证，将不同验证规则封装成一组策略，避免了多重条件判断语句

一句经典的话:*在函数作为一等对象的语言中，策略模式是隐性的，策略就是值为函数的变量*

例子:

```
    const S = (salary)=>{
        return salary * 4
    }
    const A = (salary)=>{
        return salary * 3
    }
    const B = (salary)=>{
        return salary * 2
    }

    const calculate = (fun,salary)=>{
        return fun(salary)
    }
    calculate(S,1000)

```

## 代理模式

> 代理模式为一个对象提供一个代用品或占位符，以便控制对它的访问

不直接和本体进行交互，而是在中间加入一层代理，代理来处理一些不需要本体做的操作

```

var myImage=function(){
    var imgNode=document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setImg(src){
            imgNode.src=src
        }
    }
}

var proxyImg=function(){
    var img =new Image()
    img.onload=function(){
        myImage.setSrc(this.src)
    }
    return {
        setImg(src){
            myImage.setSrc(‘loading.png’)
            img.src=src      
        }
    }
}

```

代理的意义

对单一职责原则的一种表现，单一职责原则指的是，一个函数或类应该只负责一件事，如何一个函数职责太多，等于把这些职责耦合在了一起，当一部分需要改动时，很有可能就影响到了函数的其他部分

## 观察者和发布订阅模式

观察者和发布、订阅模式使程序的两部分不必紧密耦合在一起，而是通过通知的方式来通信

- 观察者模式

> 一个对象维持一系列依赖于它的对象，当对象状态发生改变时主动通知这些依赖对象

这里注意是对象直接管理着依赖列表，这点也是观察者模式和发布、订阅模式的主要区别

```
class Subject{
        constructor(){
            this.observers=[]
        }
        add(observer){
            this.observers.push(observer)
        }
        notify(data){
            for(let observer of this.observers){
                observer.update(data)
            }
        }
    }

    class Observer{
        update(){

        }
    }
```

观察者模式的缺点是对象必须自己维护一个观察者列表，当对象状态有更新时，直接调用其他对象的方法，所以，在使用中，我们一般采用一种变形方式，即发布订阅模式

- 发布订阅模式

该模式在主题和观察者之间加入一层管道，使得主题和观察者不直接交互，发布者将内容发布到管道，订阅者订阅管道里的内容，目的是避免订阅者和发布者之间产生依赖关系

```
    class Pubsub{

        constuctor(){
            this.pubsub={}
            this.subId=-1
        }

        publish(topic,data){
            if(!this.pubsub[topic]) return
            const subs=this.pubsub[topic]
            const len=subs.length
            while(len--){
                subs[len].update(topic,data)
            }
        }

        /**
        *  topic {string}
        *  update {function}
        */
        subscribe(topic,update){
            !this.pubsub[topic] && (this.pubsub[topic]=[])
            this.subId++
            this.pubsub[topic].push({
                token:this.subId,
                update
            })
        }

        unsubscribe(token){
            for(let topic in this.pubsub){
                if(this.pubsub.hasOwnProperty(topic)){
                    const current=this.pubsub[topic]
                    for(let i=0,j=current.length;i<j;i++){
                        if(current[i].token==token){
                            current.splice(i,1)
                            return token
                        }
                    }
                }
            }
            return this
        }

    }

```


发布订阅模式是在框架设计中经常使用的一种设计模式，angularjs中的自定义事件，Rxjs,状态管理的redux等都能看到它的身影

## 命令模式

> 命令模式的命令指的是一个执行某些特定事情的指令

命令模式最常见的使用场景是：有时候需要向某些对象发送请求，但是不知道请求的接受者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，是使得请求发送者和接受者消除彼此之间的耦合关系

**命令模式的由来，其实是回调函数的一个面向对象的替代品**

一句话来说，命令模式就是用一个函数来包裹一个具体的实现，这个函数统一定义了一个execute方法来调用具体的实现方法，而请求者只要和这个命令函数交流就行


## 享元模式

> 享元模式顾名思义，共享一些单元，用于优化重复、缓慢及数据共享效率较低的代码

应用：一是用于数据层，处理内存中保存的大量相似对象的共享数据，二是用于DOM层，事件代理

*在享元模式中，有个有关两个状态的概念-内部和外部*

内部状态存储于对象内部，可以被一些对象共享，独立于具体的场景，通常不会变

外部状态根据场景而变化

**剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组成一个完整的对象**

使用享元模式的几个步骤：

以书中文件上传的例子描述

1. 剥离外部状态

```
 class Upload{

    constructor(type){
        this.uploadType=type
    }

    delFile(id){
        uploadManager.setExternalState(id,this) //这里就是组装外部状态来使共享对象变成一个具体的对象
        if(this.fileSize<3000){
            //直接删除
            return
        }
        //弹窗询问确认删除？
    }

 }

```

2. 使用工厂进行对象实例化

```
    var UploadFactory=(function(){
        const flyWeightObjs={}
        return {
            create(uploadType){
                if(flyWeightObjs[uploadType]){
                    return flyWeightObjs[uploadType]
                }
                return flyWeightObjs[uploadType]=new Upload(uoloadType)
            }
        }
    })()
```

3. 使用管理器封装外部状态

```
var uploadManager=(function(){
    var uploadDatabase={}
    return {
        add(id,uploadType,fileSize,fileName){
            var flyWeightObj=UploadFactory.create(uploadType) //那个被共享的对象
            //创建结点...
            //删除操作
            dom.onclick=function(){
                flyWeightObj.delFile(id) //这个共享在步骤1中会被组合，可以看到，只有在删除操作的时候，我们才需要那些外部状态
            }
            uploadDatabase[id]={
                fileName,
                fileSize,
                dom
            }
            return flyWeightObj
        }，
        setExternalState(id,flyWeight){
            var externalState=uploadDatabase[id]
            Object.assign(flyWeight,externalState)
        }
    }
})()
```

## 责任链模式

> 将一个请求以此传递给多个函数，若请求符合当前函数要求，则当前函数处理，否则，传给下一个

**很好很强大**

责任链模式可以很好的避免大量的if,else if,else


```

if (Function.prototype.chainAfter) {
    throw new Error('the chainAfter method already exist')
} else {
    Function.prototype.chainAfter = function (fn) {
        return (...args) => {
            const ret = this.apply(this, [...args, () => {
                return fn && fn.apply(this, args)
            }])
            if (ret === 'NEXT') {
                return fn && fn.apply(this, args)
            }
            return ret
        }
    }
}

/**
 * example
 * class Test{
 *  
 *     test(...args){
 *            alert('test')
 *            return 'NEXT'
 *     }
 * 
 *     test1(...args){
 * 
 *            setTimeout(()=>{
 *                  alert('test1')
 *                  args.pop()()
 *            })   
 *     }
 * 
 *     test2(...args){
 *            alert('test2')
 *     }
 * 
 *      $onInit(){
 *          const chain = this.test.bind(this)
 *                .chainAfter(this.test1.bind(this))
 *                .chainAfter(this.test2.bind(this))
 *         chain(1,2,3)
 *      }
 * }
 * 
 */

``` 

## 装饰者模式

>在不改变原有函数或对象功能的基础上，给它们新加功能

用AOP装饰函数

```
if (Function.prototype.before) {
    throw new Error('the before method already exist')
} else {
    Function.prototype.before = function (beforefn) {
        return () => {
            if (beforefn.apply(this, arguments)) {
                this.apply(this, arguments)
            }
        }
    }
}

if (Function.prototype.after) {
    throw new Error('the after method already exist')
} else {
    Function.prototype.after = function (afterfn) {
        return () => {
            this.apply(this, arguments)
            afterfn.apply(this, arguments)
        }
    }
}

```

## 状态模式

> 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类

要点：将状态封装成独立的函数，并将请求委托给`当前的状态对象`，当对象的内部状态改变时，会带来不同的行为变化

电灯的例子：

一个按钮控制电灯的开关，按一下是开，再按一下是关

初始实现：

```
class Light{
    constructor(){
        this.state='off',
        this.button=null
    }
    init(){
        //创建按钮结点
        .....

        this.button.onClick=()=>{
            this.btnPressed()
        }
    }
    btnPressed(){
        if(this.state=='off'){
            this.state='on
        }else {
            this.state='off'
        }
    }
}
```

这段代码的缺点就是不易扩展，当要加入一种闪动的状态时，就要修改btnPressed中的代码

使用状态模式改写

```
class Light{
    constructor(){
        this.state=FSM.off,
        this.button=null
    }
    init(){
        //创建按钮结点
        .....

        this.button.onClick=()=>{
            this.state.btnPressed.call(this)
        }
    }
}

const FSM={
    on:{
        btnPressed(){
            //处理
            this.state=FMS.on
        }
    },
    off:{
        btnPressed(){
            //处理
            this.state=FMS.off
        }
    }
}

```


