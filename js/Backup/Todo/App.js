import {Component} from "react";
import "./index.css"
import Todos from "./Component/Todos";
import Stats from "./Component/Stats"

class App extends Component {
    /*是否做完*/
    state = {
        todo: [
            {
                id: 0,
                title: "目标是react 1",
                done: false
            }, {
                id: 1,
                title: "目标是react coles",
                done: false
            }

        ]
    }

    /*sate 是不可变的 ,在修改不要直接更改,而必须是映射新的出 修该的state*/
    /*类似于引用类型 我如果修改了引用类型,会产生新的对象,指向原有的对象*/
    addTodo = ({keyCode, target}) => {
        const {todo} = this.state;
        if (keyCode === 13) {
            if (target.value.trim()) {
                // todo.push({
                //     id: Date.now(),
                //     title: target.value,
                //     done: false
                // });//问题
                this.setState({
                    todo: [
                        ...todo, {
                            id: Date.now(),
                            title: target.value,
                            done: false
                        }
                    ]
                })
            }
        }
        target.value = "";
    }
    removeTodo = (id) => {
        //id删除必须有id
        const {todo} = this.state;
        this.setState({
            todo: todo.filter(item => item.id !== id)
        });
    }
    ChangeTodo = (id, done) => {
        const {todo} = this.state;
        //  console.log(id); //如果选中值有id 则赋值给新值
        // todo.forEach(item => {
        //     console.log(item);
        //     if (item.id === id) {
        //         item.done = done;
        //     }
        // })
        //需要映射值 不能直接修改引用 同样 用map 映射新的地址
        this.setState({
            todo: todo.map(item => {
                if (item.id === id) {
                    item.done = done;
                    return {
                        ...item,
                        done
                    }
                }
                return item;
            })
        })
    }
    editTodo = (id, title) => {
        const {todo} = this.state;
        this.setState({
            todo: todo.map(item => {
                if (item.id === id) {

                    return {
                        ...item,
                        title
                    }
                }
                return item;
            })
        })
    }

    /*双向绑定 受控组件 input 的受控组件-->*/
    render() {
        const {todo} = this.state;
        return (
            <>
                <div id="todoapp">
                    <div className="title">
                        <h1>todo</h1>
                    </div>

                    <div id="create-todo"><input id="new-todo" placeholder="What needs to be done?"
                                                 autoComplete="off" type="text" onKeyDown={this.addTodo}/>
                    </div>
                    <Todos todo={todo}
                           removeTodo={this.removeTodo}
                           ChangeTodo={this.ChangeTodo}
                           editTodo={this.editTodo}>
                    </Todos>
                    <Stats></Stats>

                </div>

            </>
        )
    }

}


export default App;
