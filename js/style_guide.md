## eslint代码校验

- ### 采用[eslint-config-ali/react](https://www.npmjs.com/package/eslint-config-ali)代码校验规则

```
npm install eslint eslint-config-ali  eslint-plugin-import  eslint-plugin-react 

babel-eslint babel-plugin-import pre-commit --save-dev                                                                                                                                                                      
```


.eslintrc中添加

```js
  "extends": "eslint-config-ali/react",
```

对以下规则放宽处理

```js
"max-lines": ["error", 320], //文件中最大行数
"max-lines-per-function": ["error", { "max": 80, "skipComments": true }], //函数最大行数
"import/no-named-as-default": 0,
"camelcase": [2, { "properties": "never", "ignoreDestructuring": true }], //小驼峰格式命名，不要求属性、解构赋值按这种格式
"new-cap": 2,
"eqeqeq": 0, //不要求全等
"no-useless-escape": 0,
"no-nested-ternary": 0, //允许嵌套的三元表达式
"no-mixed-operators": 0, //允许 && ， || 并存
"prefer-destructuring": ["error", { "object": true, "array": false }], //强制对象属性获取采用解构赋值，不强制数组
"no-param-reassign": 0, //函数中参数可以修改值或改变引用
"import/prefer-default-export": 0, //模块导出不限制named export或者default export
"react/no-array-index-key": 0, //可以使用数组下标作为key
"react/sort-comp": [
  //class中各类方法，钩子函数的书写顺序
  2,
  {
	"order": [
	  "static-methods",
	  "statics",
	  "constructor",
	  "everything-else",
	  "lifecycle",
	  "render"
	]
  }
],
"react/forbid-prop-types": 0, //对属性类型验证
"react/no-danger": 0,
"react/no-danger-with-children": 2, //元素包含子元素时，不允许使用dangerouslySetInnerHTML
"react/no-multi-comp": 0, //一个文件中可以包含多个组件
"react/prop-types": 0, //不要求对组件属性类型验证
"react/jsx-no-undef": 0,
"react/no-unused-state": 0,
"no-underscore-dangle": ["error", { "enforceInMethodNames": true }], //class或对象定义中方法名包含_
"react/display-name": 0 //组件的displayName

```

- ### 代码提交前执行eslint校验

```js
tnpm install  tnpm install --save-dev pre-commit  

//package.json中
"scripts": {
	 "lint": "eslint --ext .js,.jsx ./src --fix",
}
"pre-commit": "lint",
```

## 代码规范

### ES

- #### 命名

1. 变量命名 小驼峰命名法：第一个单词首字母小写，其余单词的首字母大写。 //eslint "camelcase"

2. 常量的命名使用全大写字母，多单词使用下划线分开 

```
 // good
var WELCOME_TEXT = 'Hello World';
```

3. 构造函数/类使用大驼峰命名，即所有单词首字母大写 //eslint  new-cap

4. 普通函数名使用小驼峰

- #### 其他


- 文件最大行数,300到350 //eslint "max-lines": ["error", 300],

- 控制函数最大行数 //"max-lines-per-function": ["error", { "max": 80, "skipComments": true }]

- 变量定义使用 let 或 const   // eslint no-var

- 获取对象属性通过解构赋值的方式 //eslint  prefer-destructuring

```js
 //bad
 const vid = this.props.vid
```

- 数组方法的回调函数中必须有return语句  //eslint  array-callback-return

```js
//bad
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});
```

- switch 下的 必须包含 default //eslint default-case

- 函数参数超过3个时应该使用对象的方式 //eslint max-params: ["error", 3]

```js
//bad
function foo (bar, baz, qux, qxx) {
    doSomething();
}
```

- 使用 spreads ... 赋值数组，函数参数中不使用arguments,使用...args形式

- 模块导出变量时，应声明为const，非let //eslint  import/no-mutable-exports

```js
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };

```

- 不使用 ++ ,-- //eslint no-plusplus

- 条件判断时boolean隐式转换

```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}
```

- 多用es6新增语法

### react

- 组件属性定义使用小驼峰命名格式
```js
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>
```

- 组件应包含属性类型声明，对非必须属性，应该包含默认值 //react/forbid-prop-types

```js
// good
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};
SFC.defaultProps = {
  bar: '',
  children: null,
};
```

- 总是将ref指定为函数 //eslint react/no-string-refs

- 类中方法名不应该包含下划线(_) // eslint "no-underscore-dangle": ["error", { "enforceInMethodNames": true }]

```
class Foo {
  _bar() {}
}
class Foo {
  bar_() {}
}
```

- #### 定义class时严格按照以下顺序  

// eslint react/sort-comp 
  
```js
class TestCls{
	1. 静态方法
	2. 静态属性  static  propTypes = xxxxx
				static   defaultProps=xxxxx
	3. 构造函数 constructor
	4. 定义的其他方法 onChangeHandle()  onClikHandle()等
	5. 生命周期钩子  componentDidMount()。。。
	6. render()

}
```

---

## 相关

- ##### [eslint](https://eslint.org/)
- ##### [eslint-config-cli](https://www.npmjs.com/package/eslint-config-ali)
- ##### [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- ##### [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
