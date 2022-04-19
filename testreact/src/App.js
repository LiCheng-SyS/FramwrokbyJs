import {Component} from "react";
import Child from "./Component/Childbackup.js";
import EffectRef from "./Component/EffectRef";
import Childbackup from "./Component/Childbackup.js";


class App extends Component {
    state = {
        count: 1
    }
    AddCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <>

            <EffectRef count={this.state.count} AddCount={this.AddCount} ></EffectRef>
        </>
    }
}

export default App;
// <Childbackup></Childbackup>

