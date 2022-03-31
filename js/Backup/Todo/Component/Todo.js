import {createRef, PureComponent} from "react";

/*PureComponent 对象 也达到浅对比 必须是正确的state 的改变  不要直接修改sate*/

/*如果 todo为空时,则恢复   我的知道修改前的值*/
class todo extends PureComponent {
    state = {
        edit: false
    }
    //拿到的是当前实例的引用
    editInput = createRef();

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editVal: props.todo.title//这里可以拿到修改前的值
        }
    }

    static getDerivedStateFromProps(props) {
        //可以直接用从this拿到父级穿过来的值
        return props.todo;
    }

    remove = () => {
        //console.log(this.props);
        const {removeTodo, todo} = this.props;

        removeTodo(todo.id);
        //console.log(todo.id);
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
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     //scu 可以通过返回值,来决定组件是否更新
    //     //通过返回值决定是否更新 对比之前props 是否有变化.
    //     //基于scu的更新
    //     //更新前后差异
    //     console.log(nextProps, nextState, nextContext);
    //     //如果  === 则表示没更新过，不一代表存在差异
    //     return nextProps.todo !== this.props.todo;
    // }

    ChangeTodos = ({target}) => {
        const {ChangeTodo, todo} = this.props;
        ChangeTodo(todo.id, target.checked);
    }

    changeEdit = () => {
        this.setState({
            edit: true
        }, () => {
            //第二个参数  由于组件更新后的回调 //本次setstate 引起组件更新,更新完成
            this.editInput.current.focus();
        })
    }

    CancelEdit = () => {
        const {editVal} = this.state;
        console.log(editVal, "更新前")
        const {editTodo, todo} = this.props;
        console.log(editTodo, todo);
        if (editVal.trim()) {
            editTodo(todo.id, editVal);
        } else {
            this.setState({
                editVal: todo.tilde
            })
        }
        this.setState({
            edit: false
        })
    }

    editTitle = ({target}) => {
        // const {editTodo, todo} = this.props;
        // editTodo(todo.id, target.value);
        this.setState({
            editVal: target.value
        })
    }

    componentDidMount() {
        //我们可以在组件挂载完成后log下
        ///  console.log(this.editInput);
        //当前属性就是存储的实例 current: input.todo-input
    }

    render() {
        //子组件用props拿数据

        /*拿到父级的数据后解构*/
        const {title, done, edit, editVal} = this.state;
        //id? 都为0了? 如何优化更行时全部渲染呢?
        /* 如果没有获取，就不会失去焦点  失去焦点*/
        //  console.log(this.state);//就无需从props 中拿到东西了
        //一样通过state 的状态来控制属性
        return <li className={edit ? "editing" : ""}>
            <div className={`todo ${done ? "done" : ""}`}>
                <div className="display"><input className="check"
                                                type="checkbox"
                                                checked={done}
                                                onChange={this.ChangeTodos}/>
                    <div className="todo-content"
                         onDoubleClick={this.changeEdit}>{title}</div>
                    <span className="todo-destroy" onClick={this.remove}></span>
                </div>
                <div className="edit">
                    <input className="todo-input" type="text"
                           ref={this.editInput}
                        //ref 对应的实例存储对应对象中
                           onBlur={this.CancelEdit}
                           value={editVal}
                           onChange={this.editTitle}
                    />
                </div>
            </div>
        </li>

    }
}

export default todo;
