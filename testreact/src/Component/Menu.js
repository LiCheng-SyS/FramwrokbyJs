import {Component} from "react";

class Menu extends Component {
    state = {
        show: false
    }

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    //指向的是构造函数的实例 从而bind 方法
    // clickHandler = function () {
    //     console.log(this);
    // }

    //事件源
    //组织默认元素的默认行 如:a标签的:herf:
    clickHandler = (e) => {
        console.log(this, e.target);
        e.preventDefault();//事件
        e.stopPropagation();//阻止冒泡
    }

    /*
    React 事件
     1:事件的this 指向 的是undefined-->
      处理函数的问题
      1:=>函数
      2:this绑定
    */
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
}

export default Menu;
