import {createStore} from "redux";


function count(state = {
    count: 1,
    nub: 5
}, action) {
    switch (action.type) {
        case "count-add":
            return {
                ...state,
                count: state.count + 1
            }
        case "nub-add":
            return {
                ...state,
                count: state.nub + 1
            }
        case "count-sub":
            return {
                ...state,
                count: state.count - 1
            }
        case "nub-sub":
            return {
                ...state,
                count: state.count - 1
            }
    }

    return state;
}

export default createStore(count);