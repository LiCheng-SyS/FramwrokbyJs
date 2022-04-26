//两种方法---


import {connect} from "react-redux";

//connect(select:{state}) return {count:state:count}

function count(Props) {
    console.log(Props);
    return <div>
        <p> count :{0}</p>
        <button>递增</button>
    </div>
}

const withConnent = connect(state = ({count: state.count}));
const NewCount = withConnent(count);
///count 可以获取到截取后的state ，已及dispatch方法
export default NewCount;