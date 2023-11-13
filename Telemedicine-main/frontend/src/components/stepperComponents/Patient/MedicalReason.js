import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  OutlinedInput,
} from "@mui/material";

const MedicalReason = ({ medReasons, setMedReasons }) => {
  const reasons = [
    "नियमित चेक अप (Routine Check up)",
    "फॉलोअप चेक अप (Follow up Check up)",
    "बुखार (Fever) ",
    "सांस लेने में तकलीफ (Breathing Trouble) ",
    "गले की परेशानी (Throat Trouble) ",
    "उबकाई (Nausea) ",
    "फिटनेस प्रमाण पत्र (Fitness Certificate) ",
    "भूख में कमी (Loss of Appetite) ",
    "छाती में दर्द (Chest Pain) ",
    "सरदर्द (Headache) ",
    "पैर / घुटने का दर्द (Leg / Knee Pain) ",
    "गर्दन दर्द (Neck Pain) ",
    "पीठ दर्द (Back Pain) ",
    "आँख की परेशानी (Eye Trouble) ",
    "जोड़ों का दर्द (Joint Pain) ",
    "गैस / अम्लता (Gas / Acidity / Heart burn) ",
    "कान की परेशानी (Ear Trouble) ",
    "हाथ का दर्द (Hand Pain) ",
    "दांत की परेशानी (Tooth Trouble) ",
    "रक्तचाप (Blood Pressure / Hypertension) ",
    "सर्दी ज़ुखाम (Cold-Cough) ",
    "नर्वस कमजोरी (Nervous Weakness) ",
    "त्वचा की एलर्जी और संक्रमण (Skin allergy & infection) ",
    "कटिस्नायुशूल (Sciatica) ",
    "जराचिकित्सा की समस्या (Geriatric Problem) ",
    "स्त्री रोग संबंधी समस्या (Gynaecological Problem) ",
    "मनोवैज्ञानिक समस्या (Psychological Problem) ",
    "घबराहट की बीमारियां (Anxiety) ",
    "कब्ज़ (Constipation) ",
    "Lose motions (दस्त) ",
    "Vomiting (उल्टी) ",
    "घाव (Wound) ",
    "हड्डी में दर्द (Bone Pain) ",
    "मूत्र पथ से संबंधित समस्या (Problem Related To Urinary Tract) ",
    "दुर्बलता (Weakness) ",
    "मधुमेह (Diabetes) ",
    "रक्तस्रवण (Bleeding) ",
    "बहरापन (Hearing Loss) ",
    "आंखों की रोशनी के साथ समस्या (Issue with Eye Sight) ",
    "तीव्र श्वसन संक्रमण (Acute Respiratory Infection (ARI)/Influenza like illness (ILI)) ",
    "न्यूमोनिया (Pneumonia) ",
    "तीव्र डायरिया रोग (Acute Diarrhoeal Disease) ",
    "दण्डाणुज पेचिश (Bacillary Dysentery) ",
    "आंतों का बुखार (Enteric Fever) ",
    "वायरल हेपेटाइटिस (Viral Hepatitis) ",
    "मलेरिया (Malaria) ",
    "डेंगू (Dengue/DHF/Dss) ",
    "चिकनगुनिया (Chikunguniya) ",
    "डिप्थीरिया (Diphtheria) ",
    "काली खांसी (Pertussis) ",
    "छोटी चेचक (Chicken Pox) ",
    "मीसल्स (Measles) ",
    "मस्तिष्कावरण शोथ (Meningitis) ",
    "तीव्र एन्सेफलाइटिस की समस्या (Acute Encephalitis problem) ",
    "अज्ञात बुखार (Fever of Unknown Origin (PUO)) ",
    "कालाजार (Kala-azar) ",
    "लेप्टोस्पाइरोसिस (Leptospirosis) ",
    "Acute Flaccid Paralysis <15 years of age ",
    "पशु का काटना (Animal bite) ",
    "रेबीज (Rabies) ",
    "सांप का काटना (Snake Bite) ",
    "बिसहरिया (Anthrax) ",
    "आर्सेनिकोसीस (Arsenicosis) ",
    "फाइलेरिया Filariasis ",
    "थैलेसीमिया (Thalassemia) ",
    "शराब की लत (Alcohol addiction) ",
    "कमर दर्द (Waist Pain)",
    "पेट दर्द (Stomach ache)",
    "others",
  ];

  const [showOthersInput, setShowOthersInput] = useState(false);
  const [othersReason, setOthersReason] = useState("");

  function handleChange(idx) {
    if (reasons[idx] === "others") {
      setShowOthersInput(!showOthersInput);
    } else {
      const arr = [...medReasons];
      if (arr.includes(reasons[idx])) {
        arr.splice(arr.indexOf(reasons[idx]), 1);
      } else {
        arr.push(reasons[idx]);
      }
      setMedReasons(arr);
    }
  }

  function handleOthersReasonChange(event) {
    setOthersReason(event.target.value);
  }

  function handleAddOthersReason() {
    if (othersReason.trim() !== "") {
      setMedReasons([...medReasons, othersReason]);
      setOthersReason("");
      setShowOthersInput(true);
    }
  }

  return (
    <Box sx={{ flexFlow: "column" }} display="flex" justifyContent="center">
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel
          component="legend"
          sx={{
            fontSize: "2rem",
            color: "black",
            marginBottom: "4vh",
            marginLeft: "5vw",
          }}>
          Reason for Consultation:
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "50vw",
            paddingLeft: "5vw",
          }}>
          {reasons.map((item, idx) => (
            <FormGroup key={idx}>
              <FormControlLabel
                control={
                  <Checkbox onChange={() => handleChange(idx)} name={item} />
                }
                sx={{
                  backgroundColor: "#FEFFFF",
                  width: "19vw",
                  padding: "1vw",
                  marginBottom: "2vh",
                  borderRadius: "8px",
                }}
                label={item}
              />
            </FormGroup>
          ))}
          {showOthersInput && (
            <FormGroup>
              <OutlinedInput
                placeholder="Enter if any types of other reasons"
                value={othersReason}
                onChange={handleOthersReasonChange}
                sx={{
                  backgroundColor: "#FEFFFF",
                  width: "19vw",
                  padding: '0.5vw',
                  marginBottom: "2vh",
                  borderRadius: "8px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOthersReason}>
                Submit
              </Button>
            </FormGroup>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export default MedicalReason;
