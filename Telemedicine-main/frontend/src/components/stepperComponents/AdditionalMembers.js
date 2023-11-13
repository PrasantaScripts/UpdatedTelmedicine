import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useState } from 'react';
const AdditionalMembers = ({name,setName,additionalMembers,setAdditionalMembers,memberArr,setMemberArr}) => {
    

  const addHandler = ()=>{
    var data = {
      name:name,
    }
    if(!name){
      return;
    }
    if(memberArr.length<=5){
      var arr = [...additionalMembers];
      arr.push(data);
      setAdditionalMembers(arr)
    }

    if(memberArr.length<5){
      arr=[...memberArr]
      arr.push(memberArr.length)
      setMemberArr(arr)
    }
    setName(0);
  }
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
        <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'-4vw',width:'55vw',flexFlow:'column' }} display='flex' justifyContent='space-evenly'>
      {memberArr.map((item,idx)=>{
        return(
        <Box display='flex' key={idx} justifyContent='center' alignItems='center' sx={{marginTop:'2vh'}}>
            <FormControl sx={{width:'30vw',marginRight:'2vw'}}>
                <InputLabel htmlFor="Name">Name</InputLabel>
                <OutlinedInput
                    id="Name"
                    label="Name"
                    sx={{borderRadius:'5px',backgroundColor:'#FEFFFF'}}
                    onChange={(e)=>{setName(e.target.value)}}
                />
            </FormControl>    
        </Box>
        )
      })}            
        </Box>
        <Button  onClick={addHandler} sx={{position:'absolute',top:'28vh',right:'24vw',width:'4min',height:'4vmin',backgroundColor:'#CF823A',color:'#FEFFFF','&:hover':{backgroundColor:'#CF9D6E'}}}>
          Add
        </Button>
    </Box>
  )
}

export default AdditionalMembers