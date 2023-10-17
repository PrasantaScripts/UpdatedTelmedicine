import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LogRecord = () => {
    const [logArr, setLogArr] = useState(['None Found']);
    useEffect(() => {
        async function fetch (){
        try{
          const config={
              headers: {
                  "Content-type":"application/json"
              },
          }
          const {data} = await axios.get('/api/logs/fetch',config);
          if(data.length===0){
            setLogArr(['None Found'])
          }
          else{
            setLogArr(data)
          }
        }
        catch (error){
          console.log(error);
        }
      }
      fetch()
    }, [])
    
  return (
        <Box display='flex' alignItems='center' sx={{width:'80vw',overflow:'scroll',marginLeft:'5vw',borderRadius:'15px',marginLeft:'10vw',paddingTop:'40px',flexFlow:'column'}}>
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#D1D1D1',width:'80vw',height:'5vh',borderRadius:'8px 8px 0px 0px',marginTop:'10vh'}}>
            <Typography variant='h7' component='div' sx={{fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
              Sl No
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Name
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Login
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'52px'}}>
              Logout
            </Typography>
          </Box>
          {
            logArr.map((item,idx)=>{
              if(item==='None Found'){
                return (
                  <Box>
                    <Typography sx={{textAlign:'center',width:'80vw',marginTop:'40px'}}>
                      {item}
                    </Typography>
                  </Box>
                )
              }  
                return(
                  <Box sx={{backgroundColor:'#FEFFFF',width:'80vw',height:'9vh'}}>
                    <Box display='center' justifyContent='space-between' alignItems='center' sx={{width:'80vw'}}>
                      <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {idx+1}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh'}}>
                        {item.name}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.login.substr(0,10)}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.logout.substr(0,10)}
                      </Typography>
                      
                    </Box>
                  </Box>
              )
            })
          }
        </Box>
  )
}

export default LogRecord