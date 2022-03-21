																   React

# 起步

## 第一章:插值表达式

​            **在runtime17中可以直接将JSX 编译为虚拟DOM**

### 表达式语法

*内容中插值表达式，可以接收的值：*

*基本类型：*

*- string、number 原样输出*

*- null、undefined、boolean、symbol 会被忽略*

*复合类型：*

*- 数组：将数组展开，依次输入*

*- ReactNode：基于 React 的虚拟 DOM*

基本语法Example  :

```react
let data = "hello react";
let span = <span>span</span>
let div = <div>{2+2}</div>;
ReactDOM.render(
    div,
    document.querySelector("#root")
)
```

### 条件输出

*条件输出：*

*三目运算*

*或运算*

*且运算*

*函数调用*

 基本语法Example

```react
let render = (nub)=>{
    if(nub < 5){
      return "小于5"
    }
    if(nub < 10){
      return "小于10"
    }
    if(nub < 20){
      return "小于20"
    }
    return "大于等于20";
}
let a = 10;
let b = 20;
let div = <div>
    <p>{(a < b)&&"成立"}</p>
    <p>{(a > b)||"不成立"}</p>
    <p>{(a > b)?"成立":"不成立"}</p>
    <p>{render(3)}</p>
</div>;
```

### 列表输出

React 没有像Vue 有v-for 语法 需要自行去映射数组

*在列表输出时，要每一项需要有一个列表中唯一的key值*  *参照Vue*

map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

语法如下：

```js
let data = [
    "列表项-1",
    "列表项-2",
    "列表项-3",
    "列表项-4"
];
let list = <ul>
    {data.map((index, item) => {
        return <li key={index}>{item}</li>
    })}
</ul>;
```

插值属性

当调整样式 属性接受的以对象的形式

需要用到当前 对象：->dangerouslySetInnerHTML ->html:inner

```jsx
let inner = '<p>这是一个p标签</p>';
let view = <div
    className="wrap"
    style={{
        width: "200px",
        height: "200px",
        background: "red"
    }}
>
    <input type="text" autoComplete="off"/>
    <div
        dangerouslySetInnerHTML={{
            __html: inner
        }}
    ></div>
</div>
ReactDOM.render(
    view,
    document.querySelector("#root")
)
```

### Fragment 容器

可以用于包住整个同一层级的元素，且并不会在渲染时多出一个元素。

1. JSX 最终会变成虚拟DOM（一个对象）,一定要注意，JSX 在输出时，必须有且只有一个顶层容器元素。

Fragment: <Fragment></Fragment> 或 <></>*

```jsx
let div = <>
    <div>
        <input type="text"></input>
    </div>
    <div></div>
</>;
```

也可以用省略语法  <> </>需要在17版本之上



------

## 第二章：React 类组件

### 组件的定义和使用

组件:对于有一定**独立**的功能的数据与方法封装,对外暴露接口，有利于代码复用，且不用担心冲突

#### 声明组件

定义的组件必须继承自 Component , 该类必须有一个render 方法，返回的是构建的视图 提示:所有组件必须首字母大写,不然会报错

```react
import {Component} from "react"; // 重点 必须 解构出 Comonent 对象  并且继承
class App extends Component {

    render(){
        return <h1>first Component</h1>
    }
}
```

----------------------

#### state 状态

1.**React 的组件类比于状态机 ，当前组件状态发生变化，关联视图，也会发生变化**   如果是交互式就必须是组件

2.React 中,state 是一种不可变的值,唯一修改state的办法就是调用setState,根据原来的状态映射新的状态

```react
   setState(state, callback) {
        super.setState(state, callback);
    }
1: 新的state ||func
2:调用的setsate 之后，组件会更新，在更新的适合,会重新执行render方法，生成新的virdom， 进行新旧的dom对比,找到差异修改真实的dom。
```

##### example: 定时器

```react
  class App extends Component {
  state = {
        count: 1
    }
   render() {
        setTimeout(() => {
            this.setState({count: count + 1});
        }, [1000]);
        const {count} = this.state;
        return <div>
            <p>count:{count}</p>
            <button>按钮</button>
        </div>
    }
  }
```

##### example 事件--行间事件

```react
   render() {
        const {count} = this.state;
        return <div>
            <p>count:{count}</p>
            <button onClick={() => {
                this.setState({count: count + 1})
            }}>按钮
            </button>
        </div>
    }
```

##### SetSate参数（state）

setState (state,fun) 该对象包含中的属性,是我们要修改的状态,setState 会帮我们进行浅合并

Example 复杂对象 行内事件

```react
            <p>name:{data.name},age:{data.age}</p>
            <button onClick={() => {
                this.setState({
                    //错误示范：Name 会被覆盖
                    // data:{
                    //     age: data.age + 1
                    // }
                    //正确是应该将 对象直接解构出来
                    data: {
                        ...data,
                        age: data.age + 1
                    }
                })
            }}>按钮change
            </button>
```

##### setState (func)

如果 func 调用 setState 如果参数是一个function ，则执行该function 然后，拿到function的返回值,并把返回值更新到状态。

```react
        <p>nub:{nub}</p>
            <button onClick={() => {
                this.setState(function (){
                    return {
                        nub:nub+5
                    }
                })
            }}>function
            </button>
```

