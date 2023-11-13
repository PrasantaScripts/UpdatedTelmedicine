import React, { useEffect, useState } from 'react';
import "./sty.css";
import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import Popup1 from "./PrescriptionDetailsPopup"
import axios from "axios"

const Popup = ({setShow,setid}) => {

  const [prescription,setPrescription] = useState()
  const [patient,setPatient] = useState()

  const prescriptionHandler = async() => {
    const id = localStorage.getItem('room');
    console.log(id)
    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        },          
      }
      const t = await axios.post('/api/prescription/fetch',{id},config);
      console.log(t.data)
      setPrescription(t.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    prescriptionHandler()
  },[])

  return (
    <div className="popup">
      <Button onClick={()=>(setShow(0))} sx={{position:'absolute',top:'10px',right:'2vw',backgroundColor:'#CF823A',color:'#FEFFFF',padding:'1rem',borderRadius:'50px','&:hover':{backgroundColor:'#CF9D6E'}}}>
        <i className="material-icons" sx={{fontSize:'2rem'}}>cancel</i>
      </Button>

      <Box display='flex' alignItems='center' sx={{width:'50vw',marginLeft:'15vw',borderRadius:'15px',paddingTop:'60px',flexFlow:'column'}}>
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#D1D1D1',width:'80vw',height:'5vh',borderRadius:'8px',marginBottom :'15px'}}>
          <Typography variant='h7' component='div' sx={{fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'5vw',height:'9vh',paddingLeft:'30px',color:'black'}}>
            Sl No
          </Typography>
          <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'5vw',height:'5vh',paddingLeft:'30px',color:'black'}}>
            Name
          </Typography>
          <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'5vw',height:'5vh',paddingLeft:'30px',color:'black'}}>
            Ticket Id
          </Typography>
          <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'5vw',height:'5vh',paddingLeft:'30px',color:'black'}}>
            Date
          </Typography>
          <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'5vw',height:'5vh',paddingLeft:'30px',paddingRight:'50px',color:'black'}}>
            Details
          </Typography>
        </Box>
          {
              prescription && prescription.length === 0?(
                  <Box>
                    <Typography sx={{textAlign:'center',fontFamily:'Roboto Condensed',width:'80vw',marginTop:'40px'}}>
                      No Prescription Found
                    </Typography>
                  </Box>
              ):(
                prescription && prescription.map((item,idx)=>{  
                return(
                  <Paper key={idx} elevation={3} sx={{backgroundColor:'#FEFFFF',width:'80vw',height:'9vh',borderRadius:'8px',marginBottom :'15px'}}>
                    <Box display='center' justifyContent='space-between' alignItems='center' sx={{width:'80vw'}}>
                      <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'10vw',height:'9vh',paddingLeft:'30px'}}>
                        {idx+1}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh'}}>
                        {item.patientData.name}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'10vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.id}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'22vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.dateMade.slice(8,10)}-{item.dateMade.slice(5,7)}-{item.dateMade.slice(0,4)}
                      </Typography>
                      <Box display='center' justifyContent='center' alignItems='center' sx={{width:'13vw'}}>
                        <Button onClick={() => {setShow(2);setid(idx)}}  sx={{backgroundColor:'#19414D',color:'#FEFFFF',marginLeft:'5vw',width:'5vw',height:'4vh',borderRadius:'15px','&:hover':{backgroundColor:'#19414D'}}}>
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
              )
            })
              )
                
                  
                
              
          }
      </Box>
    </div>
  )

};

export default Popup;
