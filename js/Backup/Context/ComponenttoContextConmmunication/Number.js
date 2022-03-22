import {Component} from "react";
import context from "../context/Context"

class Number extends Component {
    static contextType = context;//属于Proves
    addNumber = () => {
        this.context.addNumber();
    }
    addCount = () => {
        this.context.addCount();
    }

    render() {
        const {number} = this.context;
        return <>
            <p>NUMBER :Count:{number}</p>
            <button onClick={this.addNumber}>Btn</button>
        </>
    }
}

export default Number;
