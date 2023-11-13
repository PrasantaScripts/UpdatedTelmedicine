import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Popup from "./showPresriptionPopup";
import mainImg from "../images/Logo.png";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Popup1 = ({ setShow, Idx }) => {
  const printRef = useRef();
  const [patient, setPatient] = useState();
  const [prescription, setPrescription] = useState();
  const currDate = new Date();

  useEffect(() => {
    const handler = async () => {
      const id = localStorage.getItem("room");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/patient/ticketFetch",
          { id },
          config
        );
        const reg = data.patientData.registrationP;
        const p = await axios.post(
          "/api/patient/trueFetch",
          { id: reg },
          config
        );
        const t = await axios.post("/api/prescription/fetch", { id }, config);
        setPrescription(t.data[Idx]);
        setPatient(p.data);
      } catch (error) {
        console.log(error);
      }
    };
    handler();
  }, []);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      ((imgProperties.height * pdfWidth) / imgProperties.height) * 1.2;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };

  return (
    <div className="popup">
      <Button
        onClick={() => {
          setShow(1);
        }}
        sx={{
          position: "absolute",
          top: "10px",
          left: "2vw",
          backgroundColor: "#CF823A",
          color: "#FEFFFF",
          padding: "1rem",
          borderRadius: "50px",
          "&:hover": { backgroundColor: "#CF9D6E" },
        }}>
        <i className="material-icons" sx={{ fontSize: "1rem" }}>
          keyboard_backspace
        </i>
      </Button>
      <Button
        onClick={() => {
          setShow(0);
        }}
        sx={{
          position: "absolute",
          top: "10px",
          right: "2vw",
          backgroundColor: "#CF823A",
          color: "#FEFFFF",
          padding: "1rem",
          borderRadius: "50px",
          "&:hover": { backgroundColor: "#CF9D6E" },
        }}>
        <i className="material-icons" sx={{ fontSize: "2rem" }}>
          cancel
        </i>
      </Button>
      <Box
        ref={printRef}
        backgroundColor="#FEFFFF"
        sx={{
          height: "fit-content",
          minHeight: "100vw",
          paddingBottom: "4vh",
          paddingTop: "9vh",
          marginLeft: "5vw",
        }}>
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{
            margin: "8px",
            padding: "30px",
            borderBottom: "3px solid black",
            paddingBottom: "5px",
          }}>
          <img
            src={mainImg}
            alt="img goes here"
            style={{ width: "6vw", margin: "0px" }}></img>
          <Typography
            sx={{ padding: "10px", color: "blue", fontSize: "1.4rem" }}>
            Shoshan Surin Foundation
            <br />
            India
          </Typography>
          <Typography
            sx={{
              paddingLeft: "25vw",
              paddingTop: "20px",
              color: "blue",
              fontSize: "1.5rem",
            }}>
            {patient && patient.doctor}
          </Typography>
        </Box>

        <Box display="flex" sx={{ flexWrap: "wrap", width: "100vw" }}>
          <Box sx={{ alignSelf: "flex-start", marginLeft: "4vw" }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Patient Name:</b> {patient && patient.patientData.name}
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "40vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Date:</b> {prescription && prescription.dateMade.slice(8, 10)}/
              {prescription && prescription.dateMade.slice(5, 7)}/
              {prescription && prescription.dateMade.slice(0, 4)}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" sx={{ flexWrap: "wrap", width: "100vw" }}>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            {patient && (
              <Typography sx={{ fontSize: "1.2rem" }}>
                <b>Age:</b> {currDate.getFullYear() - patient.DOB.slice(0, 4)}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Weight: </b>
              {patient && patient.medical.weight}
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Height: </b>
              {patient && patient.medical.height}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          sx={{
            flexWrap: "wrap",
            width: "100vw",
            borderBottom: "3px solid black",
            paddingBottom: "5px",
          }}>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Blood Pressure: </b> {patient && patient.medical.sbp}/
              {patient && patient.medical.dbp}
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>Temperature:</b> {patient && patient.medical.temperature}
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              marginLeft: "4vw",
              marginBottom: "2vh",
            }}>
            <Typography sx={{ fontSize: "1.2rem" }}>
              <b>SPO2:</b> {patient && patient.medical.spo2}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            alignSelf: "flex-start",
            marginLeft: "4vw",
            marginBottom: "2vh",
          }}>
          <Typography sx={{ fontSize: "1.4rem" }}>
            <b>Symptoms Summary:</b>
            <br />
            {prescription &&
              prescription.symptoms.split("\n").map((line, index) => (
                <div style={{ marginLeft: "1vw" }} key={index}>
                  {line}
                </div>
              ))}
          </Typography>
        </Box>

        {/* <Box sx={{alignSelf:'flex-start',marginLeft:'4vw',marginBottom:'2vh'}}>
        { prescription && prescription.instructions !== ''?(
          <Typography sx={{fontSize:'1.4rem'}}>
          <b>Instructions:</b>
          <br/>
          { prescription && prescription.instructions.split('\n').map((line, index) => (
            <div style={{marginLeft:'1vw'}} key={index}>{line}</div>
          ))}
        </Typography>
        ):(
          <Typography sx={{fontSize:'1.3rem'}}>
              <b>Instructions: </b>
              <i>Not Specified</i>
            </Typography>
        )}
      </Box> */}

        <Box
          sx={{
            alignSelf: "flex-start",
            marginLeft: "4vw",
            marginBottom: "2vh",
          }}>
          {prescription && prescription.diagnosis !== "" ? (
            <Typography sx={{ fontSize: "1.4rem" }}>
              <b>Diagnosis:</b>
              <br />
              {prescription &&
                prescription.diagnosis.split("\n").map((line, index) => (
                  <div style={{ marginLeft: "1vw" }} key={index}>
                    {line}
                  </div>
                ))}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>Diagnosis: </b>
              <i>Not Specified</i>
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            alignSelf: "flex-start",
            marginLeft: "4vw",
            marginBottom: "2vh",
          }}>
          {prescription && prescription.number !== "" ? (
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>No of Medicines:</b>
              {prescription.number}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>No of Medicines: </b>
              <i>Not Specified</i>
            </Typography>
          )}
        </Box>

        {prescription && prescription.medicines.length !== 0 ? (
          <Box sx={{ marginTop: "2vh", marginLeft: "4vw" }}>
            <Typography sx={{ fontSize: "1.4rem" }}>
              <b>Medicines:</b>
            </Typography>
            <Box sx={{ width: "80vw" }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: "white",
                  width: "80vw",
                  height: "6.5vh",
                  borderRadius: "8px 8px 8px 8px",
                  marginTop: "1vh",
                  marginLeft: "0vw",
                  borderBottom: "5px solid grey",
                  borderTop: "5px solid grey",
                }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Sans Serif",
                    display: "flex",
                    alignItems: "center",
                    width: "20vw",
                    height: "9vh",
                    paddingLeft: "30px",
                  }}>
                  <b>Sl No</b>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Sans Serif",
                    display: "flex",
                    alignItems: "center",
                    width: "20vw",
                    height: "5vh",
                    paddingLeft: "0px",
                  }}>
                  <b>Medicine Name</b>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Sans Serif",
                    display: "flex",
                    alignItems: "center",
                    width: "20vw",
                    height: "5vh",
                    paddingLeft: "30px",
                  }}>
                  <b>Dosage</b>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "Sans Serif",
                    display: "flex",
                    alignItems: "center",
                    width: "20vw",
                    height: "5vh",
                    paddingLeft: "10px",
                  }}>
                  <b>Duration</b>
                </Typography>
              </Box>
              {prescription &&
                prescription.medicines.map((item, idx) => {
                  return (
                    <Box
                      sx={{
                        backgroundColor: "#FEFFFF",
                        height: "8vh",
                        width: "80vw",
                        marginLeft: "0vw",
                        marginTop: "2vh",
                        borderBottom: "1.5px solid grey",
                      }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ height: "4vh", width: "80vw" }}>
                        <Typography
                          variant="h6"
                          display="flex"
                          alignItems="center"
                          sx={{
                            height: "10vh",
                            fontFamily: "Sans Sherif",
                            width: "20vw",
                            paddingLeft: "3vw",
                          }}>
                          {idx + 1}
                        </Typography>
                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            height: "10vh",
                            fontFamily: "Sans Sherif",
                            width: "20vw",
                            paddingLeft: "0vw",
                          }}>
                          {item.name}
                        </Typography>

                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            height: "10vh",
                            fontFamily: "Sans Sherif",
                            width: "20vw",
                            paddingLeft: "0vw",
                          }}>
                          {item.schedule}
                        </Typography>

                        {/* <Typography variant='h6'   sx={{height:'10vh',fontFamily:'Sans Sherif',paddingLeft:'0vw'}}>                     
                      <Typography variant='h6'  sx={{fontFamily:'Sans Sherif',paddingLeft:'0vw',paddingTop:'10px'}}>
                        BreakFast: {item.breakFast}
                      </Typography>
                      <Typography variant='h6'  sx={{fontFamily:'Sans Sherif',paddingLeft:'0vw'}}>
                        Evening: {item.evening}
                      </Typography>
                    </Typography> */}

                        {/* <Typography variant='h6'   sx={{height:'10vh',fontFamily:'Sans Sherif',paddingLeft:'0vw'}}>
                      <Typography variant='h6' sx={{fontFamily:'Sans Sherif',paddingLeft:'0.8vw',paddingTop:'10px'}}>
                        Lunch: {item.lunch}
                      </Typography>
                      <Typography variant='h6' sx={{fontFamily:'Sans Sherif',paddingLeft:'0.8vw'}}>
                        Dinner: {item.dinner}
                      </Typography>
                    </Typography> */}

                        <Typography
                          variant="h6"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            height: "10vh",
                            fontFamily: "Sans Sherif",
                            width: "20vw",
                            paddingLeft: "4vw",
                            paddingTop: "15px",
                          }}>
                          {item.dose}
                          <br />
                          Total {item.total} medicines
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ marginTop: "2vh", marginLeft: "4vw", marginBottom: "2vh" }}>
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>Medicines: </b> <i>No medicine prescribed</i>
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            alignSelf: "flex-start",
            marginLeft: "4vw",
            marginBottom: "2vh",
          }}>
          {prescription && prescription.tests !== "" ? (
            <Typography sx={{ fontSize: "1.4rem" }}>
              <b>Investigations:</b>
              <br />
              {prescription &&
                prescription.tests.split("\n").map((line, index) => (
                  <div style={{ marginLeft: "1vw" }} key={index}>
                    {line}
                  </div>
                ))}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>Investigations: </b>
              <i>No test to be performed</i>
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            alignSelf: "flex-start",
            marginLeft: "4vw",
            marginBottom: "2vh",
          }}>
          {prescription && prescription.other !== "" ? (
            <Typography sx={{ fontSize: "1.4rem" }}>
              <b>Advice Given:</b>
              <br />
              {prescription &&
                prescription.other.split("\n").map((line, index) => (
                  <div style={{ marginLeft: "1vw" }} key={index}>
                    {line}
                  </div>
                ))}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "1.3rem" }}>
              <b>Advice Given: </b>
              <i>No advice given</i>
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          className="btn"
          sx={{
            backgroundColor: "#19414D",
            color: "#FEFFFF",
            height: "5vh",
            width: "10vw",
            borderRadius: "15px",
            marginTop: "2vh",
          }}
          onClick={handleDownloadPdf}>
          Download as PDF
        </Button>
      </Box>
    </div>
  );
};

export default Popup1;
