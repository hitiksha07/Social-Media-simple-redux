import { ADDCOMM, COMMENT, COMMENTUPDATE, DELETECOMMENT } from "../Type/Type"
import axios from 'axios';

export const getCommentApi = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3001/comments?postId=' + id).then(res => {
            dispatch(getComment(res.data, id))
            // console.log(res.data)
        })
    }
}
export const addCommentAction = (obj,postId) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/comments', obj).then(res => {
            // console.log('add',res.data)
            dispatch(getCommentApi(postId))
        })
    }
}
export const editcommentApidata = (obj, postId) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/comments/${obj.id}`, obj).then(res => {
            console.log('edit', res.data)
            // dispatch(getCommentApi(id))
            dispatch({
                type: COMMENTUPDATE,
                data: res.data,
                id: obj.id,
                postId
            })
        })
    }
};
export const deleteCommentApiData = (id, postId) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/comments/${id}`).then(res => {
            // console.log('delete',res.data)
            // dispatch(getCommentApi(postId))
            dispatch({
                type: DELETECOMMENT,
                data: res.data,
                id,
                postId
            })
        })
    }
};

const getComment = (data, postId) => {
    return {
        type: COMMENT,
        data: data,
        postId
    }
}