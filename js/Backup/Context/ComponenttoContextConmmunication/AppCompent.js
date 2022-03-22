import {Component} from "react";
import "./index.css";
import Child from "./Component/Child";
import {Provider} from "./context/Context";

/*
  跨曾
*/

class App extends Component {
    state = {
        number: 10, count: 1
    }
    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    addNumber = () => {
        this.setState({
            number: this.state.number + 5
        })
    }

    /*value 属性的值*/
    render() {
        return (
            <>
                <Provider value={{
                    ...this.state,
                    addCount: this.addCount,
                    addNumber: this.addNumber
                }}>
                    <Child></Child>
                </Provider>
            </>
        )
    }
}


export default App;
