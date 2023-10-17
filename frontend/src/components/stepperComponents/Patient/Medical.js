import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
const Medical = ({setHeight,setWeight,setTemperature,setPulse,setSbp,setDbp,setAlcohol,setAsthama,setDiabetes,setFamilyIll,setSmoking,setSpo2,setOthers}) => {
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='start'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Height  <Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="Height"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setHeight(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Weight  <Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="Weight"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setWeight(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">तापमान Temperature (F)  <Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="तापमान Temperature (F)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setTemperature(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Pulse  <Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
        <OutlinedInput
            id="Name"
            label="Pulse"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setPulse(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">सिस्टोलिक रक्तचाप (Systolic Blood Pressure) </InputLabel>
        <OutlinedInput
            id="Name"
            label="सिस्टोलिक रक्तचाप (Systolic Blood Pressure)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setSbp(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">डायस्टोलिक रक्तचाप (Diastolic Blood Pressure)</InputLabel>
        <OutlinedInput
            id="Name"
            label="डायस्टोलिक रक्तचाप (Diastolic Blood Pressure)"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setDbp(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">SPO2</InputLabel>
        <OutlinedInput
            id="Name"
            label="SPO2"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setSpo2(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>book</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Do you have Diabetes? (क्या आपको मधुमेह है?)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Do you have Diabetes? (क्या आपको मधुमेह है?)"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setDiabetes(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='Yes'>Yes</MenuItem>
            <MenuItem value='No'>No</MenuItem>
            <MenuItem value="Don't Know">Don't Know</MenuItem>
          </Select>
        </FormControl>  
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Do you have asthma or any breathing trouble? (क्या आपको अस्थमा है या सांस लेने में कोई परेशानी है?)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Do you have asthma or any breathing trouble? (क्या आपको अस्थमा है या सांस लेने में कोई परेशानी है?)"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setAsthama(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='Yes'>Yes</MenuItem>
            <MenuItem value='No'>No</MenuItem>
          </Select>
        </FormControl>
      </Box>  
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Smoking habits (धूम्रपान की आदतें)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Smoking habits (धूम्रपान की आदतें)"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setSmoking(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='एक दिन में 10 से अधिक'>एक दिन में 10 से अधिक</MenuItem>
            <MenuItem value='दिन में 10 से कम'>दिन में 10 से कम</MenuItem>
            <MenuItem value='अनियमित रूप से धूम्रपान करें'>अनियमित रूप से धूम्रपान करें</MenuItem>
            <MenuItem value='पिछले 5 वर्षों में छोड़ दिया'>पिछले 5 वर्षों में छोड़ दिया</MenuItem>
            <MenuItem value='5 साल से अधिक समय पहले छोड़ दिया'>5 साल से अधिक समय पहले छोड़ दिया</MenuItem>
            <MenuItem value='कभी धूम्रपान नहीं किया'>कभी धूम्रपान नहीं किया</MenuItem>
          </Select>
        </FormControl>
      </Box>  
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Alcohol drinking habit (शराब पीने की आदत)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Alcohol drinking habit (शराब पीने की आदत)"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setAlcohol(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='Never (कभी नहीँ)'>Never (कभी नहीँ)</MenuItem>
            <MenuItem value='Occasionally (कभी-कभी)'>Occasionally (कभी-कभी)</MenuItem>
            <MenuItem value='Regularly, once a week or more, moderate quantity (नियमित रूप से, सप्ताह में एक बार या अधिक, मध्यम मात्रा)'>Regularly, once a week or more, moderate quantity (नियमित रूप से, सप्ताह में एक बार या अधिक, मध्यम मात्रा)</MenuItem>
            <MenuItem value='Often with heavy quantity (अक्सर भारी मात्रा में)'>Often with heavy quantity (अक्सर भारी मात्रा में)</MenuItem>
            <MenuItem value="Always, can't stay without (हमेशा, इसके बिना नहीं रह सकता)">Always, can't stay without (हमेशा, इसके बिना नहीं रह सकता)</MenuItem>
          </Select>
        </FormControl>
      </Box>   
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>work</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
          <InputLabel id="demo-simple-select-label">Family illness(पारिवारिक बीमारी)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Family illness(पारिवारिक बीमारी)"
            sx={{backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setFamilyIll(e.target.value)}}
            defaultValue=''
          >
            <MenuItem value='Diabetes (मधुमेह)'>Diabetes (मधुमेह)</MenuItem>
            <MenuItem value='Hypertension (उच्च रक्तचाप)'>Hypertension (उच्च रक्तचाप)</MenuItem>
            <MenuItem value='टीबी'>टीबी</MenuItem>
            <MenuItem value='सेरेब्रल अटैक'>सेरेब्रल अटैक</MenuItem>
            <MenuItem value='ज्ञात नहीं है'>ज्ञात नहीं है</MenuItem>
            <MenuItem value='कुछ नहीं'>कुछ नहीं</MenuItem>
          </Select>
        </FormControl>
      </Box> 
      <Box sx={{ marginTop:'25px',alignSelf:'start',marginLeft:'-4vw' }} display='flex' justifyContent='start'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Other (अन्य)</InputLabel>
        <OutlinedInput
            id="Name"
            label="Height"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setOthers(e.target.value)}}
        />
        </FormControl>                
      </Box>   
    </Box>
  )
}

export default Medical