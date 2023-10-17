import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import {motion} from 'framer-motion';
import './sty.css';
import Success from './stepperComponents/Success';
import Personal from './stepperComponents/Patient/Personal';
import Basic from './stepperComponents/Patient/Basic';
import Medical from './stepperComponents/Patient/Medical';
import PastHistory from './stepperComponents/Patient/PastHistory';
import Gynecological from './stepperComponents/Patient/Gynecological';
import axios from 'axios';
import MedicalReason from './stepperComponents/Patient/MedicalReason';


const PatientForm = ({patientData}) => {
    const steps = ['Basic Info','Personal Profile', 'Medical Profile', 'Medical Reason' , 'Past Medical History','प्रसूति / स्त्री रोग संबंधी इतिहास (महिलाओं के लिए)'];
    const [active, setActive] = useState(0);
    const [result, setResult] = useState('Successful')
    const [mobile, setMobile] = useState();
    const [DOB, setDOB] = useState();
    const [education, setEducation] = useState();
    const [profession, setProfession] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [temperature, setTemperature] = useState();
    const [pulse, setPulse] = useState();
    const [sbp, setSbp] = useState();
    const [dbp, setDbp] = useState();
    const [alcohol, setAlcohol] = useState();
    const [smoking, setSmoking] = useState();
    const [asthama, setAsthama] = useState();
    const [diabetes, setDiabetes] = useState();
    const [familyIll, setFamilyIll] = useState();
    const [spo2, setSpo2] = useState();
    const [others, setOthers] = useState();
    const [admitted, setAdmitted] = useState();
    const [currentMed, setCurrentMed] = useState();
    const [healthCondition, setHealthCondition] = useState();
    const [injuries, setInjuries] = useState();
    const [otherHistory, setOtherHistory] = useState();
    const [pastDiseases, setPastDiseases] = useState();
    const [abortion, setAbortion] = useState("");
    const [numberOfChild, setNumberOfChild] = useState("");
    const [otherComplications, setOtherComplications] = useState("");
    const [totalPregnancies, setTotalPregnancies] = useState("");
    const [marital, setMarital] = useState();
    const [gender, setGender] = useState();
    const [medReasons, setMedReasons] = useState([]);
    function activeStep(){
        console.log(active);
        switch(active){
            case 1:
                return <Personal patientData={patientData}  setMarital={setMarital} setGender={setGender} setDOB={setDOB} setEducation={setEducation} setProfession={setProfession}/>
            case 0:
                return <Basic setMobile={setMobile} patientData={patientData}/>
            case 2:
                return <Medical setHeight={setHeight} setWeight={setWeight} setTemperature={setTemperature} setPulse={setPulse} setSbp={setSbp} setDbp={setDbp} setAlcohol={setAlcohol} setAsthama={setAsthama} setDiabetes={setDiabetes} setFamilyIll={setFamilyIll} setSmoking={setSmoking} setSpo2={setSpo2} setOthers={setOthers}/>
            case 3:
                return <MedicalReason medReasons={medReasons} setMedReasons={setMedReasons}/>
            case 4:
                return <PastHistory setAdmitted={setAdmitted} setCurrentMed={setCurrentMed} setHealthCondition={setHealthCondition} setInjuries={setInjuries} setOtherHistory={setOtherHistory} setPastDiseases={setPastDiseases}/>
            case 5:
                return <Gynecological setNAbortion={setAbortion} setNumberOfChild={setNumberOfChild} setOtherComplications={setOtherComplications} setTotalPregnancies={setTotalPregnancies}/>
            case 6:
                return <Success result={result}/>
        }
    }
    async function submitHandler (){
        if(!height || !weight || !temperature || !pulse){
            setResult('failed beacuse all fields were not filled');
            return;
        }
        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                }, 
            }
            const {data} =await axios.post('/api/patient/add',{marital,DOB,education,profession,height,weight,temperature,pulse,sbp,dbp,alcohol,asthama,diabetes,familyIll,smoking,spo2,admitted,currentMed,healthCondition,injuries,pastDiseases,abortion,numberOfChild,otherComplications,totalPregnancies,others,otherHistory,patientData,mobile,gender,medReasons},config);
            setResult('Successful')
        }
        catch(error){
            console.log(error);
            setResult('Failed...Please, Check your internet.');
        }
        
    }
    const backHandler = ()=>{
        if(active>0){
            var newActive = active - 1;
            setActive(newActive)
        }
    }
    const stepperHandler = ()=>{
        if(active===5){
            submitHandler()
        }
        if(active<6){
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
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',borderRadius:'25px',width:'60vw',height:'fit-content',paddingBottom:'10vh',minHeight:'90vh'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'5vh'}}>
                            Patient Registration
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
                <Box display={(active===6)?'none':'block'}>
                    <motion.div style={{marginTop:'30px',marginLeft:'6vw',width:'56vw',display:'flex',justifyContent:'space-between'}} animate={{opacity:1}} initial={{opacity:0}} transition={{delay:0.4}}>
                        <Button onClick={backHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                            Back
                        </Button>
                        <Button onClick={stepperHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',alignSelf:'end',marginRight:'8vw','&:hover':{backgroundColor:'#CF9D6E'}}}>
                            {(active===5)? 'Register' : (active===6)? 'Reset' : 'Next'}
                        </Button>
                    </motion.div>
                </Box>
            </Paper>
        </motion.div>
    </Box>    
  )
}

export default PatientForm