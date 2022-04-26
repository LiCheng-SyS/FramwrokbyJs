import {useCallback, useMemo, useState} from "react";


export default () => {
    const [count, SetCount] = useState(1);
    const [nub, SetNub] = useState(1);
    const maxVal = useMemo(() => {
        return nub > count ? "nub" : "count";
    }, [nub, count]);


    //组件在更新的时候 如果无关的函数是不需要参与计算的 useMemo

    const PlusCount = useMemo(() => {
        //当前的方法是返还函数
        return () => {
            SetCount(count + 1);
        }
    }, [count]);

    // const PlusCount = () => {
    //     SetCount(count + 1);
    // }
    // const minusCount = () => {
    //     SetCount(count - 1);
    // }
    const minusCount = useCallback(() => {
        SetCount(count - 1)
    }, [count]);

    const nubCount = useCallback(() => {
        SetNub(nub - 1);
    }, [nub])

    const plusNub = useCallback(() => {
        SetNub(nub + 1);
    }, [nub]);

    const [val, setVal] = useState("");

    // const ChangeVal = ({target}) => {
    //     setVal(target.value);
    // }
    const ChangeVal = useCallback(({target}) => {
        setVal(target.value);
    }, [val]);
    return <div>
        <p>Count: <button onClick={PlusCount}>+</button>{count}
            <button onClick={minusCount}>-</button>
        </p>
        <p>nub: <button onClick={plusNub}>+</button>{nub}
            <button onClick={nubCount}>-</button>
        </p>
        <p>当前比较大的是{maxVal}</p>

        <input type={"text"} value={val} onChange={ChangeVal}/>
        <p>{val}</p>
    </div>
};
