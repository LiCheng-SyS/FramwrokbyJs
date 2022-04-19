// import {useEffect, useState} from "react"
//
// /*带use的都是Hooks*/
//
// function Child() {
//     //使用时,需要传入0的初始值,返回的第0个值是当前状态, 第一个值为setCount的方法
//     // useState 的1: 可以通过useState  声明状态,并且可以多次调用  ,声明多个状态
//     //
//     const [count, setCount] = useState(0); //参数为初始状态
//     const [val, setValue] = useState("D");
//
//     useEffect(()=>{
//         console.log("effect-1")
//         return ()=>{
//             console.log("cleanup-1");
//         }
//     },[count])
//
//     useEffect(()=>{
//         console.log("effect-2")
//         return ()=>{
//             console.log("cleanup-2");
//         }
//     },[])
//
//
//     console.log("render");
//     //语法  effect 函数  返回值为函数 cleanup 函数 [依赖数据]  用于在react  函数中处理生命周期
//     //  副作用 --> 数据请求 DOM 操作
//     //数组解构
//
//     return <div>
//         <p>{count}</p>
//         <button onClick={() => {
//             setCount(count + 1);
//             console.log("set");  //当前顺序为异步数据流  先set 在render
//         }
//         }>增加
//         </button>
//         <input type={"text"} value={val}
//                onChange={({target}) => {
//                    setValue(target.value)
//                }
//                }/>
//         <input type={"text"} value={val}
//                onChange={({target}) => {
//                    setValue(target.value)}
//                }/>
//     </div>
// }
//
// //受控组件回调  不然会报错
// export default Child;