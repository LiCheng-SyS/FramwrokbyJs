import {Component} from "react";
import ChildSuper from "./ChildSuper";
import Number from "./Number";

//当前为基类组件 -->调用可以新增的组件
class Child extends Component {
    render() {
        return <>
            <ChildSuper></ChildSuper>
            <Number></Number>
        </>
    }
}

export default Child;
