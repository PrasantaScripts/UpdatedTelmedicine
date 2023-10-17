import React from 'react'
import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
const basicInfo = ({setName,setRegistrationID,setSsfID}) => {
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'10vh',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Name</InputLabel>
        <OutlinedInput
            id="Name"
            label="Name"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setName(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">SSF ID</InputLabel>
        <OutlinedInput
            id="Name"
            label="Name"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setSsfID(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Doctor's Registration Number</InputLabel>
        <OutlinedInput
            id="Name"
            label="Name"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setRegistrationID(e.target.value)}}
        />
        </FormControl>                
      </Box>
    </Box>
  )
}

export default basicInfo