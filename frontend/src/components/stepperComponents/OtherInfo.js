import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
const OtherInfo = ({ setEducation, setFamilyIncome, setMaritalStatus }) => {
  return (
    <Box
      sx={{ flexFlow: "column", marginTop: "8vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        sx={{ marginTop: "3vh", alignSelf: "start", marginLeft: "-4vw" }}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <FormControl sx={{ width: "40vw" }}>
          <InputLabel id="demo-simple-select-label1">Education<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            label="Education"
            sx={{ backgroundColor: "#FEFFFF" }}
            defaultValue=""
            onChange={(e) => {
              setEducation(e.target.value);
            }}>
            <MenuItem value="कोई औपचारिक शिक्षा नहीं">
              No Education / कोई औपचारिक शिक्षा नहीं
            </MenuItem>
            <MenuItem value="कक्षा 5 तक">To Class 5 / कक्षा 5 तक</MenuItem>
            <MenuItem value="कक्षा 6-10, उत्तीर्ण नहीं">
              Class 6-10, Not Passout / कक्षा 6-10, उत्तीर्ण नहीं
            </MenuItem>
            <MenuItem value="10 . उत्तीर्ण">
              Up To Class 5 / 10 . उत्तीर्ण
            </MenuItem>
            <MenuItem value="कक्षा 11-12, उत्तीर्ण नहीं">
              Class 11-12, Not Passout / कक्षा 11-12, उत्तीर्ण नहीं
            </MenuItem>
            <MenuItem value="12 उत्तीर्ण">12 Pass / 12 उत्तीर्ण</MenuItem>
            <MenuItem value="नामांकित स्नातक">
              Enrolled Graduate / नामांकित स्नातक
            </MenuItem>
            <MenuItem value="ग्रेजुएट">Graduate / ग्रेजुएट</MenuItem>
            <MenuItem value="नामांकित स्नातकोत्तर">
              Enrolled Postgraduate / नामांकित स्नातकोत्तर
            </MenuItem>
            <MenuItem value="पोस्ट ग्रेजुएट">
              Post-graduate / पोस्ट ग्रेजुएट
            </MenuItem>
            <MenuItem value="अन्य">Other / अन्य</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{ marginTop: "25px", alignSelf: "start", marginLeft: "-4vw" }}
        display="flex"
        justifyContent="center">
        <FormControl sx={{ width: "40vw" }}>
          <InputLabel id="demo-simple-select-label2">
            Monthly Family Income<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-selec2"
            label="Monthly Family Income"
            sx={{ backgroundColor: "#FEFFFF" }}
            onChange={(e) => {
              setFamilyIncome(e.target.value);
            }}
            defaultValue="">
            <MenuItem value="Below 2000">Below 2000</MenuItem>
            <MenuItem value="Rs.2,000-5000">Rs.2,000-5000</MenuItem>
            <MenuItem value="Rs.5000-10,000">Rs.5000-10,000</MenuItem>
            <MenuItem value="Above Rs.10,000">Above Rs.10,000</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{ marginTop: "25px", alignSelf: "start", marginLeft: "-4vw" }}
        display="flex"
        justifyContent="center">
        <FormControl sx={{ width: "40vw" }}>
          <InputLabel id="demo-simple-select-label">Marital Status<Typography component="span" sx={{ color: 'red', marginLeft: '0.2rem' }}>*</Typography></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Marital Status"
            sx={{ backgroundColor: "#FEFFFF" }}
            defaultValue=""
            onChange={(e) => {
              setMaritalStatus(e.target.value);
            }}>
            <MenuItem value="Not Married/ अविवाहित">
              Not Married/ अविवाहित
            </MenuItem>
            <MenuItem value="विवाहित/ Married">विवाहित/ Married</MenuItem>
            <MenuItem value="विधवा / अलग (Widow/ Separated)">
              विधवा / अलग (Widow/ Separated)
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default OtherInfo;
