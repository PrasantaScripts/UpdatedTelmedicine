import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import mainImg from '../images/Logo.png';
import Pdf from "react-to-pdf";
import { useHistory } from 'react-router-dom';

const FamilyCardsView = () => {


    const familyData = JSON.parse(localStorage.getItem('familyData'));
    // localStorage.removeItem("familyData"); 
    const ref = React.createRef();
    const history = useHistory();
    const properties = { header: 'Acme' }


  return (
    <React.Fragment>
    

    <Box display='flex' justifyContent='center' alignItems='center'>

        <Box  ref={ref} id='page' display='flex' alignItems='center' sx={{width:'40vw',minWidth:'900px',border:'1px solid black',borderRadius:'25px',flexFlow:'column',backgroundColor:'#FEFFFF',marginBottom:'30px',minHeight:'100vh'}}>
            <Box sx={{width:'100%',marginTop:'5vh'}} display='center' justifyContent='center' alignItems='center'>
                <img src={mainImg} alt="not found" style={{borderRadius:'50%',width:'10vmin',height:'10vmin'}}/>
            </Box>
            <Box sx={{width:'100%',marginTop:'3vh',flexFlow:'column'}} display='flex' justifyContent='center' alignItems='center'>
                <Typography variant='h5' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center'}}>
                    SHOSAN SURIN FOUNDATION TELEMEDICINE CENTER
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center',margin:'15px'}}>
                    Family Registration Card
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center'}}>
                    Registration Number: {familyData.id}
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center'}}>
                    Cheif Wage Earner: {familyData.name}
                </Typography>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center'}}>
                    Member Since: {familyData.date}
                </Typography>
            </Box>
            <Box sx={{width:'100%',marginTop:'3vh',flexFlow:'column'}} display='flex' justifyContent='center' alignItems='center'>
                <Typography variant='h6' component='div' sx={{fontFamily:'Sans Sherif',textAlign:'center'}}>
                    Core Family Members
                </Typography>
                <TableContainer sx={{width:'35vw'}} component={Box}>
                <Table sx={{ width:'35vw',borderWidth:'1px',borderStyle:'solid',borderColor:'rgb(209, 209, 209)',borderRadius:'5px' }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{color:'#FEFFFF',borderRadius:'5px 0px 0px 0px'}}>Id</TableCell>
                        <TableCell align='center' sx={{color:'#FEFFFF'}}>Name</TableCell>
                        <TableCell align='center' sx={{color:'#FEFFFF',borderRadius:'0px 5px 0px 0px'}}>Relationship</TableCell> 
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {familyData.members.map((row,idx) => (
                        <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align='center' component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align='center'>{row.name}</TableCell>
                        <TableCell align='center'>{row.relationship}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>         
            </Box>
            <Box sx={{width:'100%',marginRight:'50px',marginBottom:'10px'}} display='flex' justifyContent='end' alignItems='center'>
                <Typography variant='subtitle2' component='div'>
                    Issuer's Signature
                </Typography>
            </Box>
        </Box>
        <Button onClick={()=>{history.goBack()}} sx={{position:'absolute',top:'2vh',left:'3vw',backgroundColor:'#17252A',color:'#FEFFFF',padding:'1rem',borderRadius:'50px','&:hover':{backgroundColor:'#333333'}}}>
            <i className="material-icons" sx={{fontSize:'1rem'}}>keyboard_backspace</i>
        </Button>
        <Pdf targetRef={ref} filename="code-example.pdf" options={{ orientation: 'portrait',format: [9.4,10.6],unit:'in'}}>
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
    </Box>
    </React.Fragment>
  )
}

export default FamilyCardsView