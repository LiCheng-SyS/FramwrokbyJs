import {Component} from "react";

class Child extends Component {
    render() {
        console.log(this.props)
        return <div>
            {this.props.children[0]}
            {this.props.children[1]}
            {this.props.children[2]()}
        </div>
    }
}

export default Child;
