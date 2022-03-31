import {Component} from "react";

class Count extends Component {
    state = {
        count: 1
    }

    render() {
        const {count} = this.state;
        return <div>
            <p>{count}</p>
            <button onClick={() => {
                this.setState({
                    count: count + 1
                })
            }
            }>按钮
            </button>
        </div>
    }
}

export default Count;
