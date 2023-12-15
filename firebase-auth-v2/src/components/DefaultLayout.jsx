import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../Contexts/AuthContext'

const DefaultLayout = () => {

  const {token,user,logout} = UserAuth();

  if(!token){
    return <Navigate to='/login'/>
  }
  return (
    <div>
      Default Layout
      <Outlet/>
    </div>
  )
}

export default DefaultLayout
