import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
const FBasicInfo = ({setMobile,setMainName,setAddress,setLocationCode,setName}) => {
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">मुख्य वेतन अर्जक/ Chief Wage Earner (Name)<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="मुख्य वेतन अर्जक/ Chief Wage Earner (Name)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{
              setMainName(e.target.value);
              setName(e.target.value);
            }}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Mobile No<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="Mobile No"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setMobile(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">पता (Address)<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="पता (Address)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setAddress(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Date<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
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
        <InputLabel id="demo-simple-select-label">Location Code<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location Code"
                sx={{backgroundColor:'#FEFFFF'}}
                onChange={(e)=>{setLocationCode(e.target.value)}}
                defaultValue=''
            >
                <MenuItem value='K'>Kulburu</MenuItem>
                <MenuItem value='D'>Dumartoli</MenuItem>
                <MenuItem value='S'>Kasatoli</MenuItem>
                <MenuItem value='H'>Khijri</MenuItem>
                <MenuItem value='B'>Balankel</MenuItem>
                <MenuItem value='U'>Kusumtoli</MenuItem>
                <MenuItem value='O'>Others</MenuItem>
            </Select>
        </FormControl>                
      </Box>
    </Box>
  )
}

export default FBasicInfo