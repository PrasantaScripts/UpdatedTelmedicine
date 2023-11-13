import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
const PastHistory = ({setAdmitted,setCurrentMed,setHealthCondition,setInjuries,setOtherHistory,setPastDiseases}) => {
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">पिछली बीमारियां</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="पिछली बीमारियां"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setPastDiseases(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='कैंसर'>कैंसर</MenuItem>
            <MenuItem value='हृदय रोग'>हृदय रोग</MenuItem>
            <MenuItem value='उच्च रक्तचाप'>उच्च रक्तचाप</MenuItem>
            <MenuItem value='मधुमेह'>मधुमेह</MenuItem>
            <MenuItem value='टीबी'>टीबी</MenuItem>
            <MenuItem value='सेरेब्रल अटैक'>सेरेब्रल अटैक</MenuItem>
            <MenuItem value='कुछ नही'>कुछ नही</MenuItem>
          </Select>
        </FormControl>
      </Box>  
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Other (अन्य)</InputLabel>
        <OutlinedInput
            id="Name"
            label="Other (अन्य)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setOtherHistory(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">अस्पताल में भर्ती</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="अस्पताल में भर्ती"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setAdmitted(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='बच्चे का जन्म'>बच्चे का जन्म</MenuItem>
            <MenuItem value='चिकित्सा'>चिकित्सा</MenuItem>
            <MenuItem value='घरेलू शल्य चिकित्सा'>घरेलू शल्य चिकित्सा</MenuItem>
          </Select>
        </FormControl>
      </Box> 
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">स्वास्थ्य की स्थिति</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="अस्पताल में भर्ती"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setHealthCondition(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='उत्कृष्ट'>उत्कृष्ट</MenuItem>
            <MenuItem value='अच्छा'>अच्छा</MenuItem>
            <MenuItem value='निष्पक्ष'>निष्पक्ष</MenuItem>
            <MenuItem value='बुरा'>बुरा</MenuItem>
            <MenuItem value='बहुत बुरा'>बहुत बुरा</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">चोट या दुर्घटनाएं</InputLabel>
        <OutlinedInput
            id="Name"
            label="चोट या दुर्घटनाएं"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setInjuries(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">वर्तमान दवाएं</InputLabel>
        <OutlinedInput
            id="Name"
            label="वर्तमान दवाएं"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setCurrentMed(e.target.value)}}
        />
        </FormControl>                
      </Box> 
    </Box>
  )
}

export default PastHistory