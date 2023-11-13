import { Box, Button} from '@mui/material'
import React, { useState } from 'react'
import AdminLogin from './AdminLogin';
import DoctorLogin from './DoctorLogin';
import HwLogin from './HwLogin';
import LoginSelect from './LoginSelect'

const Login = ({setismain}) => {
    const [select, setSelect] = useState(0);
    
    function renderSwitch(){
        switch(select){
            case 0:
                return <LoginSelect setSelect={setSelect}/>
            case 1:
                return <DoctorLogin />
            case 2:
                return <AdminLogin />
            case 3:
                return <HwLogin />
            default:
                return <LoginSelect />
        }
    }
    return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{width:'98vw',height:'89vh'}}>
        <Button onClick={()=>{setismain(true)}} sx={{position:'absolute',top:'2vh',left:'3vw',backgroundColor:'#17252A',color:'#FEFFFF',padding:'1rem',borderRadius:'50px','&:hover':{backgroundColor:'#333333'}}}>
            <i className="material-icons" sx={{fontSize:'1rem'}}>keyboard_backspace</i>
        </Button>
        <Box>
            {renderSwitch()}
        </Box>
    </Box>
  )
}

export default Login