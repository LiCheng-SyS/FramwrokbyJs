import {Component} from "react";

class todo extends Component {
    remove = () => {
        //console.log(this.props);
        const {removeTodo, todo} = this.props;

        removeTodo(todo.id);
        //console.log(todo.id);
    }
    ChangeTodos = ({target}) => {
        const {ChangeTodo, todo} = this.props;
        ChangeTodo(todo.id, target.checked);
    }
    //坑1
    // remove() {
    //     console.log(this.props);
    //     const {removeTodo, todo} = this.props;
    //
    //     removeTodo(todo.id);
    //     console.log(todo.id);
    // }
    //如果直接是方法 会造成this丢失 [Cannot read properties of undefined (reading 'props')]
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //scu 可以通过返回值,来决定组件是否更新
        //通过返回值决定是否更新 对比之前props 是否有变化.
        //基于scu的更新
        //更新前后差异
        console.log(nextProps, nextState, nextContext);
        //如果  === 则表示没更新过，不一代表存在差异
        return nextProps.todo !== this.props.todo;
    }


    render() {
        //子组件用props拿数据

        /*拿到父级的数据后解构*/
        const {title, done, id} = this.props.todo;
        //id? 都为0了? 如何优化更行时全部渲染呢?
        console.log(id, "render");
        return <li className="">
            <div className={`todo ${done ? "done" : ""}`}>
                <div className="display"><input className="check"
                                                type="checkbox"
                                                checked={done}
                                                onChange={this.ChangeTodos}/>
                    <div className="todo-content">{title}</div>
                    <span className="todo-destroy" onClick={this.remove}></span>
                </div>
                <div className="edit">
                    <input className="todo-input" type="text"/>
                </div>
            </div>
        </li>

    }
}

export default todo;
