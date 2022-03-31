import {Component} from "react";
import "./index.css"
import Child from "./Component/child";
import Count from "./Component/count";
// import Count from "./Component/Count";

//插槽 solt
class App extends Component {
    /*是否做完*/
    state = {}

    /*双向绑定 受控组件 input 的受控组件-->*/
    render() {
        const {todo} = this.state;
        return (
            <div>
                <Child>
                    <p>this children</p>
                    <Count></Count>
                    {() => {
                        console.log('this children');
                        return <div>this children</div>
                    }}
                </Child>
            </div>
        )
    }

}


export default App;
