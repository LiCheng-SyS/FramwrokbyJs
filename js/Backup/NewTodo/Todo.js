import {memo, useEffect, useRef, useState} from "react";

function Todo({todo, changeDone, removeTodo, editTodo}) {
    const [edit, setEdit] = useState(false);
    const {id, title, done} = todo;
    const editInput = useRef();
    const [editVal, setEditVal] = useState(title);
    const checkDone = ({target}) => {
        changeDone(id, target.checked);
    };
    const toEdit = () => {
        setEdit(true);
    };
    const remove = () => {
        removeTodo(id);
    };
    const cancelEdit = () => {
        if (editVal.trim()) {
            editTodo(id, editVal);
        } else {
            setEditVal(title);
        }
        setEdit(false);
    };
    const editTitle = ({target}) => {
        setEditVal(target.value);
    };
    useEffect(() => {
        if (edit) {
            editInput.current.focus();
        }
    }, [edit]);
    console.log(id, "render");
    return <li className={edit ? "editing" : ""}>
        <div className={`todo ${done ? "done" : ""}`}>
            <div className="display">
                <input
                    className="check"
                    type="checkbox"
                    checked={done}
                    onChange={checkDone}
                />
                <div
                    className="todo-content"
                    onDoubleClick={toEdit}
                >{title}</div>
                <span className="todo-destroy" onClick={remove}></span>
            </div>
            <div className="edit">
                <input
                    className="todo-input"
                    type="text"
                    ref={editInput}
                    onBlur={cancelEdit}
                    value={editVal}
                    onChange={editTitle}
                />
            </div>
        </div>
    </li>
}

//高级组件-->本质上的东西为一个高阶函数,接受参数参数,返回参数或者函数  --->高阶组件,接受一个组件返回一个新的组件
//shouldComponentUpdate 用法类似于 scu scu 可以通过返回值,来决定组件是否更新
//官方文档 摘要如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现
//React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。<--- React.memo 仅检查 props 变更
const MemoTodo = memo(Todo, (prevProps, nextProps) => {
    let temp= prevProps.todo === nextProps.todo
    console.log(temp);
    return    temp;
    //true -->组件没有更新   false 当前组件发生了更新 /
});

export default MemoTodo;


