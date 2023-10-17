import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import mainImg from '../images/Logo.png';

const Main = ({setisMain}) => {
  return (
    <Box>
        <Box sx={{ flexGrow: 1,display:'flex',justifyContent:'center' }}>
        <AppBar position="static" sx={{backgroundColor:'transparent',color:'#FEFFFF',boxShadow:'none',padding:'0px',width:'60%'}}>
            <div style={{display:'flex',margin:'1rem'}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                SSFNGO
              </Typography>
              <Button color="inherit" onClick={()=>{setisMain(false)}} sx={{margin:'0px',backgroundColor:'#17252A',borderRadius:'50px',width:'5vw','&:hover':{backgroundColor:'#444444'}}}>
                Login
              </Button>
            </div>
        </AppBar>
      </Box>
      <Box sx={{width:'99vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box display="flex" alignItems='center' justifyContent='center' sx={{
          width:'60vw',
          height:'50vmin',
          borderRadius:'8px',
          }}>
          <Box sx={{paddingRight:'48px',borderRight:'4px solid #F79E02'}}>
            <Typography variant='h2' component='div' align='right' sx={{flexGrow:1, color:'#FEFFFF',align:'right',fontFamily:'Roboto Slab'}}>
              Welcome To
            </Typography>
            <Typography variant='h1' align='right' component='div' sx={{flexGrow:1, color:'#17252A',align:'right',fontFamily:'Sans Sherif'}}>
              SSF 
            </Typography>
            <Typography variant='h2' align='right' component='div' sx={{flexGrow:1, color:'#17252A',align:'right',fontFamily:'Roboto Slab'}}>
              Telemedicine 
            </Typography>
          </Box>
          <Box sx={{paddingLeft:'48px'}}>
            <img src={mainImg} alt='img goes here'></img>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Main