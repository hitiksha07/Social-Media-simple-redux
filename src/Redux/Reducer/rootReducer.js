import { combineReducers } from "redux";
import { reducer } from "./reducer";
import { PostReducer } from "./psotReducer";
// import { commentReducer } from "./commentReducer";

export const rootReducer = combineReducers({
    user: reducer,
    Post: PostReducer,
    // comment:commentReducer
})