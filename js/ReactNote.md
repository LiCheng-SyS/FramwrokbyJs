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

##### setState (satae   |  callback)

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

## 类的生命周期

挂载阶段 （Mount）

组件从初始化到将组件的视图到真正的dom树中

--constructor

```react
constructor(props) {
    super(props);
    console.log("初始化成功");
}
```

组件加载执行

--getDerivedStateFromProps 将props映射到state中

```react
  static getDerivedStateFromProps(props, state) {
        console.log("next2 将props映射到state中")
        console.log(props, state);
        return props;
    }
```

--render

```react
 render() {
    console.log('生产VirDOM');
}
```

--componentDidMount

```react
    componentDidMount() {
        console.log("4 挂载完成，已经加载完成虚拟DOM ，并且添加到DOM了中");
        /*一般进行Dom操作和数据请求*/
    }
```

更新阶段 （Update）

卸载阶段 （UnMont）

## 第三章：必用功能

### 受控组件

 名词解释：如果想要获取表单内的状态,可以将from的内部状态和组件状态进行绑定，形成受控组件

如果比较Vue的功能双向绑定v-model

如checked 或则 value --输入类型的表单

```react
class App extends Component {
    state = {
        val: ""
    }
    /*双向绑定 受控组件 -->*/
    render() {
        const {val} = this.state;
        return (
            <>
                <input type={"text"} value={val}/>
                <button> 获取text value</button>
            </>
        )
    }
}

/*You provided a `value` prop to a form field without an `onChange` handler.*/
```

与Vue不同的是，vue通过语法糖帮你做了处理，而react更加的贴近于原生js 需要事件的回调进行处理

#### text

```react
            <>
                <input type={"text"}
                       value={val}
                       onChange={({target}) => {
                           this.setState({
                               val: target.value
                           })
                       }}
                />
                <button> 获取text value</button>
                <p>{val}</p>
            </>
```

当前的 onchnge 是react 重写过处理，通过从event解构出target后 在函数回调中 将state的vaule和状态和 表单控件的vaule进行绑定，==即就是手动实现了一个双数据的绑定。

#### checkbox

```react

                <input type={"checkbox"}
                       checked={checked}
                       onChange={({target}) => {
                           this.setState({
                               checked: target.checked
                           })
                       }}
                />
                <button onClick={() => {
                    this.setState({
                        checked: !checked
                    })
                }}>{checked ? "选中" : "不选中"}</button>=
```

同样两个check的受控组件也同样都是通过函数回调实现。

### 非受控组件

如果有时只是给个初始值，如果设置vaule 或者checked ，react就会认为你想做受控组件。

```html
 <input type={"text"} value={"我是初始化值"}/>
/*You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.
if the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
at input*/

```

同样也报错需要写回调函数，变成了只读状态

如上 从抛出的异常info得知 react提供了两个 属性 defaultValue 和 defaultChecked。

SCU

PureComponent

练习总结







## 第四章函数组件

### 起步

​    函数式组件,本质上为一个常规函数 接受一个参数props 在函数return中定义该组件输出的视图

​    函数组件不存在 this ,也不存在生命周期函数.

```react
//父级
 <Child info={"父级传递的数据"}></Child>

//接受父级来的props
function Child(props) {
        return <li>fun Child {props.info}</li>
}
export  default  Child;
```

 

### 函数组件带来的问题

  由于 函数式组件每次更新都会重新创建，所以应该尽量的在函数中声明子函数。

复现如下：

```react
class App extends Component {
    state = {
        count: 1
    }
    AddCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <>
            <Child count={this.state.count} AddCount={this.AddCount} ></Child>
        </>
    }
}
```

---->上面为父级 ,下面为字级

```react
//接受父级来的props
function Child({AddCount,count}) {
        console.log("render"); //挂载时会执行第一次
        return <div>
                <p>{count}</p>
                <button onClick={AddCount}>增加</button>
        </div>
}
export  default  Child;
```

**当函数组件每次执行事件通过回调函数将状态更新一次,更新都会重新渲染函数组件**



### Hooks  钩子

   前文 :如果操作视图发生变化需要操作状态，但是状态只有类组件有。17版本 Hooks增加了Hooks

 **Hook 使你在无需修改组件结构的情况下复用状态逻辑。**

​         **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。 -->函数式编程.

​	---/*带use的都是Hooks*/

#### useState

