const asyncHandler = require("express-async-handler");
const Patient = require("../model/patientSchema");
const Prescription = require("../model/prescriptionSchema");
const CsvParser = require("json2csv").Parser;

const addPrescription = asyncHandler(async (req, res) => {
  const { id, dateMade, symptoms, diagnosis, arr, date, tests, other } =
    req.body;

  const patient = await Patient.findOne({ "patientData.ticketId": id });
  if (!patient) {
    res.status(400).send("not Found");
  }
  const patientData = patient.patientData;
  const prescription = await Prescription.create({
    id,
    patientData,
    dateMade,
    symptoms,
    diagnosis,
    medicines: arr,
    tests,
    other,
    date,
  });
  if (prescription) {
    // if (date) {
    //   const patient = await Patient.findOneAndUpdate(
    //     { "patientData.ticketId": id },
    //     { appointedTime: date },

    //   );
    //   if (patient) {
    //     res.status(201).json(patient);
    //   } else {
    //     res.send("failed");
    //   }
    // } else {
    //   const patient = await Patient.findOneAndUpdate(
    //     { "patientData.ticketId": id },
    //     { isVisited: "true" }
    //   );
    // }
    try {
      const patient = await Patient.findOneAndUpdate(
        { "patientData.ticketId": id },
        { isVisited: "true" }
      );
      res.status(201).send("ok");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("failed");
  }
});

const fetchPrescription = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const prescriptions = await Prescription.find({ id: id });
  if (prescriptions) {
    res.status(201).json(prescriptions);
  } else {
    res.status(500).send("failed");
  }
});

const fetchAllPres = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({});
  if (prescriptions) {
    res.status(201).json(prescriptions);
  } else {
    res.status(500).send("failed");
  }
});

const exportTotalPrescription = asyncHandler(async (req, res) => {
  try {
    let users = [];

    let userData = await Prescription.find({});
    userData.forEach((user) => {
      const {
        patientData,
        dateMade,
        symptoms,
        diagnosis,
        medicines,
        tests,
        other,
        date,
      } = user;

      // Create an object to store Prescription details
      const PrescriptionDetails = {
        NAME: patientData.name,
        REG_NO: patientData.registrationP,
        DATE: dateMade,
        SYMPTOMS: symptoms,
        DIAGNOSIS: diagnosis,
        // MEDICINES: medicines,
        TEST_GIVEN: tests,
        OTHER: other,
        DATE: date,
      };
      medicines.forEach((med, index) => {
        PrescriptionDetails[`MEDICINE_${index + 1}_NAME`] = med.name;
        PrescriptionDetails[`DOSE [${index + 1}]`] = med.dose;
        PrescriptionDetails[`SCHEDULE [${index + 1}]`] = med.schedule;
        PrescriptionDetails[`QUANTITY [${index + 1}]`] = med.total;
      });

      console.log("PrescriptionDetails:", PrescriptionDetails);
      users.push(PrescriptionDetails);
    });

    const csvFields = [
      "NAME",
      "REG_NO",
      "DATE",
      "SYMPTOMS",
      "DIAGNOSIS",
      // "MEDICINES",
      "TEST_GIVEN",
      "CONTACT",
      "OTHER",
      "NEXT-VISITED-DATE",
    ];

    userData[0].medicines.forEach((_, index) => {
      csvFields.push(
        `MEDICINE_${index + 1}_NAME`,
        `DOSE`,
        `SCHEDULE`,
        `QUANTITY`
      );
    });

    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=PrescriptionData.csv"
    );
    res.status(200).end(csvData);
  } catch (error) {
    res.status(400).json({ status: 400, success: false, msg: error.message });
  }
});

module.exports = {
  addPrescription,
  fetchPrescription,
  fetchAllPres,
  exportTotalPrescription,
};
