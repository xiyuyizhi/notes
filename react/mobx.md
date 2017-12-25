
# Mobx浅析

## 响应式编程介绍

从不同层面来看，响应式的表象很多

从视图层来说，主流的框架都是响应式的，模型变化自动驱动视图变化，注意，这里说的是自动，这也是响应式最本质的概念(当某些东西改变后自动产生side effect),angularjs中的脏监测、vue使用的对象属性劫持等内部机制都是保障了模型到视图层面的自动响应

从异步，事件的角度来说，Rxjs给我们提供了一种统一的解决思路，所有的东西都是stream,不管是同步的、异步的，事件、还是未来的，我们可以用相同的方式处理

数据层面，Mobx专注于解决数据级别的响应，它不关系数据的来源方式，只要一个对象中的属性、一个基本类型变量发生了变化，对这些数据的订阅就会自动执行

- mobx vs rxjs

mobx和rxjs是一种互补的关系，两种专注的层面不同，rxjs响应数据的来源，mobx响应数据的变化

例如:如果想在更新state之前对用户的输入操作节流，大致工作流是

```
DOM events -> RxJS -> Update state -> MobX -> Update UI
//rxjs用来处理事件，自动节流，Mobx来响应数据的变化
```


## 专注数据层面响应式的mobx

mobx的核心思想是让一切需要应用状态的东西，在需要的时候，都能自动获取需要的数据，比如说

```
class Todo{

    @observable list=[]

    @computed get listCount(){
        return this.list.length
    }
    //listCount借助于list数组，当数组的长度发生变化时，使用listCount的地方自动变化
}
```

或者

```
class TodoStore{
    @observable list=[]
}

@observer
class Todo extends React.Component{
    render(){
        return this.props.todoStore.list.map(x=>{
            
        })
    }
}
 //当list变化时,Todo组件重新render
```

- ### mobx的四个核心概念

**state**:就是代表应用的当前状态，纯数据，数据驱动视图嘛

**derivations**: 类似vue中的computed，使用@computed定义，怎么理解呢？学angularjs或react时，都会接触到一个概念，就是代表当前视图的模型数据应该尽可能没有重复的，用最少的数据来保证视图的正常变化

举个例子,有一个页面渲染一个列表，并展示列表的数量

```
class TodoList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            list:[]
        }
    }
    render(){
        return (
            <div>
                <label>count: {this.state.list.length}</label>
                //render list
            </div>
        )
    }
}

```

这里没有为展示数量单独在state中定义一个length属性，使用state.lists.length可以间接的得到数量，

*derivations*就是用来计算那个可以通过state间接计算来的值

**Reactions**:代表剩下的那些需要对state变化动态作出反应的东西，比如说react的重新render，数据变化时自动重新ajax请求

举个例子: 一个搜索功能，我们有一个store类，代表应用的状态，有一个observable字段search，代表页面中input标签的用户输入值，当用户输入东西的时候，自动发送查询请求，这里，对search的变化自动发送ajax请求就是一个 reactions

```
class SearchGit{
      @observable search = ''

      constructor(){
           autorunAsync(() => {
                if (!this.search) return
                fetchRepos(this.search)
            }, 1000)
      }
}
```

**actions**: 改变state的操作，显式申明更好

## 简单实践

### [react结合mobx的一个github repos 搜索的功能，支持滚动加载](https://codesandbox.io/s/jz6nnqkjw)

PS(从mobx仓库的首页中发现一个在线写代码的网站codesanbox，和jsfiddle等比起来颜值简直不能再高。。。。这个小练习就是直接在上面编辑的，不足之处就是不支持样式文件的方式，样式只能写成style)

初步实践总结：

1. mobx提供一个autorunAsync，实现类似去抖的功能，不错

2. 对于实现一个滚动加载，结合数据的自动响应式，流程还是很清晰的

3. mobx只关注数据的变化，对状态存储在哪，异步请求写在哪没有一套最佳实践，持续探索吧

## 参考

[Ten minute introduction to MobX and React](https://mobx.js.org/getting-started.html)

[Mobx vs Reactive Stream Libraries (RxJS, Bacon, etc)](https://github.com/mobxjs/mobx/wiki/Mobx-vs-Reactive-Stream-Libraries-(RxJS,-Bacon,-etc))

[The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

[
流动的数据——使用 RxJS 构造复杂单页应用的数据逻辑](https://zhuanlan.zhihu.com/p/23305264)
