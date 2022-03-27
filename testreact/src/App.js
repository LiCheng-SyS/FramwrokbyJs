import {Component} from "react";
import "./index.css"
import Todos from "./Component/Todos";
import Stats from "./Component/Stats"

class App extends Component {


    /*双向绑定 受控组件 input 的受控组件-->*/
    render() {
        return (
            <>
                <div id="todoapp">
                    <div className="title">
                        <h1>todo</h1>
                    </div>

                    <div id="create-todo"><input id="new-todo" placeholder="What needs to be done?"
                                                 autoComplete="off" type="text"/>
                    </div>
                    <Todos></Todos>
                    <Stats></Stats>

                </div>

            </>
        )
    }

}


export default App;
