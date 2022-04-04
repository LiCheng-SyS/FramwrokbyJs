import {Component} from "react";


class Menu extends Component {
    //用 生命周期
    state = {
        open: false
    };

    static getDerivedStateFromProps(props) {
        return props;
    }

    openHaler = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const {data, open} = this.state;
        const {list, title} = data;
        return (
            <dl className={"friend-group " + (open ? "expanded" : "")}>
                <dt onClick={this.openHaler}>{title}</dt>
                {
                    list.map((value, index) => <dd key={index}>{value}</dd>)
                }
            </dl>
        );
    }
}

export default Menu;
