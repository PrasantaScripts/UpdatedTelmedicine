import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem,Typography,Select } from '@mui/material'


const TimeAvailable = ({setTimeAvailable,timeAvailable,from,setFrom,day,setDay,to,setTo}) => {
  
  const [timeArr, setTimeArr] = useState([1])

  const addHandler = ()=>{
    var data = {
      day:day,
      from:from,
      to:to,
    }
    if(!day||!from||!to){
      return;
    }
    if(timeArr.length<=5){
      var arr = [...timeAvailable];
      arr.push(data);
      setTimeAvailable(arr)
    }

    if(timeArr.length<5){
      arr=[...timeArr]
      arr.push(timeArr.length)
      setTimeArr(arr)
    }
    setDay(1);
    setFrom(28);
    setTo(28);
  }

  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center'>
      {timeArr.map((item,idx)=>{
        return(
        <Box display='flex' key={idx} justifyContent='center' alignItems='center'>
          <FormControl sx={{width:'10vw',marginTop:'3vh'}}>
          <InputLabel htmlFor="Name">Day</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Day"
                    sx={{backgroundColor:'#FEFFFF'}}
                    onChange={(e)=>{setDay(e.target.value)}}
                >
                    <MenuItem value='Monday'>Monday</MenuItem>
                    <MenuItem value='Tuesday'>Tuesday</MenuItem>
                    <MenuItem value='Wednesday'>Wednesday</MenuItem>
                    <MenuItem value='Thrusday'>Thursday</MenuItem>
                    <MenuItem value='Friday'>Friday</MenuItem>
                    <MenuItem value='Saturday'>Saturday</MenuItem>
                    <MenuItem value='Sunday'>Sunday</MenuItem>
                </Select>
          </FormControl>  
          <Typography sx={{width:'3vw',textAlign:'center',paddingTop:'2.5vh'}}>
            :-
          </Typography>
          <FormControl sx={{width:'10vw',marginTop:'3vh'}}>
          <InputLabel htmlFor="Name">From</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="From"
                    sx={{backgroundColor:'#FEFFFF'}}
                    onChange={(e)=>{setFrom(e.target.value)}}
                >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='11'>11</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                    <MenuItem value='13'>13</MenuItem>
                    <MenuItem value='14'>14</MenuItem>
                    <MenuItem value='15'>15</MenuItem>
                    <MenuItem value='16'>16</MenuItem>
                    <MenuItem value='17'>17</MenuItem>
                    <MenuItem value='18'>18</MenuItem>
                    <MenuItem value='19'>19</MenuItem>
                    <MenuItem value='20'>20</MenuItem>
                    <MenuItem value='21'>21</MenuItem>
                    <MenuItem value='22'>22</MenuItem>
                    <MenuItem value='23'>23</MenuItem>
                    <MenuItem value='24'>24</MenuItem>
                </Select>
          </FormControl> 
          <Typography sx={{width:'3vw',textAlign:'center',paddingTop:'2.5vh'}}>
            :
          </Typography>
          <FormControl sx={{width:'10vw',marginTop:'3vh'}}>
          <InputLabel htmlFor="Name">To</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="To"
                    sx={{backgroundColor:'#FEFFFF'}}
                    onChange={(e)=>{setTo(e.target.value)}}
                >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='11'>11</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                    <MenuItem value='13'>13</MenuItem>
                    <MenuItem value='14'>14</MenuItem>
                    <MenuItem value='15'>15</MenuItem>
                    <MenuItem value='16'>16</MenuItem>
                    <MenuItem value='17'>17</MenuItem>
                    <MenuItem value='18'>18</MenuItem>
                    <MenuItem value='19'>19</MenuItem>
                    <MenuItem value='20'>20</MenuItem>
                    <MenuItem value='21'>21</MenuItem>
                    <MenuItem value='22'>22</MenuItem>
                    <MenuItem value='23'>23</MenuItem>
                    <MenuItem value='24'>24</MenuItem>
                </Select>
          </FormControl> 
        </Box>
        )
      })}
        <Button  onClick={addHandler} sx={{position:'absolute',top:'28vh',right:'24vw',width:'4min',height:'4vmin',backgroundColor:'#CF823A',color:'#FEFFFF','&:hover':{backgroundColor:'#CF9D6E'}}}>
          Add
        </Button>
    </Box>
  )
}

export default TimeAvailable