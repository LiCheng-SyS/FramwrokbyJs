import {Component} from "react";
import Todo from "./Todo";

class Todos extends Component {
    render() {
        return <ul id="todo-list">
            <Todo></Todo>
        </ul>
    }
}

export default Todos;
