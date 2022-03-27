import {Component} from "react";

class todo extends Component {
    render() {
        return <li className="">
            <div className="todo done">
                <div className="display"><input className="check" type="checkbox"/>
                    <div className="todo-content">今晚上王者</div>
                    <span className="todo-destroy"></span>
                </div>
                <div className="edit">
                    <input className="todo-input" type="text"/>
                </div>
            </div>
        </li>

    }
}

export default todo;
