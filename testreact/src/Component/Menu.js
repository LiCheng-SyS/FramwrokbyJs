import {Component} from "react";

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

export default Menu;
