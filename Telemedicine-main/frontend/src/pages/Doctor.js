import { Box, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Paper,Autocomplete,TextField} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import DoctorDash from '../components/DoctorDash';
import mainImg from '../images/Logo.png';
import ShowPrescription from '../components/ShowPrescription';
import PrescriptionDetails from '../components/PrescriptionDetails';


const Doctor = () => {
  const history = useHistory();
  const [show, setShow] = useState(0);
  const [prescription, setPrescription] = useState()
  const [patient, setPatient] = useState();
  const [prevP,setPrevP] = useState()

    useEffect(() => {
      if(localStorage.getItem('isAuth')==='false' ){
        history.push('/');
      }
    }, [])

  function selectComponent(){
    switch(show){
      case 0:
        return <DoctorDash setPrevP = {setPrevP} setShow={setShow} setPrescription={setPrescription} setPatient={setPatient}/>
      case 1:
        return <ShowPrescription prevP={prevP} data = {prescription} setData={setPrescription} setShow={setShow}/>
      case 2:
        return <PrescriptionDetails data = {prescription} patient={patient} setShow={setShow}/>
    }
  }

  const logoutHandler=async ()=>{
      const logId = JSON.parse(localStorage.getItem("DoctorOnline")).logId;
      try{
        const config={
            headers: {
                "Content-type":"application/json"
            },
        }
        const {data} = await axios.post('/api/logs/logout',{logId},config)
      }
      catch (error){
        console.log(error);
        return;
      }
    localStorage.setItem('isAuth', false);
    localStorage.setItem("DoctorOnline",false);
    history.push('/')
  }
  return (
    <Box sx={{width:'100%',height:'150vh',backgroundColor:'#DEF2F1',position:'absolute'}}>
      <CssBaseline/>
      <AppBar position='fixed' sx={{backgroundColor:'#FEFFFF',boxShadow:'none',height:'8vh'}}> 
        <Toolbar sx={{justifyContent:'space-between'}}>
          <IconButton>
            <img src={mainImg} alt='Not available' style={{width:'6vh',height:'6vh',margin:'4px'}}></img>
          </IconButton>
          <Button onClick={logoutHandler} sx={{backgroundColor:'#071114',width:'6vw',height:'4.5vh',borderRadius:'20px',color:'#FEFFFF','&:hover':{backgroundColor:'#193D47'}}}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {selectComponent()}
    </Box>
  )
}

export default Doctor