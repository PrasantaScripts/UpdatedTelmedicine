import React from 'react'
import { Box, Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
const Success = ({subject,result}) => {
  return (
    <Box sx={{flexFlow:'column'}} display='flex' justifyContent='center' alignItems='center'>
        <Box>
            <Typography variant='h3' component='div' sx={{fontFamily:'Roboto Slab',marginTop:'15vh',marginLeft:'5vw',width:'50vw'}}>
                {subject} Registration {result}
            </Typography>
        </Box>
    </Box>
  )
}

export default Success