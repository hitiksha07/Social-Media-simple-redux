import React from 'react'
import Sidebar from './sidebar'
import TopNavBar from './TopNavBar'

function Account() {
    // let user = JSON.parse(localStorage.getItem('account'))
    // console.log(user)
    return (
        <>
            <div className="account row g-0">
                <Sidebar />
                <TopNavBar />
            </div>
        </>
    )
}

export default Account