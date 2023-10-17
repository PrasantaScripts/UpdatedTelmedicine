import { Box, Button, FormControl, FormControlLabel, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import '../sty.css';

const contactInfo = ({setAdress,setMobile,setGender,setSpeciality}) => {
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      <Box sx={{ marginTop:'7vh',alignSelf:'start' }} display='flex' justifyContent='center'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Adress</InputLabel>
        <OutlinedInput
            id="Name"
            label="Name"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setAdress(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box sx={{ marginTop:'25px',alignSelf:'start' }} display='flex'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
            <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
        </Box>
        <FormControl sx={{width:'40vw'}}>
        <InputLabel htmlFor="Name">Mobile Number</InputLabel>
        <OutlinedInput
            id="Name"
            label="Name"
            sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
            onChange={(e)=>{setMobile(e.target.value)}}
        />
        </FormControl>                
      </Box>
      <Box display='flex' sx={{marginTop:'2vh'}}>
        <Typography variant='subtitle1' component='div'>
          Gender:
        </Typography>
        <FormControl sx={{marginTop:'2vh'}}>
          <RadioGroup
            defaultValue='1'
            row
            name='Gender'
            onChange={(e)=>{setGender(e.target.value)}}
          >
            <FormControlLabel control={<Radio />} label='Male' value='Male' />
            <FormControlLabel control={<Radio />} label='Female' value='Female' />
          </RadioGroup>
        </FormControl>
        <Typography variant='subtitle1' component='div'>
          Speciality:
        </Typography>
        <FormControl sx={{marginTop:'2vh'}}>
          <RadioGroup
            defaultValue='1'
            row
            name='Speciality'
            onChange={(e)=>{setSpeciality(e.target.value)}}
          >
          <FormControlLabel control={<Radio />} label='GP' value='GP' />
            <FormControlLabel control={<Radio />} label='Gynecologist' value='Gynecologist' />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* <Box display='flex' sx={{marginTop:'2vh'}}> */}
        {/* <Typography variant='subtitle1' component='div'>
          Speciality:
        </Typography>
        <FormControl sx={{marginTop:'2vh'}}>
          <RadioGroup
            defaultValue='1'
            row
            name='Speciality'
            onChange={(e)=>{setSpeciality(e.target.value)}}
          >
          <FormControlLabel control={<Radio />} label='GP' value='GP' />
            <FormControlLabel control={<Radio />} label='Gynecologist' value='Gynecologist' />
          </RadioGroup>
        </FormControl> */}
      {/* </Box> */}
    </Box>
  )
}

export default contactInfo