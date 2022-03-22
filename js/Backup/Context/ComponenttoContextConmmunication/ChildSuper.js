import {Component} from "react";
import {Consumer} from "../context/Context"

//Consumer 是解构出来的对象
//必须返回一个函数
//它会将context的信息通过参数传递给当前函数 就可以通过解构拿到两个方法和对象

class ChildSuper extends Component {
    //获取返回函数
    render() {
        return <Consumer>
            {({count, addCount}) => {
                return <>
                    <p>ChildSuper: Count:{count}</p>
                    <button onClick={addCount}>Btn</button>
                </>
            }}

        </Consumer>
    }
}

export default ChildSuper;
