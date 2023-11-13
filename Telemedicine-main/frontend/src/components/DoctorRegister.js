import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import './sty.css';
import BasicInfo from './stepperComponents/BasicInfo';
import ContactInfo from './stepperComponents/ContactInfo';
import TimeAvailable from './stepperComponents/TimeAvailable';
import Success from './stepperComponents/Success';
import axios from 'axios';
import {motion} from 'framer-motion';
const DoctorRegister = () => {
    const steps = ['Basic Info', 'Contact Info', 'Time Available'];
    const [active, setActive] = useState(0);
    const [name, setName] = useState();
    const [ssfID, setSsfID] = useState();
    const [registrationID, setRegistrationID] = useState();
    const [mobile, setMobile] = useState();
    const [adress, setAdress] = useState();
    const [gender, setGender] = useState('Male');
    const [speciality, setSpeciality] = useState('GP');
    const [timeAvailable, setTimeAvailable] = useState([]);
    const [from,setFrom] = useState();
    const [to,setTo] = useState();
    const [day, setDay] = useState();
    const [result, setResult] = useState('Successful')
    function activeStep(){
        switch(active){
            case 0:
                return <BasicInfo setName={setName} setSsfID={setSsfID} setRegistrationID={setRegistrationID}/>
            case 1:
                return <ContactInfo setAdress={setAdress} setMobile={setMobile} setGender={setGender} setSpeciality={setSpeciality}/>
            case 2:
                return <TimeAvailable setTimeAvailable={setTimeAvailable} timeAvailable={timeAvailable} from={from} setFrom={setFrom} to={to} setTo={setTo} day={day} setDay={setDay}/>
            case 3:
                return <Success subject='Doctor' result={result}/>
        }
    }
    async function submitHandler (){
        var arr = [...timeAvailable]
        if((day!=1)&&(from!=28)&&(to!=28)){
            const item = {
                day:day,
                from:from,
                to:to
            }         
            arr.push(item);   
        }
        console.log(arr)
        if(!name||!ssfID||!registrationID||!mobile||!adress||!gender||!speciality||(arr.length===0)){
            setResult('Failed')
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type":"application/json"
                },
            }

            const {data} = await axios.post('/api/doctor/register',{name,ssfID,registrationID,mobile,adress,gender,speciality,arr},config)
            setResult('Successful')
            setActive(active+1);

        } catch (error) {
            setResult('Failed')
            console.log(error);
        }
}
    const backHandler = ()=>{
        if(active>0){
            var newActive = active - 1;
            setActive(newActive)
        }
    }
    const stepperHandler = ()=>{
        if(active===2){
            submitHandler()
        }
        if(active===1){
            setDay(1);
        }
        if(active<3){
            var newActive = active + 1
            setActive(newActive);
        }
        else{
            setActive(0)
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
        <motion.div layout animate={{opacity:1}} layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',borderRadius:'25px',width:'60vw',height:'fit-content',paddingBottom:'10vh',minHeight:'85vh'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'5vh'}}>
                            Doctor Registration
                        </Typography>
                        <Stepper activeStep={active} sx={{width:'50vw'}}>
                            {steps.map((label,idx)=>{
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                        {activeStep()}
                        
                    </Box>
                </motion.div>
                <motion.div style={{position:'absolute',top:'70vh',left:'25vw',width:'56vw',display:'flex',justifyContent:'space-between'}} animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.4}}>
                    <Button onClick={backHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                        Back
                    </Button>
                    <Button onClick={stepperHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                        {(active===2)? 'Register' : (active===3)? 'Reset' : 'Next'}
                    </Button>
                </motion.div>
            </Paper>
        </motion.div>
    </Box>    
  )
}

export default DoctorRegister