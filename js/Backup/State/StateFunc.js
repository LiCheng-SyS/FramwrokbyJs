import {Component} from "react";

class App extends Component {
    //状态 state 状态的修改
    //2. 在React 中state 是不可变值，唯一修改的state 的办法就是调用setState ，根据原有的状态映射状态


    state = {
        count: 1,
        nub: 10,
        //复杂对象
        data: {
            name: 'cheng',
            age: 10
        }
    }
    //setState (state,fun) 该对象包含中的属性,是我们要修改的状态,setState 会帮我们进行浅合并

    //setState 方法被调用后,组件在更新时，会重新执行Render方法
    render() {
        const {count, nub, data} = this.state;
        return <div>
            <p>count:{count}</p>
            <button onClick={() => {
                this.setState({count: count + 1})
            }}>按钮-加法
            </button>
            <p>nub:{nub}</p>
            <button onClick={() => {
                this.setState({nub: nub - 1})
            }}>按钮-减法
            </button>
            <p>name:{data.name},age:{data.age}</p>
            <button onClick={() => {
                this.setState({
                    //错误示范：Name 会被覆盖
                    // data:{
                    //     age: data.age + 1
                    // }
                    //正确是应该将 对象直接解构出来
                    data: {
                        ...data,
                        age: data.age + 1
                    }
                })
            }}>按钮change
            </button>

            <p>nub:{nub}</p>
            <button onClick={() => {
                this.setState(function () {
                    return {
                        nub: nub + 5
                    }
                }, () => {
                    console.log('当前参数更新完成')
                })
            }}>function
            </button>


        </div>
    }
}


export default App;
