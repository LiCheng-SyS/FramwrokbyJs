import {Component} from "react";
import "./index.css"
import Menu from "./Component/Menu";
import data from "./data";


class App extends Component {
    render() {
        // Each child in a list should have a unique "key" prop.没K报错
        return <div className="friend-list">
            {data.map((value, index) => {
                return <Menu key={index} data={value}></Menu>
            })}
        </div>
    }
}
export default App;
