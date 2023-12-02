import React from 'react'
import MyTable from '../components/MyTable'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{
    
      display:'flex', 
      justifyContent:'center',
      marginTop:'40px'}}>
      <MyTable/>
    </Box>
  )
}

export default Home