##### setState (satae|callback)

当前次组件更新完成后回调函数，当我们调用setState 后组件会更新 ，重新调用render,然后更dom，更新完成后执行的---callback.

```
            <p>nub:{nub}</p>
            <button onClick={() => {
                this.setState(function (){
                    return {
                        nub:nub+5
                    }
                },()=>{console.log('当前参数更新完成')})
            }}>function
            </button>
```

#### setState

setState 是Async || synchro

同步：**{**    在React可以监控的地方 :React 事件,React 组件生命周期函数,以及其他的React 方法中,呈现异步表现，并且回对setState 进行合并更新 -只更新一次

在异步方法， 或者原生事件中setState 重新一种同步表现，不会setState 进行合并。 （批处理机制）**}**

默认情况调用Setstate,表现为异步，并且在一个操作中，多次调用setState,会合并处理，只更新一次。

```react
render() {
    const {count} = this.state;
    console.log("更新");  执行顺序1
    return <div>
        <p>count:{count}</p>
        <button onClick={() => {
            this.setState({
                count: count + 1  执行顺序3
            })
            console.log("异步在前")  执行顺序2 
        }}>按钮++
        </button>
    </div>
}
```

同步调用

这种情况叫做批处理，如果在一个操作中，多次调用setsatate,会合并处理，只更新一次。

```react
    render() {
        const {count} = this.state;
        console.log("render");
        return <div>
            <p>count:{count}</p>
            <button onClick={() => {
                setTimeout(() => {
                    this.setState({
                        count: count + 1
                    })
                    console.log("异步在前1");
                    this.setState({
                        count: count + 1
                    })
                    console.log("异步在前2");
                    this.setState({
                        count: count + 1
                    })
                    console.log("异步在前3");
                })
            }}>按钮++
            </button>
        </div>
       }
    }
```

------

#### 事件的this

##### 行间事件

React 事件

事件的this 指向 的是undefined

如果要指向函数的问题 ：

两种方案：1. =>函数

2.this 绑定

例子如下 通过函数绑定要构造函数中

​         **函数通过bind挂在构造器中 指向的是构造函数的实例。特就拿到了当前指向实例下的this**

```react
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
//函数通过bind挂在构造器中 指向的是构造函数的实例。特就拿到了当前指向实例下的this
     clickHandler = function () {
       console.log(this);
    }

render() {
        console.log(this.props);
        const {title, list} = this.props;
        const {show} = this.state;
        return (
            <li className={show ? "subList-show" : ""}>
                <a onClick={this.clickHandler}>{title}</a>
                <ul className="subList">
                    {
                        list.map((item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </li>
        )
    }
```

#### 组件中通信

​     **props 当父组件调用子组件时，可以将传递的数据添加在子组件的属性中-->子可以通过pros 属性来接受父级组件的数据**

##### 父级通信向子级通信

通父级元素的属性向子节点传值 -通过 子级pros 并解构

```react
//子组件    
render() {
        const {title, list} = this.props;
        const {show} = this.state;
        return (
            <li className={show ? "subList-show" : ""}>
                <a onClick={this.clickHandler}>{title}</a>
                <ul className="subList">
                    {
                        list.map((item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </li>
        )
    }
//父级
class App extends Component {
    //state 异步 || 同步
    render() {
        return (
            <ul id="menu">
                {Object.keys(data).map((item, index) => {
                    return <Menu key={index} title={item} list={data[item]}/>  //-<属性
                })}
            </ul>
        )
    }
}
```

##### 子级的向父级的数据通信

在父级中定义相关的数据操作方法 （回调），把方法传递给子级，在子级调该方法父级传递消息。

（只允许从上到下传递）

实际上通过的属性将父级的props传给子组件，通过解构将方法拿出，由子组件通过事件触发绑定方法从而修改组件状态。

Todo：funtion 丢失props 未解决，从而用的=>替代

父级:

```react
class App extends Component {
    /*子级向父级传递*/
    state = {
        box_state: ""//记录当前哪一项展开
    }

    changeOpen=(box_state)=>{
        this.setState({
            box_state
        })
    }


    render() {
        const {box_state} = this.state;
        return (
            <ul id="menu">
                {Object.keys(data).map((item, index) => {
                    return <Menu key={index} changeOpen={this.changeOpen} box_state={box_state} title={item}
                                 list={data[item]}/>  //-<属性
                })}
            </ul>
        )
    }
}
```

子级

```react
class Menu extends Component {
    state = {
        show: false
    }

    //如果是function 会丢失构造函数,当前解决方案 没有解决已经展开的问题
    changeShow = () => {
        const {changeOpen, title, box_state} = this.props;
        changeOpen(title === box_state ? "" : title);
    }

    /*子级修改父级的状态*/
    render() {
        const {title, list, box_state} = this.props;
        return (
            <li className={box_state === title ? "subList-show" : ""}>
                <a onClick={this.changeShow}>{title}</a>
                <ul className="subList">
                    {
                        list.map((item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </li>
        )
    }
}
```

------

#### Context Api-跨组件通信

创建:context ：createContext

向下传递数据 ：Provider

接受context 数据
