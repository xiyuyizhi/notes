
# Generators深度解读

[翻译自](http://exploringjs.com/es6/ch_generators.html)

## 概述

1. ### 什么是generators？

我们可以把generators理解成一段`可以暂停并重新开始执行的函数`

```
function* genFunc() {
    // (A)
    console.log('First');
    yield; //(B)
    console.log('Second'); //(C)
}
```

function*是定义generator函数的关键字，yield是一个操作符，generator 可以通过yield暂停自己执行，另外，`generator可以通过yield接受输入和对外输入`

当我们调用genFunc(),我们得到一个generator对象genObj,我们可以通过这个genObj控制程序的执行

```
const genObj = genFunc()
```

*`上面的程序初始会暂停在行A`，调用genObj.next()会使程序继续执行直到遇到下一个yield*

```
> genObj.next();
First
{ value: undefined, done: false }
```

这里先忽略genObj.next()返回的对象，之后会介绍

现在，程序暂停在了行B，再次调用 genObj.next(),程序又开始执行，行C被执行

```
> genObj.next()
Second
{ value: undefined, done: true }
```

然后，函数就执行结束了，再次调用genObj.next()也不会有什么效果了


2. ### generator能扮演的角色

**generators 可以扮演三种角色**

- 迭代器(数据生产者)

每一个yield可以通过next()返回一个值，这意味着generators可以通过循环或递归生产一系列的值，因为generator对象实现了Iterable接口，`generator生产的一系列值可以被ES6中任意支持可迭代对象的结构处理`，两个例子，for of循环和扩展操作（...）

- 观察者(数据消费者)

yield可以通过next()接受一个值，这意味着`generator变成了一个暂停执行的数据消费者直到通过next()给generator传递了一个新值`

- 协作程序(数据生产者和消费者)

考虑到generators是可以暂停的并且可以同时作为数据生产者和消费者，不会做太多的工作就可以把generator转变成协作程序(合作进行的多任务)


下面详细介绍这三种

## generators作为数据生产者(iterators)

generators同时实现了接口Iterable 和 Iterator（如下所示），这意味着，generator函数返回的对象`是一个迭代器也是一个可迭代的对象`

```
interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

generator对象完整的接口后面会提到，这里删掉了接口Iterable的return()方法，因为这个方法这一小节用不到

*generator函数通过yield生产一系列的值，这些值可以通过迭代器的next()方法来使用，*例如下面的generator函数生成了值a和b

```
function* genFunc(){
    yield 'a'
    yield 'b'
}
```

交互展示如下

```
> const genObj = genFunc();
> genObj.next()
{ value: 'a', done: false }

> genObj.next()
{ value: 'b', done: false }

> genObj.next() // done: true => end of sequence
{ value: undefined, done: true }
```

1. ### 迭代generator的三种方式

 - for of循环

 ```
    for (const x of genFunc()) {
        console.log(x);
    }
    // Output:
    // a
    // b
 ```

- 扩展操作符(...)

```
const arr = [...genFunc()]; // ['a', 'b']
```

- 解构赋值

```
> const [x, y] = genFunc();
> x
'a'
> y
'b'
```

2. ### generator中的return

上面的generator函数没有包含一个显式的return,一个隐式的return 返回undefined,让我们试验一个显式返回return的generator

```
function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'result';
}
```

下面的结构表明`return 指定的值保存在最后一个next()返回的对象中`

```
> const genObjWithReturn = genFuncWithReturn();
> genObjWithReturn.next()
{ value: 'a', done: false }
> genObjWithReturn.next()
{ value: 'b', done: false }
> genObjWithReturn.next()
{ value: 'result', done: true }
```

然而，`大部分和可迭代对象一起工作的结构会忽略done属性是true的对象的value值`

```
for (const x of genFuncWithReturn()) {
    console.log(x);
}
// Output:
// a
// b

