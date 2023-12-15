import { Alert, Box, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import { UserAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef= useRef();
  const { createUser} = UserAuth();
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  
  const  handleSubmit = async (e) => {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('password do not match')
    }
    try {
        setError('')
        setLoading(true)
        await createUser(emailRef.current.value,passwordRef.current.value);
        navigate('/home')
    } catch (error) {
        console.log(error)
        setError('Failed to create an account');
    }
    setLoading(false)
}

  return (
    <Box
    component="form"
    sx={{
      display:'flex',
      '& .MuiTextField-root': { m: 1, width: {xs:'35ch',sm:'45ch'} },
      textAlign:'center',
      justifyContent:'center',
      paddingY:{xs:'10%',md:'5%'},
      
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
  >
    <Stack
      direction='column'
      sx={{border:'0.1px solid lightgray',borderRadius:'10px',padding:'20px'}}
    >
      {error && <Alert severity='error'>{error}</Alert>}
      
      <Box>
        <AccountCircleIcon
          fontSize='large'
          color='success'

        />
      </Box>
      <Typography variant='h5' sx={{fontWeight:'500'}}>
        Sign up</Typography>
        
      <TextField
     
      label="Email Address"
      required
      placeholder='example@mail.com'
      inputRef={emailRef}
    />
    <TextField
      required
      
      label="Password"
      placeholder='********'
      type='password'
      inputRef={passwordRef}
    />
    <TextField
      required
      
      label="Password Confirmation"
      placeholder='********'
      type='password'
      inputRef={passwordConfirmRef}
    />
     
    <FormControlLabel control={<Checkbox color='success'/>} label="Remember me" sx={{marginX:'0.2px'}} />
      
     <Button sx={{marginTop:'20px'}} color='success' variant="contained" disabled={loading} type='submit'>Signup</Button>
     
     <IconButton sx={{marginY:2,width:'auto'}} aria-label="google">
        <Typography variant='p' sx={{marginX:2}}>Sign up with </Typography>
        <GoogleIcon color='error'/>oogle
    </IconButton>
    </Stack>
  </Box>
  )
}

export default Signup
