import { USER } from "../Type/Type";

let initialState = {
    user: []
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return {
                user: [...action.data]
            };
        default:
            return state;
    }
}