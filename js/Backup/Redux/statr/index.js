import {createStore} from 'redux';

const fn = (state = {count: 1}
    , action) => {
    switch (action.type) {
        case "add":
            return {
                count: state.count + 1
            }
    }
    return state;
}
//// 创建 Redux store 来存放应用的状态。
const store = createStore(fn);
console.log(store);

// 创建 Redux store 来存放应用的状态。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({
    type: "add"
})

///type是固定名称

console.log(store.getState());

/*
store ==状态仓库
      -->getState 获取当前状态
      --> dispatch  修改 发起一个action
      ---- 修改state 通过dispatch 发起来action后.
      在store中,会调用reduce函数，并且会将action 和state 传递给reduce函数,并且将state和action 传递给reduce ，reduce被Call后,返回新的state

      reducer 函数
      action =>object     该对象有type属性和payload属性
        -type 属性对state 做出何种修改的描述
* */


/*应用中所有的 state 都以对象树的形式存储在单一的的store（闭包的问题,单一的数据可以解决）
惟一改变 state 的办法是触发 action ，一个描述发生什么的对象。 为了描述 action 如何改变 state 树,你需要更新reducers
 */

//reducer 纯函数


//subscribe -->监听器
//参数 顾名思义 listener   监听
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


//
setTimeout(() => {
    store.replaceReducer((state = {count: 1},
                          action) => {
        switch (action.type) {
            case "add":
                return {
                    count: state.count + 5
                }
        }
        return state;
    });
}, 4000)

//可以监控仓库中状态
setTimeout(() => {
    store.dispatch({
        type: "add"
    });
}, 1000);