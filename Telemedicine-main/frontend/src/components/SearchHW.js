import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import Logo from '../images/Logo.png';
import {motion} from 'framer-motion';

const SearchHW = () => {
    const [searchType, setSearchType] = useState('1');
    const [userID, setInput] = useState();
    const [search,setSearch]=useState(true)
    const history = useHistory();
    const [arr,setArr]=useState();
    const [infoData,setInfoData]=useState({});
    const [block,setBlock]=useState(true);
    const [edit,setEdit]=useState(true)
    const isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0
    }
    const blockHandler= async () => {
    
        if(userID){
            try{
                const config = {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    }
                }
                const {data} = await axios.post('/api/hw/blockHw',{userID},config);
                if(data){
                    setBlock(!block)
                }
               
            }catch(e){
                console.log(e)
            }
        }
    }
    const handleChange = (event) => {
        setInfoData({...infoData,[event.target.name]:event.target.value})
    }
    const handleEdit= async () => {
        if(edit){
            setEdit(false)
            return
        }else{
            setEdit(true)
        }
        try{
           const config= {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                }
           } 
           console.log(infoData)
           const data=await axios.post('/api/hw/editHw',{infoData},config)
           if(data) {
                history.push('/admin')
           }

        }catch(e){
            console.log(e)
        }
    }
    const processInfo=() => {
        console.log(infoData)
        const Tarr=[]
        for(let key in infoData){
            const Temp={
                first:key,
                second:infoData[key]
            }
            if(Temp.second)
                 Tarr.push(Temp)
        }
        setArr(Tarr)
       
        setSearch(false)
    }
    useEffect(() => {
       if(isObjectEmpty(infoData)==false)
            processInfo()
    },[infoData])
const submitHandler = async()=>{
    
    if(!userID){
        setSearch(false)
        return;
    }
    try{
        const config = {
          
            headers: {
                "Content-type":"application/json"
            },   
                  
        }
    
        const {data} = await axios.post('/api/hw/findHw',{userID},config);
        console.log(data)
        setInfoData(data)
        // while(isObjectEmpty(infoData))
        // processInfo()
        
        
    }
    catch(error){
        console.log(error);
    }
}

  return (
    search==true ?
    (    

    <Box sx={{
        width: '98vw',
        height:'34vh',
        position:'absolute',
        right:'0px',
        top:'12vh'
    }} display='flex' justifyContent='center'>
        <motion.div layoutId='main'>
            <Paper elevation={3} sx={{backgroundColor:'#C7C7C7',marginTop:'15vh',borderRadius:'25px',width:'30vw',height:'45vh',minWidth:'500px'}}>
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{delay: 0.4}}>
                    <Box display='flex' alignItems='center' sx={{flexFlow:'column'}}>
                        <img src={Logo} alt='not found' style={{borderRadius:'50%',position:'absolute',top:'5vh'}}></img>
                        <Typography variant='h4' component='div' sx={{fontFamily:'Roboto Slab',color:'#17252A',marginTop:'12vh'}}>
                            Search HW
                        </Typography>
                        <Box sx={{ marginTop:'5vh',alignSelf:'start',marginLeft:'3vw' }} display='flex' justifyContent='center'>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
                            </Box>
                            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                            <InputLabel htmlFor="ID">{(searchType==='1')? 'Registration ID': 'Mobile Number'}</InputLabel>
                            <OutlinedInput
                                id="ID"
                                label={(searchType==='1')? "Registration ID" : "Mobile Number"}
                                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                                onChange={(e)=>{setInput(e.target.value)}  }
                            />
                            </FormControl>
                        </Box>
                        <Button onClick={submitHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',marginTop:'5vh','&:hover':{backgroundColor:'#CF9D6E'}}}>
                            Search
                        </Button>
                    </Box>
                </motion.div>
            </Paper>
        </motion.div>
    </Box>
   ):(
    <div style={{padding:'10% 40%'}}>
    <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'3%'}}>
        <button style={{padding:'5px 25px'}} onClick={()=>{const reply=window.confirm('Are you sure you want to Block?');if(reply){blockHandler()}}}>{block ? 'BLOCK':'UNBLOCK'}</button>
        <button style={{padding:'5px 25px'}} onClick={() => handleEdit()}>{edit? "EDIT":"SAVE"}</button>
        </div>
        <div>
        <table style={{width:'100%'}}>
        {arr.map((ind,key) => {
            
            return (
                
                 <tr >
                    <th >{ind.first} </th><th> <input name={ind.first} value={ind.second} disabled={edit} onChange={handleChange}/></th>
                </tr>

            )
            
        }) 
        }
        </table>
        </div>
    </div>
</div>
   )
  )
}

export default SearchHW;