import {Component} from "react";
import "./index.css";
import data from "./Data";
import Menu from "./Component/Menu";

/*
props 当父组件条用子组件时，可以将传递的数据添加在子组件的属性中-->子可以通过pros 属性来接受父级组件的传递的信息数据
*/

class App extends Component {
    /*子级向父级传递*/
    state = {
        box_state: ""//记录当前哪一项展开
    }

    changeOpen = (box_state) => {
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


export default App;
