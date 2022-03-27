import {Component} from "react";

class App extends Component {
    state = {
        val: "",
        checked: false
    }

    /*双向绑定 受控组件 input 的受控组件-->*/
    render() {
        const {val, checked} = this.state;
        return (
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

                {/*<input type={"checkbox"}*/}
                {/*       checked={checked}*/}
                {/*       onChange={({target}) => {*/}
                {/*           this.setState({*/}
                {/*               checked: target.checked*/}
                {/*           })*/}
                {/*       }}*/}
                {/*/>*/}
                {/*<button onClick={() => {*/}
                {/*    this.setState({*/}
                {/*        checked: !checked*/}
                {/*    })*/}
                {/*}}>{checked ? "选中" : "不选中"}</button>*/}

                <input type={"text"} defaultValue={"我是初始化值"}/>

            </>
        )
    }

}


export default App;
