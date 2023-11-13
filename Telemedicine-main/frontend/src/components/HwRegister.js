import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { useHistory } from "react-router-dom";
const HwRegister = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [userID, setUserID] = useState();
    const history=useHistory()
    const [success, setSuccess] = useState(false);
    const submitHandler = async ()=>{
    if(!name||!userID||!password){
        return;
    }
    try {
        const config = {
            headers: {
                "Content-type":"application/json"
            },
        }

        const {data} = await axios.post('/api/hw/register',{name,userID,password},config)
        if(data){
            setSuccess(true);
        }


    } catch (error) {
        console.log(error);
    }
}
  return (
    <Box sx={{
        width: '98vw',
        height:'34vh',
        position:'absolute',
        right:'0px',
        top:'12vh'
    }} display='flex' justifyContent='center'>
        <motion.div layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',borderRadius:'25px',width:'60vw',height:'80vh'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}}>
                        {
                            (success)?
                            <Box display='flex' alignItems='center' justifyContent='center' sx={{flexFlow:'column'}}>
                                <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'15vh'}}>
                                    Health Worker Registration Successful
                                </Typography>
                            </Box>
                            :
                            <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                            <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'5vh'}}>
                            Health Worker Registration
                            </Typography>
                            <Box sx={{ marginTop:'20vh',alignSelf:'start',marginLeft:'8vw' }} display='flex' justifyContent='center'>
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
                            <Box sx={{ marginTop:'3vh',alignSelf:'start',marginLeft:'8vw' }} display='flex' justifyContent='center'>
                                <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                                    <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>person_outline</i>
                                </Box>
                                <FormControl sx={{width:'40vw'}}>
                                <InputLabel htmlFor="userID">UserID</InputLabel>
                                <OutlinedInput
                                    id="Name"
                                    label="UserID"
                                    sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                                    onChange={(e)=>{setUserID(e.target.value)}}
                                />
                                </FormControl>
                            </Box>
                            <Box sx={{ marginTop:'3vh',alignSelf:'start',marginLeft:'8vw'}} display='flex' justifyContent='center'>
                                <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                                    <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>lock_outline</i>
                                </Box>
                                <FormControl sx={{width:'40vw'}}>
                                <InputLabel htmlFor="Password">Password</InputLabel>
                                <OutlinedInput
                                    id="Password"
                                    label="Password"
                                    sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                                </FormControl>
                            </Box>
                            <Button onClick={submitHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',marginTop:'8vh',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                                Register
                            </Button>
                        </Box>
                        }
                        
                </motion.div>
            </Paper>
        </motion.div>
    </Box>
  )
}

export default HwRegister