
## redux 主要内容总结

- 状态管理的意义

- redux核心概念

- 源码

### 状态管理的意义

在不使用redux这样的状态管理的库之前，状态的维护都是在组件内部，`有时候一个父组件的状态要在子组件或者更深层的子组件内进行修改，这时候就要一层层的传递一个处理函数给内层的组件，用来更新父组件的状态`，随着组件的增多，组件内维护的状态也越来越多，组件的交互和状态之间的相互影响就变的越来越乱，`最终失去对程序的控制`


### redux核心概念

一句话总结redux就是

> redux强制我们按照一种规定的方式来更新应用的状态，我们更新状态的唯一方式就是分发一个action，而状态的更新只能通过pure function,状态被统一存储在store中

- #### store

应用的所有状态存储在一个对象树中，而这个对象存储在Store中

Store能干的事：

1. 存储整个应用的状态

2. 提供getState() 来访问状态

3. 提供dispatch(action) 来更新状态

4. 提供subscribe(listener)来注册listener

```
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

- #### action

action就是当前要进行的操作，一个纯粹的js对象

```

const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}

```

Action Creators

*一个用来创建action的function*

```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

*bindActionCreators(actionCreators, dispatch)*

react 中我们可以直接调用dispatch(action)来更新状态

例如

```
import {connect} from 'react-redux';

 class Gallery extends Component{

    render(){
        const {images, selectedImage, dispatch} = this.props;
        <div className="image-scroller">
          {images.map((image, index) => (
             <div key={index} onClick={() => dispatch({type:'IMAGE_SELECTED', image})}>
              <img src={image}/>
             </div>
          ))}
        </div>
    }

 }

 function mapStateToProps(state) {
    return {
        images: state.images,
        selectedImage: state.selectedImage
    }
 }

export default connect(mapStateToProps)(Gallery)

```

使用bindActionCreators，会把一个值是action creators的对象转变成拥有相同值的对象，但是每个action creators被包装在dispatch调用之中,这样，直接调用 action creator,就会触发dispatch

```
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as GalleryActions from './actions.js';

class Gallery extends Component{

    render(){
        const {images, selectedImage, dispatch} = this.props;
        <div className="image-scroller">
          {images.map((image, index) => (
             <div key={index} onClick={() => selectImage(image) }> //不同的点
              <img src={image}/>
             </div>
          ))}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        images: state.images,
        selectedImage: state.selectedImage
    }
 }

function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(GalleryActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)

```

- #### reducer

> (previousState, action) => newState

**纯函数，只是做计算工作，对相同的输入都有相同的输出**

分离reducers

可以存在多个reducers,每个reducer负责操作一部分state，reducer的state参数就是整个应用state的一部分

对于大的应用，将state管理化大为小是好的

最后，使用combineReducers()来合并多个reducer

```
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})
```
等价于

```
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

- #### 数据流

redux管理下的state数据流

1. createStore(reducers),redux根据 reducers构造一颗state tree

2. 我们调用store.dispatch(action)

3. redux store调用reducer来处理action

4. redux 存储 新的state tree


### 源码

主要的createStore()

```
function createStore(reducer, preloadedState, enhancer)
```

接受三个参数

reducer,初始的state和store增强器

主要看一下有enhancer和只有reducer的情况

- 有enhancer时,createStore返回enhancer的结果

```
function createStore(reducer, preloadedState, enhancer){
    return enhancer(createStore)(reducer, preloadedState)
}
```

而enhancer是通过applyMiddleware()方法返回的

例如

```
    import { createStore, applyMiddleware } from 'redux'
    import createSagaMiddleware from 'redux-saga'
    import reducer from './reducer'
    import {loadImages} from './sagas';
    const store = createStore(
        reducer,
        applyMiddleware(createSagaMiddleware(loadImages))
    );
```

转到applyMiddleware.js文件

```
    function applyMiddleware(...middlewares){
        return function(createStore){
            return function(reducer, preloadedState, enhancer){
                const store=createStore(reducer, preloadedState, enhancer)
                let dispatch = store.dispatch
                let chain = [] //function的集合

                const middlewareAPI = {
                    getState: store.getState,
                    dispatch: (action) => dispatch(action)
                }
                chain = middlewares.map(middleware => middleware(middlewareAPI))
                dispatch = compose(...chain)(store.dispatch)

                return {
                    ...store,
                    dispatch
                }
             }
        }
    }
```
可以看到，applyMiddleware()`接受一系列函数作为参数` 返回一个接受createStore方法的函数A，函数A执行后返回函数B，B接受的参数和createStore()方法一样。函数B的函数体中，首先`执行createStore得到一个store`，然后一系列中间件执行并将返回结果保存在chain中，之后组合这些函数。

```
由格式compose(f, g, h)(args) 变成 f(g(h(...args)))
```

并将compose()返回的结果覆盖store中的dispatch

- 只有reducer时

主要的dispatch方法

```
function dispatch(action){
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
}
```

主要是执行reducer方法，并将返回的新的state tree保存在currentState中，循环执行订阅的listener,getState()就是返回当前的state

```
function getState() {
    return currentState
}
```