import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, OutlinedInput, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import './sty.css';
import FBasicInfo from './stepperComponents/FBasicInfo';
import TimeAvailable from './stepperComponents/TimeAvailable';
import FamilyMembers from './stepperComponents/FamilyMembers';
import Success from './stepperComponents/Success';
import OtherInfo from './stepperComponents/OtherInfo';
import AdditionalMembers from './stepperComponents/AdditionalMembers';
import axios from 'axios';
import FamilyMember2 from './stepperComponents/FamilyMember2';
import {motion} from 'framer-motion';
const FamilyRegistration = () => {
    const steps = ['Basic Info', 'Family Members', 'Other Info'];
    const today = new Date();
    const [active, setActive] = useState(0);
    const [name, setName] = useState();
    const [relationship, setRelationship] = useState('');
    const [members, setMembers] = useState([]);
    const [memberArr, setMemberArr] = useState([1]);
    const [additionalMembers, setAdditionalMembers] = useState([]);
    const [mainName, setMainName] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [date, setDate] = useState(today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate());
    const [locationCode, setLocationCode] = useState('K');
    const [education, setEducation] = useState('');
    const [familyIncome, setFamilyIncome] = useState('');
    const [maritalStatus, setMaritalStatus] = useState();
    const [id, setId] = useState();
    const [open, setOpen] = useState(false);
    const [memberArr2, setMemberArr2] = useState([1]);
    const [result, setResult] = useState('Successfull');

    function handleOpen(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }

    function activeStep(){
        switch(active){
            case 0:
                return <FBasicInfo setMainName={setMainName} setAddress={setAddress} setMobile={setMobile} setLocationCode={setLocationCode} setName={setName}/>
            case 1:
                return <FamilyMembers name={name} setName={setName} relationship={relationship} setRelationship={setRelationship} members={members} setMembers={setMembers} memberArr={memberArr} setMemberArr={setMemberArr}/>
            // case 2:
            //     return <FamilyMember2 name={name} setName={setName} relationship={relationship} setRelationship={setRelationship} members={members} setMembers={setMembers} memberArr2={memberArr2} setMemberArr2={setMemberArr2}/>
            // case 3:
            //     return <AdditionalMembers name={name} setName={setName} additionalMembers={additionalMembers} setAdditionalMembers={setAdditionalMembers} memberArr={memberArr} setMemberArr={setMemberArr}/>
            case 2:
                return <OtherInfo setEducation={setEducation} setFamilyIncome={setFamilyIncome} setMaritalStatus={setMaritalStatus}/>
            case 3:
                return <Success subject='Family' result={result}/>
        }
    }
    async function submitHandler(){
        if (!mainName || !mobile || !address || !date || !locationCode || !education || !familyIncome || !maritalStatus) {
            setResult('Failed')
            return;
        }
        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                },
            }
            console.log(members);
            const {data} = await axios.post('/api/family/register',{mainName,mobile,address,date,locationCode,education,familyIncome,maritalStatus,members,additionalMembers},config);
            setId(data.id);
            setResult('Successful')
            handleOpen();
        }
        catch(error){
            setResult('Failed')
            console.log(error);
        }
    }
    const backHandler = ()=>{
        setMemberArr([1]);
        setMemberArr2([1]);
        if(active===0)
            return;
        // if(active===4){
        //     setAdditionalMembers([])
        // }
        if(active===1){
            setMembers([]);
            setMemberArr([]);
        }
        var newActive = active - 1;
        setActive(newActive)
    }
    const stepperHandler = ()=>{
        if(active===2){
            console.log(active);
            submitHandler();
        }
        if(active===0){
            const val = {
                name:name,
                relationship:"self",
            }
            var arr = [];
            arr.push(val);
            setMembers(arr);
            setName(1);
        }
        if(active===1){
            if(name!=1){
                var arr = [...members];
                const val={
                    name:name,
                    relationship:relationship,
                }
                arr.push(val);
                setMembers(arr);
            }
            setMemberArr([1]);
            setName(1);
            var newActive = active + 1
            setActive(newActive);
        }
        if(active ===2){
            if(name!=1){
                var arr = [...additionalMembers];
                const val={
                    name:name,
                }
                arr.push(val);
                setAdditionalMembers(arr);
            }
            setMemberArr([1]);
            setName(1);
            var newActive = active + 1
            setActive(newActive);
        }
        else{
            var newActive = active + 1
            setActive(newActive);
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
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Success"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Your Registration ID is: {id}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>
        <motion.div layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',borderRadius:'25px',width:'60vw',height:'fit-content',paddingBottom:'18vh',minHeight:'85vh'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'5vh'}}>
                            Family Registration
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
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}} style={{marginLeft:'4vw',marginTop:'2vh',top:'78vh',left:'25vw',width:'56vw',display:'flex',justifyContent:'space-between'}}>
                    <Button onClick={backHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                        Back
                    </Button>
                    <Button onClick={stepperHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                        {(active===2)? 'Register' : 'Next'}
                    </Button>
                </motion.div>
            </Paper>
        </motion.div>

    </Box>    
  )
}

export default FamilyRegistration