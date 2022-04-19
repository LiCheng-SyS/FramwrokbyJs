// import {useEffect, useRef, useState} from "react"
//
// /*
// useEffect 作用用于替换生命周期,在函数中有处理副作用,类似于类组件中生命周期函数
// * 挂载完成后 ,做某事
// * 更新完成后 ,做某事
// * 更新完成和挂载完成后做某事
// * 即将卸载时某事
//
// */
//
// let isMount=false; //如果两个组件同用一个全局变量,就会出现问题。   建议还是在组件内部存储状态
// function Child() {
//
//     const [count, setCount] = useState(0); //参数为初始状态
//     const [val, setValue] = useState("D");
//     const  isMosnst=useRef(false);
//     useEffect(() => {
//         return () => {
//             console.log("挂载的完成的时候做XX事");
//         }
//     }, []); //该参数:不依赖于任何数据的更新,(更新阶段)不执行,该参数是不执行。<--挂载完成后 ,做某事
//
//     useEffect(() => {
//         console.log("更新和挂载后，做某事");
//     });   // 不给予依赖参数<--更新完成和挂载完成后做某事
//
//     useEffect(() => {
//         console.log("挂载后做某事");
//     }, []);
//
//     useEffect(()=>{
//         if(isMosnst.current){
//             console.log("挂载完成做某事");
//         }else
//         {
//             //不要想着 直接赋值
//             isMosnst.current=true;
//             console.log("挂载完成做某事")
//         }
//     })
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
//                    setValue(target.value)
//                }
//                }/>
//     </div>
// }
//
// //受控组件回调  不然会报错
// export default Child;