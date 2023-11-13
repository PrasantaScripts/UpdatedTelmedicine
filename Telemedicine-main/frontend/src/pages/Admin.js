import {
  Box,
  List,
  ListItem,
  Toolbar,
  Drawer,
  ListItemText,
  ListItemButton,
  CssBaseline,
  AppBar,
  Button,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import LogRecord from "../components/LogRecord";
import SearchCards from "../components/SearchFamilyCards";
import SearchPrescription from "../components/SearchPrescription";
import MedicineStore from "../components/MedicineStore";
import mainImg from "../images/Logo.png";
import HealthWorkerPortal from "../components/HealthWorkerPortal";
import DoctorPortal from "../components/DoctorPortal";
import PatientInformation from "../components/PatientInformation";
import HwRegister from "../components/HwRegister";
import SearchFamilyCards from "../components/SearchFamilyCards";
import SearchHW from "../components/SearchHW";
import SearchDoctor from "../components/SearchDoctor";
import DoctorRegister from "../components/DoctorRegister";
import MedicineLog from "../components/MedicineLog";
import ShowPrescription from "../components/ShowPrescription";
import PrescriptionDetails from "../components/PrescriptionDetails";

const Admin = () => {
  const [isOpen, setisOpen] = useState(false);
  const [show, setshow] = useState(0);
  const [prescription, setPrescription] = useState();
  const [patient, setPatient] = useState();
  const [prevP, setPrevP] = useState();
  const history = useHistory();

  function selectComp() {
    switch (show) {
      case 0:
        return <Dashboard />;
      case 1:
        return <HealthWorkerPortal setShow={setshow} />;
      case 2:
        return <DoctorPortal setShow={setshow} />;
      case 3:
        return <SearchFamilyCards />;
      case 4:
        return (
          <SearchPrescription
            setPrevP={setPrevP}
            setPrescription={setPrescription}
            setShow={setshow}
            setPatient={setPatient}
          />
        );
      case 6:
        return <LogRecord />;
      case 5:
        return <MedicineStore logs={setshow} />;
      case 7:
        return <PatientInformation />;
      case 8:
        return <HwRegister />;
      case 11:
        return <MedicineLog />;
      case 12:
        return <SearchHW />;
      case 13:
        return <SearchDoctor />;
      case 14:
        return <DoctorRegister />;
      case 15:
        return (
          <ShowPrescription
            prevP={prevP}
            data={prescription}
            setData={setPrescription}
            setShow={setshow}
          />
        );
      case 16:
        return (
          <PrescriptionDetails
            data={prescription}
            patient={patient}
            setShow={setshow}
          />
        );
    }
  }

  const logoutHandler = async () => {
    const logId = JSON.parse(localStorage.getItem("AdminOnline")).logId;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/logs/logout", { logId }, config);
    } catch (error) {
      console.log(error);
      return;
    }
    localStorage.setItem("isAuth", false);
    localStorage.setItem("AdminOnline", false);
    history.push("/");
  };

  return (
    <Box sx={{ width: "100%", height: "150vh", backgroundColor: "#DEF2F1" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#FEFFFF", boxShadow: "none", height: "8vh" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton>
            <img
              src={mainImg}
              alt="Not available"
              style={{ width: "6vh", height: "6vh", margin: "4px" }}></img>
          </IconButton>
          <Button
            onClick={logoutHandler}
            sx={{
              backgroundColor: "#071114",
              width: "6vw",
              height: "4.5vh",
              borderRadius: "20px",
              color: "#FEFFFF",
              "&:hover": { backgroundColor: "#193D47" },
            }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={isOpen}
        onMouseOver={(e) => {
          setisOpen(true);
        }}
        onMouseOut={(e) => {
          setisOpen(false);
        }}
        sx={{
          width: isOpen ? "20vw" : "6vw",
          "& .MuiDrawer-paper": {
            width: isOpen ? "20vw" : "60px",
            boxSizing: "border-box",
            top: "8vh",
            transition: "width 0.3s",
            backgroundColor: "#DEDEDE",
          },
        }}>
        <List>
          {[
            "Dashboard",
            "Health Worker Portal",
            "Doctor Portal",
            "Search Family Cards",
            "Search Prescription",
            "Issue Medicine",
            "View Logs",
            "Patient Info",
          ].map((text, idx) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setshow(idx)}
                sx={{
                  height: "8vh",
                  justifyContent: isOpen ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    color: "#FEFFFF",
                    backgroundColor: "#193D47",
                  },
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <i class="material-icons" style={{ fontSize: "1.5rem" }}>
                    {idx % 2 === 0 ? "mouse" : "colorize"}
                  </i>
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {selectComp()}
    </Box>
  );
};

export default Admin;
