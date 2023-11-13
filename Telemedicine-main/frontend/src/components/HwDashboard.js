import {
  Box,
  Button,
  FormControl,
  Select,
  OutlinedInput,
  Paper,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-date-picker";
const HwDashboard = () => {
  const [familyCount, setFamilyCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [patientArr, setpatientArr] = useState(["None Found"]);
  const [docNames, setDocNames] = useState([]);
  const [docName, setDocName] = useState("");
  const [queue, setQueue] = useState(["Empty"]);
  const history = useHistory();

  async function fetch1() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      if (!docName) {
        console.log("no doc");
        return;
      }
      var { data } = await axios.post(
        "/api/doctor/fetchQ",
        { docName },
        config
      );
      setQueue(data.Patients);
      if (patientArr[0] === "None Found" || data.Patients.length == 0) {
        return;
      }
      return data.Patients;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    var patientQueue = fetch1();
    submitHandler(patientQueue);
  }, [docName]);

  useEffect(() => {
    async function fetch() {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      var { data } = await axios.get("/api/doctor/countDoctor", config);
      setDoctorCount(data.count);
      var { data } = await axios.get("/api/doctor/Doctor", config);
      const Temp = [];
      data.map((item) => {
        Temp.push(item.doc_name);
      });
      setDocNames(Temp);
    }
    fetch();
    const doc = localStorage.getItem("doc");
    setDocName(doc);
    fetch1();
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth == "false") {
      history.push("/");
    }
  }, []);

  const modifyQ = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const doc_name = docName;
      console.log(doc_name);
      // console.log(doc_name);
      const { data } = await axios.post(
        "/api/doctor/modifyQ",
        { doc_name, queue },
        config
      );
    } catch (e) {
      console.log(e);
    }
  };
  async function submitHandler(patientQueue) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const doc_name = docName;
      const { data } = await axios.post(
        "/api/patient/appointed",
        { from, to, doc_name },
        config
      );
      if (data.length === 0) {
        setpatientArr(["None Found"]);
      } else {
        const arr = data.filter((it, idx) => {
          var f = true;
          patientQueue.forEach((item) => {
            if (item.patientData.name === it.patientData.name) {
              f = false;
            }
          });
          return f;
        });
        setpatientArr(arr);
        console.log(queue);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const queueHandler = async (idx) => {
    setDocName(patientArr[idx].doctor);
    const item = patientArr[idx];
    if (queue.length == 1) {
      if (queue[0] == "Empty") {
        setQueue([patientArr[idx]]);
      } else {
        setQueue([...queue, item]);
      }
    } else {
      setQueue([...queue, item]);
    }
    //  modifyQ()
    setpatientArr(patientArr.filter((_, i) => i !== idx));
  };
  const dequeueHandler = (idx) => {
    const item = queue[idx];
    if (patientArr.length == 1) {
      if (patientArr[0] == "None Found") {
        setQueue(queue.filter((_, i) => i !== idx));
        return;
      } else {
        setpatientArr([...patientArr, item]);
      }
    } else {
      setpatientArr([...patientArr, item]);
    }
    setQueue(queue.filter((_, i) => i !== idx));
    // modifyQ()
  };
  useEffect(() => {
    modifyQ();
  }, [queue]);
  function roomHandler(idx) {
    localStorage.setItem("room", queue[idx].patientData.ticketId);
    console.log(queue[idx].patientData.name);
    console.log(queue[idx].patientData.ticketId);
    console.log("Going to room");
    // history.push('/conference');
    history.push("/conferenceHw");
  }

  const docHandler = (e) => {
    setDocName(e.target.value);
    localStorage.setItem("doc", e.target.value);
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <Box
        sx={{
          width: "98vw",
          height: "22vh",
        }}
        display="flex"
        justifyContent="center">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "#3A94AF",
            width: "40%",
            marginLeft: "30px",
            height: "10vh",
            borderRadius: "5px",
            marginTop: "10vh",
          }}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ flexFlow: "column", paddingLeft: "20px" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontFamily: "Roboto Slab", color: "#19414D" }}>
              Total Patient
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Sans Sherif", color: "#" }}>
              SSF Total Patient
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingRight="20px">
            <Typography
              variant="h3"
              component="div"
              sx={{ fontFamily: "Roboto Slab", color: "#FEFFFF" }}>
              {familyCount}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "#E5B436",
            width: "40%",
            marginLeft: "30px",
            height: "10vh",
            borderRadius: "5px",
            marginTop: "10vh",
          }}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ flexFlow: "column", paddingLeft: "20px" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontFamily: "Roboto Slab", color: "#985E1A" }}>
              Total Doctors
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Sans Sherif", color: "#" }}>
              SSF Doctors
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingRight="20px">
            <Typography
              variant="h3"
              component="div"
              sx={{ fontFamily: "Roboto Slab", color: "#FEFFFF" }}>
              {doctorCount}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          height: "8vh",
          width: "80vw",
          marginLeft: "5vw",
          backgroundColor: "#3AAFA9",
          borderRadius: "15px",
          marginLeft: "10vw",
        }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginLeft: "4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "12vh",
            fontFamily: "Roboto Slab",
            color: "#19414D",
          }}>
          From
        </Typography>
        <Box
          sx={{ alignSelf: "start", marginLeft: "1vw", marginTop: "1vh" }}
          display="flex"
          justifyContent="center">
          <FormControl sx={{ width: "10vw" }}>
            <OutlinedInput
              id="ID"
              type="date"
              placeholder="DD/MM/YYYY"
              sx={{ borderRadius: "5px", height: "5vh", marginTop: "5px" }}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />
          </FormControl>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginLeft: "4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "12vh",
            fontFamily: "Roboto Slab",
            color: "#19414D",
          }}>
          To
        </Typography>
        <Box
          sx={{ alignSelf: "start", marginLeft: "1vw", marginTop: "1vh" }}
          display="flex"
          justifyContent="center">
          <FormControl sx={{ width: "10vw" }}>
            <OutlinedInput
              id="ID"
              type="date"
              placeholder="DD/MM/YYYY"
              sx={{ borderRadius: "5px", height: "5vh", marginTop: "5px" }}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
            {/* <DatePicker onChange={(e)=>setTo(e)} selected={to} /> */}
          </FormControl>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginLeft: "4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "12vh",
            fontFamily: "Roboto Slab",
            color: "#19414D",
          }}>
          Doctor
        </Typography>
        <Box
          sx={{ alignSelf: "start", marginLeft: "1vw", marginTop: "1vh" }}
          display="flex"
          justifyContent="center">
          <FormControl sx={{ width: "15vw" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={docName}
              sx={{ borderRadius: "5px", height: "5vh", marginTop: "5px" }}
              displayEmpty
              label="Doctor"
              onChange={docHandler}>
              <MenuItem value="" disabled>
                Select a doctor
              </MenuItem>
              {docNames.map((item, idx) => {
                return (
                  <MenuItem value={item} key={idx}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button
          onClick={(e) => {
            submitHandler(queue);
          }}
          sx={{
            backgroundColor: "#19414D",
            color: "#FEFFFF",
            marginLeft: "5vw",
            width: "5vw",
            height: "4vh",
            borderRadius: "15px",
            "&:hover": { backgroundColor: "#19414D" },
          }}>
          Fetch
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: "80vw",
          marginLeft: "5vw",
          borderRadius: "15px",
          marginLeft: "10vw",
          paddingTop: "40px",
          flexFlow: "column",
        }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "#D1D1D1",
            width: "80vw",
            height: "5vh",
            borderRadius: "8px",
            marginBottom: "15px",
          }}>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "16vw",
              height: "9vh",
              paddingLeft: "30px",
            }}>
            Sl No
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "16vw",
              height: "5vh",
              paddingLeft: "30px",
            }}>
            Name
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "16vw",
              height: "5vh",
              paddingLeft: "30px",
            }}>
            Doctor Appointed
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "16vw",
              height: "5vh",
              paddingLeft: "52px",
            }}>
            Visited
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{
              justifyContent: "center",
              fontFamily: "Sans Serif",
              display: "flex",
              alignItems: "center",
              width: "16vw",
              height: "5vh",
              paddingLeft: "52px",
            }}>
            Add to Queue
          </Typography>
        </Box>
        <h1>In Queue</h1>
        {queue.map((item, idx) => {
          if (item === "Empty") {
            return (
              <Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "80vw",
                    marginTop: "40px",
                  }}>
                  {item}
                </Typography>
              </Box>
            );
          }
          return (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                backgroundColor: "#FEFFFF",
                width: "80vw",
                height: "9vh",
                borderRadius: "8px",
                marginBottom: "15px",
              }}>
              <Box
                display="center"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "80vw" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  {idx + 1}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                  }}>
                  {item.patientData.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  {item.doctor}
                </Typography>
                <Box
                  display="center"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "32vw" }}>
                  <Button
                    onClick={() => roomHandler(idx)}
                    sx={{
                      backgroundColor: "#19414D",
                      color: "#FEFFFF",
                      marginLeft: "5vw",
                      width: "8vw",
                      height: "4vh",
                      borderRadius: "15px",
                      "&:hover": { backgroundColor: "#19414D" },
                    }}>
                    Start
                  </Button>
                  <Button
                    onClick={() => dequeueHandler(idx)}
                    sx={{
                      backgroundColor: "#19414D",
                      color: "#FEFFFF",
                      marginLeft: "5vw",
                      width: "8vw",
                      height: "4vh",
                      borderRadius: "15px",
                      "&:hover": { backgroundColor: "#19414D" },
                    }}>
                    Remove
                  </Button>
                </Box>
              </Box>
            </Paper>
          );
        })}
        <h1>In schedule</h1>
        {patientArr.map((item, idx) => {
          if (item === "None Found") {
            return (
              <Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "80vw",
                    marginTop: "40px",
                  }}>
                  {item}
                </Typography>
              </Box>
            );
          }
          return (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                backgroundColor: "#FEFFFF",
                width: "80vw",
                height: "9vh",
                borderRadius: "8px",
                marginBottom: "15px",
              }}>
              <Box
                display="center"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "80vw" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  {idx + 1}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                  }}>
                  {item.patientData.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Roboto Condensed",
                    display: "flex",
                    alignItems: "center",
                    width: "16vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  {item.doctor}
                </Typography>
                <Box
                  display="center"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "32vw" }}>
                  <Button
                    onClick={() => roomHandler(idx)}
                    sx={{
                      backgroundColor: "#FFF",
                      color: "#000",
                      marginLeft: "5vw",
                      width: "8vw",
                      height: "4vh",
                      borderRadius: "15px",
                      "&:hover": { backgroundColor: "#19414D" },
                    }}
                    disabled>
                    Start
                  </Button>
                  <Button
                    onClick={() => queueHandler(idx)}
                    sx={{
                      backgroundColor: "#19414D",
                      color: "#FEFFFF",
                      marginLeft: "5vw",
                      width: "8vw",
                      height: "4vh",
                      borderRadius: "15px",
                      "&:hover": { backgroundColor: "#19414D" },
                    }}>
                    Add
                  </Button>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </motion.div>
  );
};

export default HwDashboard;
