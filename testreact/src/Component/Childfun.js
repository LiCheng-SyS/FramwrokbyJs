import {Component} from "react";

class Childfun extends Component {
    state = {
        count: 1,
        show: true
    }

    static getDerivedStateFromProps(props, state) {
        //如果是更新阶段是nextProps, nextState  ， 也就是更新后
        console.log("next2 将props映射到state中")
        // console.log(props, state);
        return props;
    }

    changeShow = () => {
        this.setState({
            show: !this.state.show
        });
    }

    //当前的 也是挂载阶段的第一步将父级props的映射到 state中

    //挂在阶段 第二
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("5 shouldComponentUpdate");
        /*其实这样就可以拿到更新前后的差异了*/
        /*当前返回值决定了组件是否会继续往下更新 如果false 则生命周期不会向下了 组件停止更新*/
        console.log("prev", this.state, this.props);
        console.log("next", nextProps, nextState);
        return true;
    }


    /*可选生命周期函数 必须为相互配合*/

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(4, "DOM快照");
        //组件更新已经生成了 vir dom  但是没有更新真实DOM之前执行，
        // 用于获取更新前的DOM信息 比如很长的列表每次更新后 会多几项，如果希望有动画，将内容移动最顶部
        //如果长度不可知,可能高度位置 就需要更新前的高度和宽度进行计算
        return document.querySelector("#box").innerHTML;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(snapshot);//第三个参数为返回值 更新前的DOM  更新完成 DOM DOM操作及其数据请求
    }

    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    componentDidMount() {
        console.log("4 挂载完成，已经加载完成虚拟DOM ，并且添加到DOM了中");
        /*一般进行Dom操作和数据请求*/
    }

    render() {
        console.log('3 ,生产VirDOM');
        const {count, nub, addNUB, show} = this.state
        //console.log(this.state);
        return (
            <>
                {show ?
                    <div id="box">
                        <p>NUMBER :Count:{count}</p>
                        <button onClick={this.addCount}>按钮</button>
                        <hr></hr>

                        <p> NUB:{nub}</p>
                        <button onClick={addNUB}>add</button>
                    </div>
                    : ""}
                <button onClick={this.changeShow}>更新</button>
            </>

        )
    }
}

export default Childfun;
