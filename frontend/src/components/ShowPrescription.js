import React from 'react'
import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'

const ShowPrescription = ({prevP,data,setData,setShow}) => { 

    function detailsHandler(idx){
        console.log(idx);
        console.log(prevP)
        setData(prevP[idx]);

        if(localStorage.getItem('HwOnline') !== 'null' && localStorage.getItem('HwOnline') !== 'false'){
          setShow(12);
        }
        else if(localStorage.getItem('AdminOnline') !== null && localStorage.getItem('AdminOnline') !== 'false'){
          setShow(16)
        }
        else if(localStorage.getItem('DoctorOnline') !== null && localStorage.getItem('DoctorOnline') !== 'false'){
          setShow(2)
        }
    }

    const redirectHandler = () => {
      if(localStorage.getItem('HwOnline') !== 'null' && localStorage.getItem('HwOnline') !== 'false'){
          setShow(5);
      }
      else if(localStorage.getItem('AdminOnline') !== null && localStorage.getItem('AdminOnline') !== 'false'){
          setShow(4)
      }
      else if(localStorage.getItem('DoctorOnline') !== null && localStorage.getItem('DoctorOnline') !== 'false'){
        setShow(0)
      }
    }

  return (
    <div style={{marginTop:'8vh'}}>
        <Button onClick={redirectHandler} sx={{position:'absolute',top:'10vh',left:'4vw',backgroundColor:'#CF823A',color:'#FEFFFF',padding:'1rem',borderRadius:'50px','&:hover':{backgroundColor:'#CF9D6E'}}}>
        <i className="material-icons" sx={{fontSize:'1rem'}}>keyboard_backspace</i>
      </Button>
        <Box display='flex' alignItems='center' sx={{width:'80vw',marginLeft:'5vw',borderRadius:'15px',marginLeft:'10vw',paddingTop:'40px',flexFlow:'column'}}>
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{backgroundColor:'#D1D1D1',width:'80vw',height:'5vh',borderRadius:'8px',marginBottom :'15px'}}>
            <Typography variant='h7' component='div' sx={{fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
              Sl No
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Name
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
              Ticket Id
            </Typography>
            <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'52px'}}>
              Details
            </Typography>
          </Box>
          {
            prevP.map((item,idx)=>{
              if(item==='None Found'){
                return (
                  <Box>
                    <Typography sx={{textAlign:'center',width:'80vw',marginTop:'40px'}}>
                      {item}
                    </Typography>
                  </Box>
                )
              }  
                return(
                  <Paper key={idx} elevation={3} sx={{backgroundColor:'#FEFFFF',width:'80vw',height:'9vh',borderRadius:'8px',marginBottom :'15px'}}>
                    <Box display='center' justifyContent='space-between' alignItems='center' sx={{width:'80vw'}}>
                      <Typography variant='h5' component='div' sx={{fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {idx+1}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh'}}>
                        {item.patientData.name}
                      </Typography>
                      <Typography variant='h6' component='div' sx={{justifyContent:'center',fontFamily:'Roboto Condensed',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
                        {item.id}
                      </Typography>
                      <Box display='center' justifyContent='center' alignItems='center' sx={{width:'20vw'}}>
                        <Button onClick={()=>detailsHandler(idx)} sx={{backgroundColor:'#19414D',color:'#FEFFFF',marginLeft:'5vw',width:'5vw',height:'4vh',borderRadius:'15px','&:hover':{backgroundColor:'#19414D'}}}>
                          Details
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
              )
            })
          }
        </Box>
    </div>
  )
}

export default ShowPrescription