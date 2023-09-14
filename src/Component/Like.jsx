import React, { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { editPostApidata } from '../Redux/Action/PostAction';

function Like(props) {
    // console.log(props.like)
    let user = JSON.parse(localStorage.getItem('account'))
    const [isActive, setisActive] = useState(props.like.includes(user.id) ? true : false);
    let post = useSelector(state => state.Post.Post)
    let likeData = post?.find(x => x.id == props.postId)
    let dispatch = useDispatch()
    function show() {
        if (!isActive) {
            setisActive(true);
            // console.log('like');
            likeData?.like?.push(user.id)
            dispatch(editPostApidata(likeData))
        }
        else {
            let clg = likeData?.like?.filter(x => x != user.id)
            likeData.like  = clg;
            dispatch(editPostApidata(likeData))
            setisActive(false)
            // console.log('clg', likeData?.like)
        }
    }
    return (
        <>

            <span><AiFillHeart style={{
                cursor: 'pointer',
                color: isActive ? 'red' : '',
            }} onClick={show} /> </span><span className='position-relative'>{likeData?.like?.length}</span>
        </>
    )
}

export default Like