const arr = [...genFuncWithReturn()]; // ['a', 'b']
```

`yield*会考虑done属性为true的value值，后面会介绍`

3. ### generator函数中抛异常

`如果一个异常离开了generator函数，next()可以抛出它`

```
function* genFunc() {
    throw new Error('Problem!');
}
const genObj = genFunc();
genObj.next(); // Error: Problem!
```

这意味着next()可以生产三种类型的值

- 对于可迭代序列中的一项x，它返回 {value:x,done:false}

- 对于可迭代序列的最后一项,明确是return返回的z，它返回{value:z,done:true}

- 对于异常，它抛出这个异常


4. ### 通过 yield*递归

我们只能在generator函数中使用yield，如果我们想通过generator实现递归算法，我们就需要一种方式来在一个generator中调用另一个generator，这就用到了yield*，现在，我们只介绍`yield*用在generator函数产生值的情况，之后介绍yield*用在generator接受值的情况`

generator递归调用另一个generator的方式

```
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}
```

执行结构

```
const arr = [...bar()];
//['x', 'a', 'b', 'y']
```

在内部，yield*像下面这样工作的

```
function* bar() {
    yield 'x';
    for (const value of foo()) {
        yield value;
    }
    yield 'y';
}

```

另外，yield*的操作数不一定非得是一个generator函数生成的对象，可以是任何可迭代的

```
function* bla() {
    yield 'sequence';
    yield* ['of', 'yielded'];
    yield 'values';
}
const arr = [...bla()];
// ['sequence', 'of', 'yielded', 'values']
```

**yield*考虑可迭代对象的最后一个值**

ES6中的很多结构会忽略generator函数返回的可迭代对象的最后一个值(例如 for of，扩展操作符,如上面介绍过的那样)，但是，`yield*的结果是这个值`

```
function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj) {
    const result = yield* genObj;
    console.log(result); // (A)
}
```

执行结果

```
> [...logReturned(genFuncWithReturn())]
The result
[ 'a', 'b' ]
```

## generators作为数据消费者(observers)

作为数据的消费者，generator函数返回的对象也实现了接口Observer

```
interface Observer {
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}
```

`作为observer,generator暂停执行直到它接受到输入值`，这有三种类型的输入，通过以下三种observer接口提供的方法

- next() 发送正常的输入

- return() 终止generator

- throw() 发送一个错误

1. ### 通过next()发送值

```
function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`); // (A)
    console.log(`2. ${yield}`);
    return 'result';
}
```

首先得到generator对象

> const genObj = dataConsumer();

然后执行genObj.next(),这会开始这个generator.执行到第一个yield处然后暂停。此时next()的结果是yield在行A产出的值(`是undifined，因为这地方的yield后面没有操作数`)

```
> genObj.next()
//Started
{ value: undefined, done: false }
```

然后再调用next()两次，第一次传个参数'a',第二次传参数'b'

```
> genObj.next('a')
//1. a
{ value: undefined, done: false }

> genObj.next('b')
//2. b
{ value: 'result', done: true }
```

可以看到，`第一个next()调用的作用仅仅是开始这个generator，只是为了后面的输入做准备`

可以封装一下

```
function coroutine(generatorFunction) {
    return function (...args) {
        const generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
```

使用

```
const wrapped = coroutine(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
});

> wrapped().next('hello!')
First input: hello!

```

2. ### return() 和 throw()

generator对象有两个另外的方法,return()和throw(),和next()类似

让我们回顾一下next()是怎么工作的：

1. generator暂停在yield操作符

2. 发送x给这个yield

3. 继续执行到下一个yield，return或者throw:

    - yield x 导致 next() 返回 {value: x, done: false}

    - return x 导致 next() 返回 {value:x, done:true}

    - throw err 导致 next() 抛出err

return()和throw() 和next()类似工作，但在第二步有所不同

 - return(x) 在 yield的位置执行 return x

 - throw(x) 在yield的位置执行throw x    

**return()终止generator**

return() 在 yield的位置执行return

```
function* genFunc1() {
    try {
        console.log('Started');
        yield; // (A)
    } finally {
        console.log('Exiting');
    }
}

> const genObj1 = genFunc1();
> genObj1.next()
Started
{ value: undefined, done: false }
> genObj1.return('Result')
Exiting
{ value: 'Result', done: true }
```

**阻止终止**

我们可以阻止return()终止generator如果yield是在finally块内（或者在finally中使用return语句）

```
function* genFunc2() {
    try {
        console.log('Started');
        yield;
    } finally {
        yield 'Not done, yet!';
    }
}
```

这一次，return()没有退出generator函数，当然，return()返回的对象的done属性就是false

```
> const genObj2 = genFunc2();

> genObj2.next()
Started
{ value: undefined, done: false }

> genObj2.return('Result')
{ value: 'Not done, yet!', done: false }
```

可以再执行一次next()

