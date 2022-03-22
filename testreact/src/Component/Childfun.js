import {Component} from "react";

class Childfun extends Component {
    state = {
        count: 1
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props, state);
        return props;
    }

    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        const {count, nub, addNUB} = this.state
        console.log(this.state);
        return <>
            <p>NUMBER :Count:{count}</p>
            <button onClick={this.addCount}>按钮</button>
            <hr></hr>

            <p> NUB:{nub}</p>
            <button onClick={addNUB}>add</button>
        </>
    }
}

export default Childfun;
