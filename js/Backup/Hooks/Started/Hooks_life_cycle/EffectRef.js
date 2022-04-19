// import {useEffect, useRef, useState} from "react"
//
// /*
// useRef
// 关联节点实例
//  传递组件更新前的数据  -->获取函数组件更新的状态, 当前useRef 中存储某个数据时，该数据不会随组件更新而更新
// */
//
//
// function EffectRef() {
//
//     const [count, setCount] = useState(0); //参数为初始状态
//     const [val, setValue] = useState("D");
//     const contEl = useRef();
//     const prevCont = useRef(count);
//     const prevCounterInner = useRef();
//     useEffect(() => {
//         // console.log(prevCont,count);//组件数据不会随着组件数据更新而更新
//         // prevCont.current=count;// 需要用 current属性来获取最新(更新后)的组件数据
//         console.log(prevCounterInner, contEl.current.innerHTML);
//         prevCounterInner.current = contEl.current.innerHTML;
//     })
//     return <div>
//         <p ref={contEl}>{count}</p>
//         <button onClick={() => {
//             setCount(count + 1);
//             console.log("set");  //当前顺序为异步数据流  先set 在render
//         }}>增加
//         </button>
//         <input type={"text"} value={val}
//                onChange={({target}) => {
//                    setValue(target.value)
//                }
//                }/>
//         <input type={"text"} value={val}
//                onChange={({target}) => {
//                    setValue(target.value)
//                }
//                }/>
//     </div>
// }
//
// //受控组件回调  不然会报错
// export default EffectRef;