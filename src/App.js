import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Component/Router';
import './Component/Style.css'
import { getApidata } from './Redux/Action/Action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostApi } from './Redux/Action/PostAction';
import { getCommentApi } from './Redux/Action/commentAction';

// how to start json -- npm run server --p 3001
//--in-new-terminal-----npm start
function App() {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApidata())
    dispatch(getPostApi())
    // dispatch(getCommentApi())
  }, []);

  return (
    <Router />
  );
}

export default App;