​	**Started: **使用时,需要传入0的初始值,返回的第0个值是当前状态, 第一个值为setCount的方法， 这个初始 state 参数只有在第一次渲染时会被用到。

```react
   const [count, setCount] = useState(0); //参数为初始状态
   return <div>
        <p>{count}</p>
        <button onClick={() => {
            setCount(count + 1);
            console.log("set");  //当前顺序为异步数据流  先set 在render
        }
        }>增加
        </button>
	</div>

```

##### usestate extend

​        由于必然会传入一个初始值,React 实际会将传入值的会先存入一份,最终将值和方法返回出来,并在返回的方法重新渲染。

```js
  let state = null;   
function useSate(init) {
        console.log(state);
        let nowState = state === null ? init : state;
        return [nowState, (newState) => {
            index++;
            state = newState;
            render();
        }]
    }

 render();

    function render() {
        let root = document.querySelector("#root");
        let p = document.createElement("p");
        let btn = document.createElement("button");

        let [count, setCount] = useSate(10);
        p.innerHTML = "count" + count;
        btn.innerHTML = "递增";
        btn.onclick = () => {
            setCount(count + 1);
        }
        root.innerHTML = "";
        root.append(p);
        root.append(btn);
    }
```

多次调用如何保证顺序?  或则说 为什么要保持顺序调用

 由于传入的队列为引用类型,队列的形式传入为地址的引用 ，如果顺序出现异常，会发生不可预料的错误。





#### Effect Hook

​	 React 文档摘要 

​		     useEffect  副作用钩子解析 	语法如下：

```react
    useEffect(()=>{
        return ()=>{
        }
   	 },[]);
```

​      语法 effect 函数  返回值为函数 cleanup 函数 ,[依赖数据] , 用于在react  函数中处理**生命周期**. 

​	  副作用解析：副作用 --> 数据请求,等 DOM 操作

##### 依赖参数

​    从上下一行行执行代码，如果读取到UseFffect 则将对应effect 函数, 会先执行render 函数,然后执行effect队列,但是cleanup并没有执行

如果有 cleanup  更新时一定会是先执行cleanup 函数队列 在执行useFffect 类似于栈，

卸载阶段,找到cleanup 队列，将cleanup队列依次执行

##### 挂载阶段

​    从上到下一行行执行代码，如果读取到UseFffect 则将对应effect 函数, 会先执行render 函数,然后执行effect队列,但是cleanup并没有执行

```react
    useEffect(()=>{
        console.log("effect-1")
        return ()=>{
            console.log("cleanup-1"); 
        }
    },[])

    useEffect(()=>{
        console.log("effect-2")
        return ()=>{
            console.log("cleanup-2");
        }
    },[])
    console.log("render");
```

##### 更新阶段 

​    从上到下执行代码，如果碰到useEffect 则effect函数，存储到一个队列中，当组件更新完成后，找到clenup队列，一次执行， 然后 在去执行effect 队列

​    在执行具体的effect 函数后，或则cleanup函数时，会观察，盖useEffect对应依赖数据，是否有产省变化，则执行， 否则不执行。

##### 卸载阶段

找到对应的 cleaup队列 ，依次执行



##### 依赖参数 

-->更新阶段

 1.如果没有当前参数，则监听组件->组件有更新，就会执行其cleanup 函数和 effect函数

 2.如果有参考具体的依赖参数， 只要你有[a.....]一个到多个,则组件更新时，其依赖参数有变化，会执行其cleanup 的函数 和effect 函数

3.有具体依赖的参数（0个） useEffect(()=>,[]) ,则组件更新时，不会执行其 cleanup 和effect 



#### 通用使用场景

```react
* 挂载完成后 ,做某事
* 更新完成后 ,做某事
* 更新完成和挂载完成后做某事
* 即将卸载时做某事
```

##### 1: 挂载完成后 ,做某事

​	可选参数为空->参数:不依赖于任何数据的更新,(更新阶段)不执行,该参数是不执行。<--挂载完成后 ,做某事

```react
    useEffect(() => {
        return () => {
            console.log("挂载的完成的时候做XX事");
        }
    }, []); 
```

##### 2:更新完成后 ,做某事

  // 不给予依赖参数<--更新完成和挂载完成后做某事

```react
useEffect(() => {
    console.log("更新和挂载后，做某事");
}); 
```

##### 3.即将卸载时做某事

