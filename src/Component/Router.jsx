import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Header from './Comment'
import Register from './Register'
import Notfound from './Notfound'
import { useSelector } from 'react-redux'
import Account from './Account'
import DashBord from './pages/DashBord'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import YourPosts from './pages/YourPosts'

function Router() {
    let state = useSelector(state => state.user.user);
    let login = JSON.parse(localStorage.getItem('login'));
    let match = state?.find(x => x.email == login?.email);
    localStorage.setItem('account', JSON.stringify(match))
    return (
        <>

            <BrowserRouter>
                <Routes>
                    {
                        match == null ?
                            <>
                                <Route path='/' element={<Navigate to='/login' />}></Route>
                                <Route path='/login' element={<Login />}></Route>
                                <Route path='/register' element={<Register />}></Route>
                                <Route path='*' element={<Notfound />} />
                            </> : <>
                                <Route path='/' element={<Navigate to='/account/Profile' />}></Route>
                                <Route path='/account' element={<Account />} >
                                    <Route path='dashbord' element={<DashBord/>}/>
                                    <Route path='Profile' element={<Profile/>}/>
                                    <Route path='settings' element={<Settings/>}/>
                                    <Route path='yourPosts' element={<YourPosts/>}/>
                                </Route>
                                <Route path='*' element={<Notfound />} />
                            </>
                    }

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router