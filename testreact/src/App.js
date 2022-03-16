import {Component} from "react";

class App extends Component {
    //状态 state 状态的修改
    //2. 在React 中state 是不可变值，唯一修改的state 的办法就是调用setState ，根据原有的状态映射状态


    state = {
        count: 1,
        nub: 10,
    }
    //setState (state,fun) 该对象包含中的属性,是我们要修改的状态,setState 会帮我们进行浅合并

    //setState 方法被调用后,组件在更新时，会重新执行Render方法
    render() {
        const {count} = this.state;
        return <div>


        </div>
    }
}


export default App;
