import '../app.css'
import { Box, Button, CircularProgress, FormControl, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './sty.css';
const MedicineStore = ({logs}) => {
    const [data,setData]=useState(['hello'])
    const [disability,setDisabled]=useState('false')

    const [medicine, setMedicine] = useState([]);
    const [name, setName] = useState();
    const [show, setShow] = useState(0);
    const [csvData, setCsvData] = useState();
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("HwOnline"));
    useEffect(() => {
        async function fetch(){
          try{
              const config = {
                  headers: {
                      "Content-type":"application/json"
                  },          
              }
              const {data} = await axios.get('/api/med/Medicine',{},config);
              setMedicine(data);
              // console.log(typeof(data[0].LastPurchaseDate));
          }catch(error){
              console.log(error);
          } 
        }     
        fetch();
    }, [])

    const postDetails = (csv)=>{
      if(csv == undefined){
        console.log("error");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        setCsvData(csvToArray(text)); 
      };
      reader.readAsText(csv);
    }

    function csvToArray (str,delimiter=","){
      const rows = str.split("\n");
      const arr = rows.map(function (row) {
          const values = row.split(delimiter);
          return values.slice(1);
        });

      return arr;
    }

    // function changeHandler(idx,e){
    //   var arr = [...medicine]
    //   if(e.target.value.length===0){
    //     arr[idx].quantity=0;
    //     setMedicine(arr);
    //     return;
    //   }
    //   // console.log(/^-?\d+$/.test(""));
    //   if(/^-?\d+$/.test(e.target.value)) // to check if the input is a number
    //     arr[idx].quantity = parseInt(e.target.value).toString();

    //   setMedicine(arr)
        
    // }
    

    // async function submitHandler(idx){
    //     try{
    //         const config = {
    //             headers: {
    //                 "Content-type":"application/json"
    //             },          
    //         }
    //         const {data} = await axios.post('/api/med/change',{ id:medicine[idx]._id,query:medicine[idx].quantity},config);
    //         setMedicine(data);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    const addHandler = async ()=>{
      try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                },          
            }
            setLoading(true);
            const {data} = await axios.post('/api/med/add',{ csvData,user },config);
            setLoading(false);
            setShow(0);
            setMedicine(data);
          }catch(error){
            console.log(error);
        }
    }


return (
    <div class="content main" style={{marginTop:'8vh',paddingTop:'10vh'}}>
      <button onClick={(e)=>{logs(13)}} style={{position:'absolute',right:'2vw',top:'12vh',backgroundColor:'#193D47',outline:'none',border:'none',borderRadius:'15px',padding:'10px',width:'5vw',color:'#FFFFFF'}}>
        Logs
      </button>

    {
      (show)?
          <div>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#949494',opacity:'0.65',width:'100vw',height:'100vh',position:'fixed',zIndex:'2000'}}>
            </Box>
            <Box display='flex' alignItems='center'  sx={{flexFlow:'column',backgroundColor:'#FEFFFF',height:'40vh',width:'40vw',marginRight:'4vw',borderRadius:'15px',opacity:'1',position:'fixed',zIndex:5000,top:'30vh',left:'30vw'}}>
                <button onClick={()=>{setShow(0)}} style={{backgroundColor:'#CF823A',border:'none',color:'#FEFFFF',position:'relative',right:'15vw',marginTop:'3vh',width:'4vh',height:'4vh',borderRadius:'50px','&:hover':{backgroundColor:'#ffa44f'}}}>
                  <i class='fas fa-arrow-left'></i>
                </button>
                <Typography variant='h4' sx={{marginTop:'3vh',color:'#424242',fontFamily:'Roboto Slab'}}> 
                  Add Medicine
                </Typography>
                <Box sx={{ marginTop:'5vh' }} display='flex' justifyContent='center'>
                  <div class="input-group mb-3">
                    <input type="file" class="form-control" id="inputGroupFile01" accept='.csv' onChange={(e)=>{postDetails(e.target.files[0])}} />
                  </div>
                </Box>
              <Box>
                <button onClick={addHandler} style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#CF823A',border:'none',color:'#FEFFFF',marginTop:'3vh',width:'5vw',height:'5vh',borderRadius:'15px','&:hover':{backgroundColor:'#ffa44f'}}}>
                  {(loading)? <CircularProgress color="secondary" />:"ADD"}
                </button>
              </Box>
            </Box>
          </div>
          :
          <div>
            </div>
    }

      <button onClick={()=>{setShow(1)}} style={{position:'fixed',bottom:'2vh',border:'none',backgroundColor:'#19414D',color:'#FEFFFF',marginLeft:'5vw',width:'6vh',height:'6vh',borderRadius:'50px','&:hover':{backgroundColor:'#19414D'},fontSize:'1.2rem'}}> 
        <i class='fas fa-plus'></i>
      </button>
      <TableContainer component={Paper} sx = {{width:"80vw",marginLeft:"10vw",marginTop:"10v"}}>
        <Table sx={{minWidth: 650}} >
        <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>Sl_No</TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>
                Product_code
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: "#3CB3AC" }}>
                Product_name
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>
                Generic_name
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: "#3CB3AC" }}>
                CurStock_Level
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>
                Recorder_Level
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>
                LastPurchaseDate
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>
                RunningRR
              </TableCell>
              <TableCell sx={{ backgroundColor: "#3CB3AC" }}>Discard</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              medicine.map((item,idx)=>{
                return(
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell component="th" scope="row">{item.Product_code}</TableCell>
                    <TableCell>{item.Product_name}</TableCell>
                    <TableCell align="right">{item.Generic_name}</TableCell>
                    <TableCell align="right">{item.CurStock_Level}</TableCell>
                    <TableCell align="right">{item.Recorder_Level}</TableCell>
                    <TableCell align="right">{item.LastPurchaseDate}</TableCell>
                    <TableCell align="right">{item.RunningRR}</TableCell>
                    <TableCell align="right">{item.Discard}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default MedicineStore