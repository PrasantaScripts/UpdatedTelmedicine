import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
const LoginSelect = ({setSelect}) => {
    const history = useHistory();
    useEffect(() => {
        const Admin = JSON.parse(localStorage.getItem('AdminOnline'));
        const Hw = JSON.parse(localStorage.getItem('HwOnline'));
        if(Admin){
            history.push('/admin');
        }
        if(Hw){
            history.push('/HealthWorker')
        }
    },[])
    

    return (
        <Box display='flex' justifyContent='space-around' sx={{width:'50vw',backgroundColor:'#',borderRadius:'8px',padding:'1.5rem'}}>
            <Button onClick={()=>{setSelect(1)}} variant="outlined" sx={{width:'30vw',height:'25vh',padding:'0px',margin:'1rem',borderColor:'#2B7A78'}}>
                <Paper elevation={5}  sx={{width:'100%',height:'100%',background:'linear-gradient(135deg, #FAB2FF 10%, #FEFFFF 100%)'}}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'23vh',flexFlow:'column'}}>
                        <i class="material-icons" style={{color:'#FEFFFF',fontSize:'6rem',color:'#828282',marginTop:'2vh',marginBottom:'2vh'}}>portrait</i>
                        <Typography variant='subtitle2' component='div' sx={{color:'#17252A'}} >
                            Doctor Login
                        </Typography>
                    </Box>
                </Paper>
            </Button>
            <Button onClick={()=>{setSelect(2)}} variant="outlined" sx={{width:'30vw',height:'25vh',padding:'0px',margin:'1rem',borderColor:'#2B7A78'}}>
                <Paper elevation={5}  sx={{width:'100%',height:'100%',background:'linear-gradient(135deg, #FAB2FF 10%, #FEFFFF 100%)'}}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'23vh',flexFlow:'column'}}>
                        <i class="material-icons" style={{color:'#FEFFFF',fontSize:'6rem',color:'#828282',marginTop:'2vh',marginBottom:'2vh'}}>account_circle</i>
                        <Typography variant='subtitle2' component='div' sx={{color:'#17252A'}} >
                            Admin Login
                        </Typography>
                    </Box>
                </Paper>
            </Button>
            <Button onClick={()=>{setSelect(3)}} variant="outlined" sx={{width:'30vw',height:'25vh',padding:'0px',margin:'1rem',borderColor:'#2B7A78'}}>
                <Paper elevation={5}  sx={{width:'100%',height:'100%',background:'linear-gradient(135deg, #FAB2FF 10%, #FEFFFF 100%)'}}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'23vh',flexFlow:'column'}}>
                        <i class="material-icons" style={{color:'#FEFFFF',fontSize:'6rem',color:'#828282',marginTop:'2vh',marginBottom:'2vh'}}>assignment_ind</i>
                        <Typography variant='subtitle2' component='div' sx={{color:'#17252A'}} >
                            Health Worker Login
                        </Typography>
                    </Box>
                </Paper>
            </Button>
        </Box>
  )
}

export default LoginSelect