import {USER } from "../Type/Type"
import axios from 'axios';

export const getApidata = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/user').then(res => {
            dispatch(getApi1(res.data))
        })
    }
}

export const addApiData = (obj) => {
    return (dispatch) => {
        axios.post(' http://localhost:3001/user',obj).then(res => {
            console.log('add',res.data)
            dispatch(getApidata())
        })
    }
}
export const deleteApiData = (id) => {
    return (dispatch) => {
        axios.delete(` http://localhost:3001/user/${id}`).then(res => {
            console.log('delete',res.data)
            dispatch(getApidata())
        })
    }
};
export const editApidata = (obj) => {
    return (dispatch) => {
        axios.put(` http://localhost:3001/user/${obj.id}`, obj).then(res => {
            console.log(res.data)
            dispatch(getApidata())
        })
    }
};
const getApi1 = (data) => {
    return {
        type: USER,
        data: data
    }
}