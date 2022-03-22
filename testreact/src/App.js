import {Component} from "react";
import "./index.css";
import Child from "./Component/Child";
import {Provider} from "./context/Context";
import Childfun from "./Component/Childfun";

/*
  跨曾
*/

class App extends Component {
    state = {
        nub: 1
    }

    constructor(props) {
        super(props);
        console.log("初始化成功");
    }

    addNub = () => {
        this.setState({
            nub: this.state.nub + 5
        })
    }

    /*value 属性的值*/
    render() {
        const {nub} = this.state;
        console.log(this.state)
        return (
            <>
                <Childfun nub={nub} addNUB={this.addNub}></Childfun>
            </>
        )
    }
}


export default App;
