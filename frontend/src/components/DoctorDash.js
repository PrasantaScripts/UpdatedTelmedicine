import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Paper} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DoctorDash = ({setPrevP,setShow,setPrescription,setPatient}) => {
  const [patientArr, setPatientArr] = useState(["None Found"]);
  const [meet,setMeet]=useState(['No Patient Meet Scheduled']);
  const [currTID,setCurrTID]=useState()
  const [greeting, setGreeting] = useState();
  const history = useHistory();
  const location = useLocation();
  
  const urlParams = new URLSearchParams(location.search);
  const doc_name = urlParams.get('DoctorName');
  console.log(doc_name)
  useEffect(()=>{
    async function fetch (){
      try{
        const config={
          headers: {
            "Content-type":"application/json"
          },
        }
        var today = new Date();
        var from = new Date(2020,9,9);
        var to = new Date(today.getFullYear(),today.getMonth(),parseInt(today.getDate())+1);
        console.log(to)
        const {data} = await axios.post('/api/patient/appointed',{doc_name,from,to},config);
        
        
          if(data.length===0){
            setPatientArr(['None Found'])
          }
          else{
            setPatientArr(data)
          }

        }
        catch (error){
          console.log(error);
        }
      }
      const getPatientQ =async  () => {
        try{
          const config={
            headers: {
                "Content-type":"application/json"
            },
          }
          console.log(doc_name)
          const {data}= await axios.post('/api/doctor/getQ',{doc_name},config)
          console.log(data.patientData.ticketId)
          if(data){
            setMeet('START MEET')
            localStorage.setItem('room',data.patientData.ticketId)
            setCurrTID(data.patientData.ticketId);
          }

        }catch(e){
          console.log(e)
        }
      }
      fetch()
      getPatientQ()
      const date = new Date()
      const hours = date.getHours()
      const min = date.getMinutes()
      if ((hours>=5 && min>=1) && (hours<=11 && min<=59)) {
        setGreeting('Good Morning')
      } else if((hours > 12 && min>=1 )&& (hours<=17 && min<=59)) {
        setGreeting('Good Afternoon')
      }
      else{
        setGreeting('Good Evening')
      }
    },[])

    function reload (){
      window.location.reload();
    }

    const meetHandler = () => {
      // const path = '/prescription/'+currTID;
      const path = '/conference/'+currTID;
      history.push(path);
    }
    // function roomHandler(idx){
    //   localStorage.setItem('room',patientArr[idx].patientData.ticketId)
    //   // const path = '/prescription/'+patientArr[idx].patientData.ticketId;
    //   const path = '/conference/'+patientArr[idx].patientData.ticketId;
    //   history.push(path);
    // }
 
    const prescriptionHandler = async(idx) => {
      const id = patientArr[idx].patientData.ticketId;
      try {
        const config = {
          headers: {
            "Content-type":"application/json"
          },          
        }
        const {data} = await axios.post('/api/patient/ticketFetch',{id},config);
        const reg = data.patientData.registrationP;
        console.log(data)
        const p = await axios.post('/api/patient/trueFetch',{id:reg},config);
        const t = await axios.post('/api/prescription/fetch',{id},config);
        console.log(t)
        setPrescription(t.data)
        setPrevP(t.data)
        setPatient(p.data)
        setShow(1)
      } catch (error) {
        console.log(error)
      }

    }
    
    return (
    <Box sx={{height:'150vh',position:'absolute'}}>
      <Box sx={{height:'20vh',width:'45vw',borderRadius:'15px',background:'linear-gradient(135deg, #2B7A78 10%, #3AAFA9 100%)',marginTop:'14vh',marginLeft:'8vw'}}>
        <Typography variant='h4' fontFamily='Roboto Slab' sx={{color:'#FEFFFF',marginLeft:'3vw',paddingTop:'2vh'}}>
          {greeting}!  {doc_name}
        </Typography>
        <Typography variant='h4' fontFamily='Roboto Slab' sx={{color:'#FEFFFF',marginLeft:'3vw',paddingTop:'2vh'}}>
          Number of Patients Today : {patientArr.length}
        </Typography>        
      </Box>
      <Box display='flex' alignItems='center' sx={{backgroundColor:'#D1D1D1',width:'80vw',height:'5vh',borderRadius:'8px 8px 0px 0px',marginTop:'4vh',marginLeft:'8vw'}}>
        <Typography variant='h7' component='div' sx={{fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'9vh',paddingLeft:'30px'}}>
          Sl No
        </Typography>
        <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
          Name
        </Typography>
        <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'30px'}}>
          Next Appointed Date
        </Typography>
        {/* <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'52px'}}>
          Details
        </Typography> */}
        <Typography variant='h7' component='div' sx={{justifyContent:'center',fontFamily:'Sans Serif',display:'flex',alignItems:'center',width:'20vw',height:'5vh',paddingLeft:'52px'}}>
          Previous Prescription
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-around' alignItems='center' sx={{flexFlow:'column'}}>
        <Button onClick={()=> reload()} sx={{position:'absolute',top:'30vh',left:'92vw',backgroundColor:'#17252A',color:'#FEFFFF',padding:'1rem',borderRadius:'50px','&:hover':{backgroundColor:'#333333'}}}>
            <i className="material-icons" sx={{fontSize:'1rem'}}>refresh</i>
        </Button>
        {
          patientArr.map((item,idx)=>{
            if(item==="None Found"){
              return(
                  <Box>
                    <Typography sx={{textAlign:'center',width:'80vw',marginTop:'40px'}}>
                      No Patients Today!
                    </Typography>
                  </Box>
              )
            }
            return(
              <Box sx={{backgroundColor:'#FEFFFF',height:'10vh',width:'80vw',marginLeft:'8vw',borderBottom:'1.5px solid grey'}}>
                  <Box display='flex' alignItems='center' sx={{height:'8vh',width:'80vw'}}>
                    <Typography variant='h7' display='flex' alignItems='center'  sx={{height:'10vh',fontFamily:'Sans Sherif',width:'20vw',paddingLeft:'4vw'}}>
                      {idx+1}
                    </Typography>
                    <Typography variant='h7' display='flex' justifyContent='center' alignItems='center'  sx={{height:'10vh',fontFamily:'Sans Sherif',width:'20vw',paddingLeft:'4vw'}}>
                      {item.patientData.name}
                    </Typography>
                    <Typography variant='h7' display='flex' justifyContent='center' alignItems='center'  sx={{height:'10vh',fontFamily:'Sans Sherif',width:'20vw',paddingLeft:'4vw'}}>
                      {item.nextAppointedDate.slice(8, 10)}{item.nextAppointedDate.slice(4, 7)}-{item.nextAppointedDate.slice(0, 4)}
                    </Typography>
                    {/* <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'8vh',fontFamily:'Sans Sherif',width:'20vw',paddingLeft:'4vw'}}>
                      <Button onClick={()=>roomHandler(idx)} className='btn' sx={{backgroundColor:'#19414D',color:'#FEFFFF',height:'7vh',width:'8vw',borderRadius:'15px'}}>
                        Start Meeting
                      </Button>
                    </Box> */}
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'8vh',fontFamily:'Sans Sherif',width:'20vw',paddingLeft:'4vw'}}>
                      <Button onClick={()=>prescriptionHandler(idx)} className='btn' sx={{backgroundColor:'#19414D',color:'#FEFFFF',height:'7vh',width:'8vw',borderRadius:'15px'}}>
                        See Prescription
                      </Button> 
                    </Box>
                  </Box>
              </Box>
            )

          })
        }
        <Button onClick={meetHandler} className='btn' sx={{backgroundColor:'#19414D',color:'#FEFFFF',height:'5vh',width:'10vw',borderRadius:'15px',marginTop:'2vh'}}
        disabled = {(meet === 'START MEET')? false:true}> 
          <Typography sx={{color:'white',fontSize:'0.8rem'}}>
            {meet}
          </Typography> 
        </Button>
      </Box>
            
      </Box>
  )
}

export default DoctorDash