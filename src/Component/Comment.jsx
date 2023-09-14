import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { FaRegComment } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addCommentAction, deleteCommentApiData, editcommentApidata, getCommentApi } from '../Redux/Action/commentAction';
import { RxPaperPlane } from 'react-icons/rx';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

function Comment(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [count, setcount] = useState(0);

  let dispatch = useDispatch();

  let user = JSON.parse(localStorage.getItem('account'));
  let blankObj = {
    id: 0, des: '', userId: '', postId: '', userEmail: ''
  }

  const [obj, setobj] = useState({ ...blankObj })

  const getvalue = (e) => {
    obj[e.target.name] = e.target.value
    setobj({ ...obj })
  }

  const handleShow = () => {
    dispatch(getCommentApi(props.postId))
    setShow(true)
  };
  const saveData = () => {
    if (obj.id == 0) {
      let c = uuidv4()
      setcount(c);
      obj.id = c;
      obj.postId = props.postId;
      obj.userId = user.id;
      obj.userEmail = user.email;
      dispatch(addCommentAction(obj,props.postId));
      // dispatch(getCommentApi(props.postId))
    }
    else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          // let i = props.comment?.findIndex(x => x.id == obj.id)
          // console.log(i)
          setcomm('');
          dispatch(editcommentApidata(obj, props.postId));
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
    setobj({...blankObj})
  }
  const [comm, setcomm] = useState('')
  const editObj = (x, id) => {
    if (x.userId == user.id) {
      setobj({ ...x });
      setcomm(id)
    }
  }
  const deleteComment = (id, x) => {
    if (x.userId == user.id || props.userId == user.id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCommentApiData(id, props.postId))
          // dispatch(getCommentApi(props.postId))
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }
  return (
    <>
      <FaRegComment style={{ cursor: 'pointer' }} onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Comments</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form-floating mb-4 position-relative">
            <input className="form-control" name='des' placeholder="Leave a comment here" id="floatingTextarea" onChange={getvalue}></input>
            <label htmlFor="floatingTextarea">Comments</label>
            <RxPaperPlane className='position-absolute plane' onClick={saveData} />
          </div>
          <ul className='list-unstyled'>
            {
              props.comment?.map((x, i) => {
                return <li key={i}>
                  <figure>
                    <blockquote className="blockquote d-flex justify-content-between">
                      {
                        x.userId == user.id ?
                          comm == x.id ?
                            <div className="form-floating mb-4 position-relative w-100">
                              <input className="form-control setting-inp w-100 rounded-0" name='des' value={obj.des} placeholder="Leave a comment here" id="floatingTextarea" onChange={getvalue}></input>
                              <RxPaperPlane className='position-absolute plane' onClick={saveData} />
                            </div>
                            :
                            <p className=''>{x.des} </p>
                          : <><p className=''>{x.des} </p></>
                      }
                      <p>
                        {
                          x.userId == user.id ?
                            comm == x.id ? <></> :
                              <AiFillEdit className='editPost' onClick={() => editObj(x, x.id)}></AiFillEdit> : <></>
                        }
                        {x.userId == user.id || props.userId == user.id ?
                          <RiDeleteBin6Fill className='editPost1 ms-2' onClick={() => deleteComment(x.id, x)}></RiDeleteBin6Fill> : <></>
                        }
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-end">
                      {x.userEmail}
                    </figcaption>
                    <hr />
                  </figure>
                </li>
              })
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Comment