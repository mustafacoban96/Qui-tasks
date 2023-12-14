import React from 'react'
import { Button, Typography } from '@mui/material'
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user,logout} = UserAuth();
  const navigate = useNavigate()

  const handleLogout = async () =>{
    try {
      await logout();
      navigate('/login')
      console.log('you are logout')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
        <Typography>Home</Typography>
        <Typography>User email:{user.email}</Typography>
        <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Home
