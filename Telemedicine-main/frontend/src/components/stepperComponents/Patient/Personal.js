import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
const Personal = ({setDOB,setEducation,setProfession,patientData,setMarital,setGender}) => {
  const dobVal = useRef(null);
  useEffect(() => {
    if(patientData.DOB != ""){
      dobVal.current = document.getElementById("dob");
      dobVal.current.value = patientData.DOB;
      setDOB(patientData.DOB);
    }
  }, [])

  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='start'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Relationship with CWE</InputLabel>
        <OutlinedInput
            id="Name"
            label="Relationship with CWE"
            value={patientData.relationship}
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
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setGender(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
            <MenuItem value='Others'>Others</MenuItem>
          </Select>
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <OutlinedInput
            id="dob"
            label="Name"
            type="date"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setDOB(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>book</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Education</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Education"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setEducation(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='कोई औपचारिक शिक्षा नहीं'>कोई औपचारिक शिक्षा नहीं</MenuItem>
            <MenuItem value='कक्षा 5 तक'>कक्षा 5 तक</MenuItem>
            <MenuItem value='कक्षा 6-10, उत्तीर्ण नहीं'>कक्षा 6-10, उत्तीर्ण नहीं</MenuItem>
            <MenuItem value='10 . उत्तीर्ण'>10 . उत्तीर्ण</MenuItem>
            <MenuItem value='कक्षा 11-12, उत्तीर्ण नहीं'>कक्षा 11-12, उत्तीर्ण नहीं</MenuItem>
            <MenuItem value='12 उत्तीर्ण'>12 उत्तीर्ण</MenuItem>
            <MenuItem value='नामांकित स्नातक'>नामांकित स्नातक</MenuItem>
            <MenuItem value='ग्रेजुएट'>ग्रेजुएट</MenuItem>
            <MenuItem value='नामांकित स्नातकोत्तर'>नामांकित स्नातकोत्तर</MenuItem>
            <MenuItem value='पोस्ट ग्रेजुएट'>पोस्ट ग्रेजुएट</MenuItem>
            <MenuItem value='अन्य'>अन्य</MenuItem>
          </Select>
        </FormControl>  
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Profession</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Profession"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setProfession(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='किसान'>किसान</MenuItem>
            <MenuItem value='नौकरी'>नौकरी</MenuItem>
            <MenuItem value='घरेलू कार्यकर्ता'>घरेलू कार्यकर्ता</MenuItem>
            <MenuItem value='दैनिक दांव'>दैनिक दांव</MenuItem>
            <MenuItem value='विद्यार्थी'>विद्यार्थी</MenuItem>
            <MenuItem value='भइया/ Brother'>भइया/ Brother</MenuItem>
            <MenuItem value='समाज सेवक'>समाज सेवक</MenuItem>
            <MenuItem value='बेरोजगार'>बेरोजगार</MenuItem>
            <MenuItem value='सेवातनवृत'>सेवातनवृत</MenuItem>
            <MenuItem value='कुशल कामगार (राजमिस्त्री, दर्जी, बढ़ई, बिजली मिस्त्री, नर्स आदि)'>कुशल कामगार (राजमिस्त्री, दर्जी, बढ़ई, बिजली मिस्त्री, नर्स आदि)</MenuItem>
          </Select>
        </FormControl>
      </Box>  
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Marital Status"
              sx={{backgroundColor:'#FEFFFF'}}
              defaultValue=''
              onChange={(e)=>{setMarital(e.target.value)}}
            >
              <MenuItem value='Not Married/ अविवाहित'>Not Married/ अविवाहित</MenuItem>
              <MenuItem value='विवाहित/ Married'>विवाहित/ Married</MenuItem>
              <MenuItem value='विधवा / अलग (Widow/ Separated)'>विधवा / अलग (Widow/ Separated)</MenuItem>
            </Select>
        </FormControl>  
      </Box>
      
    </Box>
  )
}

export default Personal