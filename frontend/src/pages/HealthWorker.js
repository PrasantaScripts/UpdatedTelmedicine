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
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DoctorRegister from "../components/DoctorRegister";
import FamilyRegistration from "../components/FamilyRegistration";
import HwDashboard from "../components/HwDashboard";
import MedicalConsultation from "../components/MedicalConsultation";
import PatientForm from "../components/PatientForm";
import PatientInfo from "../components/PatientInfo";
import PrescriptionDetails from "../components/PrescriptionDetails";
import SearchFamilyCards from "../components/SearchFamilyCards";
import SearchPrescription from "../components/SearchPrescription";
import ShowPrescription from "../components/ShowPrescription";
import mainImg from "../images/Logo.png";
import MedicineStore from "../components/MedicineStore";
import MedicineLog from "../components/MedicineLog";
const HealthWorker = () => {
  const [isOpen, setisOpen] = useState(false);
  const [show, setshow] = useState(0);
  const [patientData, setPatientData] = useState({});
  const history = useHistory();
  const [prescription, setPrescription] = useState();
  const [patient, setPatient] = useState();
  const [prevP, setPrevP] = useState();
  useEffect(() => {
    if (localStorage.getItem("isAuth") === "false") {
      history.push("/");
    }
  }, []);

  function selectComp() {
    switch (show) {
      case 0:
        return <HwDashboard />;
      case 1:
        return <FamilyRegistration />;
      case 2:
        return (
          <PatientInfo setShow={setshow} setPatientData={setPatientData} />
        );
      case 3:
        return <DoctorRegister />;
      case 4:
        return <SearchFamilyCards />;
      case 5:
        return (
          <SearchPrescription
            setPrevP={setPrevP}
            setPrescription={setPrescription}
            setShow={setshow}
            setPatient={setPatient}
          />
        );
      case 6:
        return <MedicineStore logs={setshow} />;
      case 7:
        return <MedicalConsultation />;
      case 10:
        return <PatientForm patientData={patientData} />;
      case 11:
        return (
          <ShowPrescription
            prevP={prevP}
            data={prescription}
            setData={setPrescription}
            setShow={setshow}
          />
        );
      case 12:
        return (
          <PrescriptionDetails
            data={prescription}
            patient={patient}
            setShow={setshow}
          />
        );
      case 13:
        return <MedicineLog />;
    }
  }

  const logoutHandler = async () => {
    const logId = JSON.parse(localStorage.getItem("HwOnline")).logId;
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
    localStorage.setItem("HwOnline", false);
    localStorage.setItem("doc", "");
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
            "Family Registration",
            "Patient Registration",
            "Doctor Registration",
            "Search Family Card",
            "Search Prescription",
            "Issue Medicine",
            "Medical Consultation",
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

export default HealthWorker;
