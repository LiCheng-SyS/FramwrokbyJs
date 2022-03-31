import {Component} from "react";
import Todo from "./Todo";

/*key 是属性  类似与Vue for 会给出一个虚拟dom
* 如果列表发生变化 需要通过整个key编号 标记用于对比  key不能重复且必须唯一
* */
class Todos extends Component {
    render() {
        /*技巧如果通过构造器属性传值  如果涉及ul 可以通过key 进行给组件属性进行进行映射
        *  父级已经向子级传递数据
        * */
        const {todo} = this.props;
        return <ul id="todo-list">
            {
                todo.map(item => <Todo key={item.id} {...this.props} todo={item}/>)
            }</ul>
    }


}

export default Todos;
