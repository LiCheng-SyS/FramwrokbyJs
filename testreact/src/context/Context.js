import {createContext} from "react";

const context = createContext();
/*Provider：父级向子孙级传递*/   /*Consumer :子孙后代接受及传输过来的值*/
const {Provider, Consumer} = context;

export {Provider, Consumer};
export default context;

