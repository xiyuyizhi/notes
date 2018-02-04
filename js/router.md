



>前端路由库的作用是改变地址栏，支持浏览器前进、后退，并同步路由对应的视图，这里以react-router及其依赖的history库说一下路由机制

## 前提

首先简单介绍一下前端路由机制所依赖的pushState、popstate事件、hash及对应的hashChange事件

1. pushState,popstate

- 对于支持html5 新增pushState、replaceState方法的浏览器，可以通过设置pushState来在浏览器history栈中新增一条记录

- 设置pushState(),replaceState()时并不会触发popstate事件，popstate事件只在点击浏览器前进、后退按钮或调用history.back()、history.forward()等时触发

- pushState()方法第一个参数可以指定一个state对象，并通过history.state或popstate事件回调中event对象获取

```

history.pushState(state,title,path)

console.log(history.state)

window.addEventListener('popstate',(e)=>{

    console.log(e.state)

})

```

2. location.hash hashChange

对于不支持pushState方法的浏览器，可以通过改变location.hash和借助hashChange事件来实现路由功能

```
window.addEventListener('hashchange',e=>{

})

location.hash="test"

```

3. 对比

通过设置history.pushState(state,title,path),可以给对应路由设置一个state,这就给路由之间的数据传递提供了一种新途径，并且，state对象是保存在本地的，刷新页面依然存在，但通过hash方式实现的路由就没法使用，react-router v4版本也去除了<HashRouter>对state的模拟


## history库介绍

history库提供了三种不同的方法来创建history对象，这里的history对象是对浏览器内置window.history方法的扩展,`扩展了push,go,goBack,goForward等方法，并加入了location、listen字段`，并对非浏览器环境实现polyfill

```
createBrowserHistory()
createHashHistory()
createMemoryHistory()
```

## react-router的路由实现(BrowserRouter和createBrowserHistory)

react-router路由实现大体过程

1. 调用history.push跳转路由时，内部执行window.history.pushState在浏览器history栈中新增一条记录，改变url，执行`<Router></Router>`组件注册的回调函数，

2. createBrowserHistory中注册popstate事件，用户点击浏览器前进、回退时，在popstate事件中获取当前的event.state，**重新组装一个location**,执行`<Router></Router>`组件注册的回调函数

3. history库对外暴露createBrowserHistory方法，react-router中实例化createBrowserHistory方法对象，在`<Router>`组件中注册history.listen()回调函数，当路由有变化时,`<Route>`组件中匹配location,同步UI

分别来看

#### history.push

在react中，我们可以调用history.push(path,state)来跳转路由，实际执行的就是[createBrowserHistory中的push方法](https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js)

**在这个方法中主要做三件事**

1. 根据传递的path，state参数创建一个location,不同于window.location,这里的location只有这些属性

```
   location= {
      path:
      search:
      hash:
      state:
      key
    };
    const location = createLocation(path, state, createKey(), history.location);
```

这个location会在`<Router>`和`<Route>`组件中使用，**来根据location中的值和`<Roue path='xxx'></Roue>`中的path匹配，path成功的Route组件渲染指定的compoent**

2. 执行globalHistory.pushState({ key, state }, null, href);

3. 执行Router中执行的listener

```
const action = "PUSH"
setState({ action, location });

const setState = nextState => {
    Object.assign(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
};

```

#### history中对popstate事件的注册

popstate事件触发时，可以得到event.state，createBrowserHistory中会根据**这个state和当前window.location重新生成一个location对象，执行Router组件注册的listener，同步UI**

```
const setState = nextState => {
    Object.assign(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

const handlePop = location => {

    const action = "POP";
    setState({action,location)

}

```

#### `<Router>与<Route>`组件

BrowserRouter组件中会实例化一个createBrowserHistory对象，传递给Router组件

```
class BrowserRouter extends React.Component{

    history = createHistory(this.props);

    render() {
        return <Router history={this.history} children={this.props.children} />;
    }

}
```

在Router组件中要注册history.listen()的一个监听函数，并且保存一份子组件（Route）使用的数据

```
getChildContext() {
    return {
      router: {
        ...this.context.router,
        history: this.props.history,
        route: {
          location: this.props.history.location, //history中的location
          match: this.state.match
        }
      }
    };
  }
componentWillMount{
    this.unlisten = history.listen(() => {
        this.setState({
            match: this.computeMatch(history.location.pathname)
        });
    });
}


```

当调用history.push或触发popstate事件时，这里注册的listener都会被createBrowserHistory执行，触发setState,然后Router的子组件中匹配的<Route>会重新渲染，

```

<Router>
<Route path='/path1' compoent={}>
<Route path='/path2' compoent={}>
<Router>

```

在Route中有一个match状态,在父组件props发生变化时会重新计算

```
state = {
    match: this.computeMatch(this.props, this.context.router)
  };

componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
}
//computeMatch主要工作就是匹配当前组件上指定的path和当前浏览器的路径是否一致，一致就渲染组件

render() {

    if (component) return match ? React.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

}
```

## 总结

总结一下，react-router的路由机制就是

1. 借助history库，history中实现了push，go,goBack等方法，注册了popstate事件，当路由跳转时，使用浏览器内置的history api 操作 history栈

2. history库对外暴露的history对象提供了listen方法，`<Router></Router>`组件会注册一个listener

3. 当调用hsitory.push或popstate事件触发时，执行listener

4. `<Router></Router>`注册的监听函数内部会setState更新状态

5. `<Router></Router>`的子组件`<Route>`的componentWillReceiveProps生命周期函数中能得到Router中context,根据当前path和浏览器当前location来判断当前route是否match，匹配就渲染component


虽然本文以react-router来介绍路由机制，但主流路由库实现原理都差不多，借助pushState或hash来更新url,在对象的事件处理函数中来做视图的同步


参考

 - [createBrowserHistory.js](https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js)

 - [locationUtil.js](https://github.com/ReactTraining/history/blob/master/modules/LocationUtils.js)

 - [BrowserRouter.js](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js)

 - [Router.js](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Router.js)

 - [Route.js](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js)

