import React, { useState } from 'react'
import { Box, Button, createTheme, FormControl, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import mainImg from '../images/Doctor.png';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const history = useHistory();
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#FEFFFF',
        contrastText: '#fff',
      },
    },
    multilineColor:{
        color:'red'
    },
  });

  const [registrationID, setRegistrationID] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async()=>{
    if(!registrationID||!password){
        return;
    }
    try {
        const config = {
            headers: {
                "Content-type":"application/json"
            },
        }
        const {data} = await axios.post('/api/admin/login',{registrationID,password},config)
        localStorage.setItem("AdminOnline", JSON.stringify(data))
        localStorage.setItem('isAuth',true);
        history.push('/admin');

    } catch (error) {
        console.log(error);
    }

}

  return (
    <Box>
      <Box display='flex' justifyContent='space-around' alignItems='center' sx={{width:'33vw',height:'30vh',flexFlow:'column'}}>
        <Box sx={{margin:'-4px', padding:'0px'}}>
          <img src={mainImg} alt='img goes here' style={{borderRadius:"15px 15px 0px 0px",width:'20vw',margin:'0px'}}></img>
        </Box>
        <Box sx={{marginTop:'0px'}}>
          <FormControl>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{marginTop:'0px',width:'20vw',height:'35vh',backgroundColor:'#291F67',borderRadius:'0px 0px 15px 15px',flexFlow:'column'}}>
              <Box display='flex' sx={{marginTop:'3vh'}}>
                <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                  <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>person_outline</i>
                </Box>
                <ThemeProvider theme={theme}>
                  <TextField id="standard-basic" color='neutral' label="Registration ID" variant="filled" onChange={(e)=>{setRegistrationID(e.target.value)}} sx={{ input: { color: '#FEFFFF' } }} focused/>
                </ThemeProvider>
              </Box>
              <Box display='flex' sx={{marginTop:'3vh'}}>
                <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                  <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>lock_outline</i>
                </Box>
                <ThemeProvider theme={theme}>
                  <TextField id="Password" type='password' color='neutral' label="Password" variant="filled" onChange={(e)=>{setPassword(e.target.value)}} sx={{ input: { color: '#FEFFFF' } }} focused/>
                </ThemeProvider>
              </Box>
              <Button onClick={loginHandler} sx={{marginTop:'5vh',width:'10vw',color:'#DEF2F1',borderRadius:'20px',padding:'0.5rem',backgroundColor:"#CF823A",'&:hover':{backgroundColor:'#CF8F5D'}}}>
                Admin Login
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLogin