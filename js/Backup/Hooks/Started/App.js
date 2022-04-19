import {Component} from "react";
import Child from "./Component/Child";


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

export default App;