​	和挂载时同理

```react
useEffect(() => {
    console.log("挂载后做某事");
}, []);
```



##### 5.更新完成后 ,做某事

```react
const  isMosnst=useRef(false);

useEffect(()=>{
        if(isMosnst.current){
            console.log("挂载完成做某事");
        }else
        {
            //不要想着 直接赋值
            isMosnst.current=true;
            console.log("挂载完成做某事")
        }
    })
```



######      UseRef  

​		作用于关联节点实例，传递组件更新前的数据，获取函数组件更新的状态, 当前useRef 中存储某个数据时，该数据不会随组件更新而更新

current :***需要用 current属性来获取最新的组件数据**

 example ：**prevCont.current=count;// **

```react
 const contEl = useRef();
   <p ref={contEl}>{count}</p> // ref 绑定给p 标签
```

```react
 useEffect(() => {
        // console.log(prevCont,count);//组件数据不会随着组件数据更新而更新
        // prevCont.current=count;// 需要用 current属性来获取最新(更新后)的组件数据
     			于useRef 不同的是,可以取到更新前的数据,
     			  //更新前的数据 		最新的数据
        console.log(prevCounterInner, contEl.current.innerHTML);
        prevCounterInner.current = contEl.current.innerHTML;
    })
```



##### memo

```
//高级组件-->本质上的东西为一个高阶函数,接受参数参数,返回参数或者函数  --->高阶组件,接受一个组件返回一个新的组件
//shouldComponentUpdate 用法类似于 scu scu 可以通过返回值,来决定组件是否更新
//官方文档 摘要如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现
//React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。<--- React.memo 仅检查 props 变更
const MemoTodo = memo(Todo, (prevProps, nextProps) => {
    let temp= prevProps.todo === nextProps.todo
    console.log(temp);
    return    temp;
    //true -->组件没有更新   false 当前组件发生了更新 /
});
```



###### useMemo

```react
const PlusCount = useMemo(() => {
    //当前的方法是返还函数
    return () => {
        SetCount(count + 1);
    }
}, [count]);
```

当前把“创建”函数和依赖项数组作为参数传入 `useMemo`，

它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如**副作用**这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`

如果没有提供依赖项数组 **useMemo** 在每次渲染时都会计算新的值。



#### 定义自定义hook

逻辑分离 抽离状态







## Redux

起步 :

```shell
 npm install --save redux
```

### 摘要:要点

​		应用中所有的 state 都以对象树的形式存储在单一的的store（闭包的问题,单一的数据可以解决）,惟一改变 state 的办法是触发 action ，一个描述发生什么的对象 , 为了描述 action 如何改变 state 树,你需要更新reducers

```
store ==状态仓库
      -->getState 获取当前状态
      --> dispatch  修改 发起一个action
      ---- 修改state 通过dispatch 发起来action后.
      在store中,会调用reduce函数，并且会将action 和state 传递给reduce函数,并且将state和action 传递给reduce ，reduce被Call后,返回新的state

      reducer 函数
      action =>object     该对象有type属性和payload属性
        -type 属性对state 做出何种修改的描述
```



Code Example

```react
import { createStore } from 'redux'; 

* 这是一个 reducer，形式为 (state, action) => state 的纯函数。
const fn = (state = {count: 1}
    , action) => {
    switch (action.type) {
        case "add":
            return {
                count: state.count + 1
            }
    }
    return state;
}

let store = createStore(counter); //导入对象--创建仓库


///type是固定名称
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({
    type: "add"
})
//改变state 的唯一方法
```

你应该把要做的修改变成一个普通对象，这个对象被叫做 *action*，而不是直接修改 state。然后编写专门的函数来决定每个 action 如何改变应用的 state，这个函数被叫做 *reducer*。





### subscribe

 //subscribe -->监听器
//参数 顾名思义 listener   监听   state 发生的状态

```react
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});
```





Redex三大原则

#### 单一数据源

**整个应用的 [state]被储存在一棵**  **object tree 中，并且这个 object tree 只存在于唯一一个store中**

​	这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易

 state  是只读的，为的改变方法就是触发action ,action是一个描述已经发生事件的普通对象

使用纯函数来执行修改    纯函数:

1 ：相同输入永远返回相同的输出  

2:纯函数内部，不能有任何副作用 

3:该函数只依赖自身参数，而不依赖任何外部数据。
