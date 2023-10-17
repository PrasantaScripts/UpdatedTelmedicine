import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
const Basic = ({setMobile,patientData}) => {
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    const mobileVal = useRef();
    useEffect(() => {
      if(patientData.mobile!=""){
        console.log(patientData.mobile);
        // setMobile(patientData.mobile);
        mobileVal.current  =  document.getElementById("mobileNo")
        mobileVal.current.value = patientData.mobile;
      }
    }, [])
    function test(){
      console.log(mobileVal.current.value);
    }
    
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Family Registration Number</InputLabel>
        <OutlinedInput
            id="Name"
            label='Family Registration Number'
            value={patientData.registrationNumber}
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            disabled
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Patient Registration Id</InputLabel>
        <OutlinedInput
            id="Name"
            label='Patient Registration Id'
            value={patientData.registrationP}
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            disabled
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Name</InputLabel>
        <OutlinedInput
            id="name"
            value={patientData.name}
            label='Name'
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            disabled
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Patient Ticket Id</InputLabel>
        <OutlinedInput
            id="Name"
            label="Patient Ticket Id"
            value={patientData.ticketId}
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            disabled
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Date</InputLabel>
        <OutlinedInput
            id="Name"
            label="Date"
            value={date}
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            disabled
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Mobile No</InputLabel>
        <OutlinedInput
            id="mobileNo"
            label="Mobile No"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange = {(e)=>{setMobile(e.target.value)}}
        />
        </FormControl>                
      </Box>
    </Box>
  )
}

export default Basic