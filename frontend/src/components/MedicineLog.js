import axios from 'axios';
import { Box, Button, CircularProgress, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react'
import './logs.css'
const MedicineLog = () => {
  const [logs, setLogs] = useState([1]);
  useEffect(() => {
    async function fetch(){
      const config = {
          headers: {
            "Content-type":"application/json"
          },
      }
      var {data} = await axios.get('/api/med/fetchlogs',config);
      setLogs(data)
    }
    fetch();
  }, [])
  
    return (
      <div className='main' style={{height:'fit-content',width:'100vw',display:'flex',justifyContent:'center',paddingTop:'15vh'}}>
         <div>
          <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} >
          <TableHead >
            <TableRow>
              <TableCell sx={{backgroundColor:"#3CB3AC"}}>Sl no</TableCell>
              <TableCell sx={{backgroundColor:"#3CB3AC"}}>Product Name</TableCell>
              <TableCell  sx={{backgroundColor:"#3CB3AC"}}>User</TableCell>
              <TableCell align="right" sx={{backgroundColor:"#3CB3AC"}}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              logs.map((item,idx)=>{
                return(
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell component="th" scope="row">{item.name}</TableCell>
                    <TableCell>{item.changer}</TableCell>
                    {
                      (item.add>=0)? <TableCell align="right" sx={{color:'green'}}>{item.add}</TableCell> : <TableCell align="right" sx={{color:'red'}}>-{item.add}</TableCell>
                    }
                    
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
         </div>
      </div>
    )
}

export default MedicineLog;