```
> genObj2.next()
{ value: 'Result', done: true }
```

**发送一个错误**

throw()在yield的位置抛一个异常

```
function* genFunc1() {
    try {
        console.log('Started');
        yield; // (A)
    } catch (error) {
        console.log('Caught: ' + error);
    }
}
```

```
> const genObj1 = genFunc1();

> genObj1.next()
Started
{ value: undefined, done: false }

> genObj1.throw(new Error('Problem!'))
Caught: Error: Problem!
{ value: undefined, done: true }
```

3. ### yield* 完整的故事

到目前为止，我们只看到以yield*的一个层面: 它传播生成的值从被调用者到调用者。既然我们现在对generator接受值感兴趣，我们就来看一下yield*的另一个层面：yield*可以发送调用者接受的值给被调用者。`在某种程度上，被调用者变成了活跃的generator,它可以被调用者生成的对象控制`

```
function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}
```

```
> const callerObj = caller();

> callerObj.next() // start
{ value: undefined, done: false }

> callerObj.next('a')
callee: a
{ value: undefined, done: false }

> callerObj.next('b')
callee: b
{ value: undefined, done: false }
```

## generators作为协同程序(协作多个任务)

这一节介绍generator完整的接口(组合作为数据生产者和消费者两种角色)和一个同时要使用这两种角色的使用场景：协同操作多任务

1. #### 完整的接口

```
interface Generator {
    next(value? : any) : IteratorResult;
    throw(value? : any) : IteratorResult;
    return(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

接口Generator结合了我们之前介绍过的两个接口：输出的Iterator和输入的Observer

```
interface Iterator { // data producer
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}

interface Observer { // data consumer
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}
```

2. ### 合作多任务

合作多任务是我们需要generators同时处理输入和输出，在介绍generator是如何工作的之前，让我们先复习一下`JavaScript当前的并行状态`

js是单线程的，但有两种方式可以消除这种限制

- 多进程： Web Worker可以让我们以多进程的方式运行js，对数据的共享访问是多进程的最大缺陷之一，Web Worker避免这种缺陷通过不分享任何数据。也就是说，如果你想让Web Worker拥有一段数据，要么发送给它一个数据的副本，要么把数据传给它(这样之后，你就不能再访问这些数据了)

- 合作多任务：有不同的模式和库可以尝试进行多任务处理，运行多个任务，但每次只执行一个任务。每个任务必须显式地挂起自己，在任务切换发生时给予它完全的控制。在这些尝试中，数据经常在任务之间共享。但由于明确的暂停，几乎没有风险。

**通过generators来简化异步操作**

一些基于Promise的库通过generator来简化了异步代码，generators作为Promise的客户是非常理想的，因为它们可以暂停直到结果返回

下面的例子表明[co](https://github.com/tj/co)是如何工作的

```
co(function* () {
    try {
        const [croftStr, bondStr] = yield Promise.all([  // (A)
            getFile('http://localhost:8000/croft.json'),
            getFile('http://localhost:8000/bond.json'),
        ]);
        const croftJson = JSON.parse(croftStr);
        const bondJson = JSON.parse(bondStr);

        console.log(croftJson);
        console.log(bondJson);
    } catch (e) {
        console.log('Failure to read: ' + e);
    }
});

```

注意这段代码看起来是多么的同步啊，虽然它在行A处执行了一个异步调用。

使用generators对co的一个简单的实现

```
function co(genFunc) {
    const genObj = genFunc();
    step(genObj.next());

    function step({value,done}) {
        if (!done) {
            // A Promise was yielded
            value
            .then(result => {
                step(genObj.next(result)); // (A)
            })
            .catch(error => {
                step(genObj.throw(error)); // (B)
            });
        }
    }
}

```
这里忽略了next()（行A）和throw（）（行B）可以回抛异常

借助上面的使用分析一下：

首先得到generator对象

```
const genObj = genFunc();
```

然后将genObj.next()的返回值传递给step方法

step()中获取到value和done，如果generator没有执行完，当前的value就是上面使用中定义的promise

等到promise执行完，然后将结果result传递给generator函数

```
genObj.next(result)

然后在generator中程序继续往下执行

const [croftStr, bondStr] = yield XXXX
.
.
.
.

```

注意行A处递归调用step(genObj.next(result)),使得generator函数中可以存在多个异步调用，而co都能处理

整个过程多么的巧妙啊。。。。。。。。。