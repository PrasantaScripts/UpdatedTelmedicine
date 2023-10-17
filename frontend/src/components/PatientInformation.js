import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../images/Logo.png";
import { motion } from "framer-motion";
import axios from "axios";

const PatientInformation = () => {
  const [search, setSearch] = useState(true);
  const [regNo, setInput] = useState();
  const [searchType, setSearchType] = useState("1");
  const [edit, setEdit] = useState(true);
  const [arr, setArr] = useState();
  const [patientdata, setPatientdata] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [showPat, setShowPat] = useState(false);
  const [showMed, setShowMed] = useState(false);
  const [others, setOthers] = useState(false);
  const [infoData, setInfoData] = useState({});
  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };
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
       const data=await axios.post('/api/patient/editPat',{infoData},config)
       if(data){
          console.log(data)
       }
       

    }catch(e){
        console.log(e)
    }
}
  const handleChangeP = (event) => {
    setInfoData({
      ...infoData,
      patientData: {
        ...infoData.patientData,
        [event.target.name]: event.target.value
      }
    })
      
  };
  const handleChangeM = (event) => {
    setInfoData({
      ...infoData,
      medical: {
        ...infoData.medical,
        [event.target.name]: event.target.value
      }
    })
  }
  const handleChange = (event) => {
    setInfoData({...infoData,[event.target.name]:event.target.value})
  }
  const handlePat = () => {
    setShowPat(true);
    setShowMed(false);
    setOthers(false);
  };
  const handleMed = () => {
    setShowPat(false);
    setShowMed(true);
    setOthers(false);
  };
  const handleOthr = () => {
    setShowPat(false);
    setShowMed(false);
    setOthers(true);
  };
  useEffect( () => {
    if(infoData){
      console.log(infoData)
    }
  },[infoData])
  const processInfo = () => {
    const Tarr = [];
    const TpatArr = [];
    const TmedArr = [];
    for (let key in infoData) {
      if (key != "pastHistory" && key != "gynacological") {
        if (key == "patientData") {
          console.log(key);
          for (let tkey in infoData[key]) {
            const Temp = {
              first: tkey,
              second: infoData[key][tkey],
            };
            // Tarr.push(Temp);
            TpatArr.push(Temp);
          }
        } else if (key == "medical") {
          for (let tkey in infoData[key]) {
            const Temp = {
              first: tkey,
              second: infoData[key][tkey],
            };
            // Tarr.push(Temp);
            TmedArr.push(Temp);
          }
        } else {
          const Temp = {
            first: key,
            second: infoData[key],
          };
          Tarr.push(Temp);
        }
      }
    }
    // console.log(Tarr);
    setPatientdata(TpatArr);
    setMedicalData(TmedArr);
    setArr(Tarr);
    setSearch(false);
  };
  useEffect(() => {
    if (isObjectEmpty(infoData) == false) processInfo();
  }, [infoData]);
  const submitHandler = async () => {
    try {
      console.log(regNo);
      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/patient/search",
        { regNo },
        config
      );

      setInfoData(data);
      processInfo();
    } catch (e) {
      console.log(e);
    }
  };
  const InfoComp = ({Arr,Change}) => {

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3%",
          }}
        >
          <button style={{ padding: "5px 25px" }} onClick={() => handleEdit()}>
            {edit ? "EDIT" : "SAVE"}
          </button>
        </div>
        <div>
          <table style={{ width: "100%" }}>
            {Arr.map((ind, key) => {
              return (
                <tr>
                  <th>{ind.first} </th>
                  <th>
                    <input
                      name={ind.first}
                      value={ind.second}
                      disabled={edit}
                      onChange={Change}
                    />
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  };
  
  return search == true ? (
    <Box
      sx={{
        width: "98vw",
        height: "34vh",
        position: "absolute",
        right: "0px",
        top: "12vh",
      }}
      display="flex"
      justifyContent="center"
    >
      <motion.div layoutId="main">
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#C7C7C7",
            marginTop: "15vh",
            borderRadius: "25px",
            width: "30vw",
            height: "45vh",
            minWidth: "500px",
          }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Box display="flex" alignItems="center" sx={{ flexFlow: "column" }}>
              <img
                src={Logo}
                alt="not found"
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "5vh",
                }}
              ></img>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: "Roboto Slab",
                  color: "#17252A",
                  marginTop: "12vh",
                }}
              >
                Search Patient
              </Typography>
              <Box
                sx={{ marginTop: "5vh", alignSelf: "start", marginLeft: "3vw" }}
                display="flex"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "#2B7A78",
                    width: "56px",
                    height: "56px",
                    color: "#17252A",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                >
                  <i
                    class="material-icons"
                    style={{ color: "#FEFFFF", fontSize: "2.5rem" }}
                  >
                    create
                  </i>
                </Box>
                <FormControl sx={{ width: "20vw", minWidth: "350px" }}>
                  <InputLabel htmlFor="ID">
                    {searchType === "1" ? "Registration ID" : "Mobile Number"}
                  </InputLabel>
                  <OutlinedInput
                    id="ID"
                    label={
                      searchType === "1" ? "Registration ID" : "Mobile Number"
                    }
                    sx={{
                      borderRadius: "0px 5px 5px 0px",
                      backgroundColor: "#FEFFFF",
                    }}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Button
                onClick={submitHandler}
                sx={{
                  backgroundColor: "#CF823A",
                  color: "#FEFFFF",
                  width: "8vw",
                  height: "5vh",
                  borderRadius: "25px",
                  marginTop: "5vh",
                  "&:hover": { backgroundColor: "#CF9D6E" },
                }}
              >
                Search
              </Button>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  ) : (
    <>
      <div style={{ padding: "10% 20%" }}>
        <div style={{width:"100%",display:'flex',justifyContent:'space-around',margin:"20px"}}>
          <button style={{padding:' 5px 25px'}} onClick={() => handlePat()}> Patient Info</button>
          <button style={{padding:' 5px 25px'}} onClick={() => handleMed()}> Patient Medical Info</button>
          <button style={{padding:' 5px 25px'}} onClick={() => handleOthr()}> Patient Other Info</button>
        </div>
        {others==true && <InfoComp Arr={arr} Change={handleChange}/>}
        {showPat==true && <InfoComp Arr={patientdata} Change={handleChangeP}/>}
        {showMed==true && <InfoComp Arr={medicalData} Change={handleChangeM}/>}
      </div>
    </>
  );
};
export default PatientInformation;
