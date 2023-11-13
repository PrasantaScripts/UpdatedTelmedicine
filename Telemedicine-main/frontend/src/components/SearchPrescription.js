import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../images/Logo.png";
import { motion } from "framer-motion";
import axios from "axios";
const SearchPrescription = ({
  setPrevP,
  setPrescription,
  setShow,
  setPatient,
}) => {
  const [id, setId] = useState();

  const submitHandler = async () => {
    if (!id) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const p = await axios.post("/api/patient/trueFetch", { id }, config);
      const { data } = await axios.post(
        "/api/prescription/fetch",
        { id: p.data.patientData.ticketId },
        config
      );
      setPrescription(data);
      setPrevP(data);
      setPatient(p.data);
      console.log(p);
      if (data.length === 0) {
        setPrescription("None Found");
      }
      if (
        localStorage.getItem("HwOnline") !== null &&
        localStorage.getItem("HwOnline") !== "false"
      ) {
        setShow(11);
      } else if (
        localStorage.getItem("AdminOnline") !== null &&
        localStorage.getItem("AdminOnline") !== "false"
      ) {   
        setShow(15);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Downloading of CSV

  const exportCSV = async () => {
    try {
      const response = await axios.get("/api/prescription/exportAll", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PrescriptionDetails.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "98vw",
        height: "34vh",
        position: "absolute",
        right: "0px",
        top: "12vh",
      }}
      display="flex"
      justifyContent="center">
      <motion.div
        layout
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        layoutId="main">
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#C7C7C7",
            marginTop: "15vh",
            borderRadius: "25px",
            width: "30vw",
            height: "45vh",
          }}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.4 }}>
            <Box display="flex" alignItems="center" sx={{ flexFlow: "column" }}>
              <img
                src={Logo}
                alt="not found"
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "5vh",
                }}></img>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: "Roboto Slab",
                  color: "#17252A",
                  marginTop: "12vh",
                }}>
                Search Prescription
              </Typography>
              <Box
                sx={{ marginTop: "5vh", alignSelf: "start", marginLeft: "3vw" }}
                display="flex"
                justifyContent="center">
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
                  }}>
                  <i
                    class="material-icons"
                    style={{ color: "#FEFFFF", fontSize: "2.5rem" }}>
                    create
                  </i>
                </Box>
                <FormControl sx={{ width: "20vw" }}>
                  <InputLabel htmlFor="ID">Patient Id</InputLabel>
                  <OutlinedInput
                    id="ID"
                    label="Registration ID"
                    sx={{
                      borderRadius: "0px 5px 5px 0px",
                      backgroundColor: "#FEFFFF",
                    }}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  marginTop: "5vh",
                  alignSelf: "center",
                  minWidth: "350px",
                  marginLeft: "3vw",
                  display: "flex",
                  gap: "20%",
                }}>
                <Button
                  onClick={exportCSV}
                  sx={{
                    backgroundColor: "#CF823A",
                    color: "#FEFFFF",
                    width: "8vw",
                    height: "5vh",
                    borderRadius: "25px",
                    "&:hover": { backgroundColor: "#CF9D6E" },
                  }}>
                  Export CSV
                </Button>
                <Button
                  onClick={submitHandler}
                  sx={{
                    backgroundColor: "#CF823A",
                    color: "#FEFFFF",
                    width: "8vw",
                    height: "5vh",
                    borderRadius: "25px",

                    "&:hover": { backgroundColor: "#CF9D6E" },
                  }}>
                  Search
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SearchPrescription;
