import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../Contexts/AuthContext'

const GuestLayout = () => {

  const {token} = UserAuth();

  if(token){
    return <Navigate to='/home'/>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default GuestLayout
