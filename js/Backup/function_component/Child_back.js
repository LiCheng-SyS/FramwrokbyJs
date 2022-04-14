

//接受父级来的props
function Child({AddCount,count}) {
        console.log("render");
        return <div>
                <p>{count}</p>
                <button onClick={AddCount}>增加</button>
        </div>
}
