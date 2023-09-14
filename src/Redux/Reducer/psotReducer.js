import { COMMENT, COMMENTUPDATE, DELETECOMMENT, LIKE, POST } from "../Type/Type";

let initialState = {
    Post: [],
};
export const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST:
            return {
                Post: [...action.data]
            };
        case COMMENT:
            let allPost = state.Post;
            let index = allPost?.findIndex(x => x.id == action.postId);
            allPost[index].comment = action.data || []
            // console.log('post',[...allPost[index].comment])
            return {
                Post: [...allPost]
            };
        case COMMENTUPDATE:
            let upPostCom = state.Post;
            let index2 = upPostCom?.findIndex(x => x.id == action.postId);
            let i = upPostCom[index2].comment.findIndex(x => x.id == action.data.id)
            // upPostCom[index2].comment.splice(action.i, 1, action.data);
            upPostCom[index2].comment[i] = action.data;
            // console.log('first', upPostCom[index2].comment)
            return {
                ...state,
                Post: [...upPostCom]
            }
        case DELETECOMMENT:
            let postAll = state.Post;
            let index1 = postAll?.findIndex(x => x.id == action.postId);
            let del = postAll[index1].comment.filter(({ id }) => id !== action.id);
            postAll[index1].comment = del
            return {
                ...state,
                Post: [...postAll]
            }
        default:
            return state;
    }
}