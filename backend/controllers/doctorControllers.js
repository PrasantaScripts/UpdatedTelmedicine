const asyncHandler = require("express-async-handler");
const Doctor = require("../model/doctorSchema");
const generateToken = require("../config/tokenGen");
const Log = require("../model/logSchema");
const PatientQ = require("../model/PatientQSchema");

const registerDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    ssfID,
    registrationID,
    mobile,
    adress,
    gender,
    speciality,
    arr,
  } = req.body;
  if (
    !name ||
    !ssfID ||
    !registrationID ||
    !mobile ||
    !adress ||
    !gender ||
    !speciality ||
    !arr
  ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const isExist = await Doctor.findOne({ registrationID });

  var timeAvailable = [...arr];
  console.log(timeAvailable);
  if (isExist) {
    res.status(400);
    throw new Error("doctor already exist");
  }

  const doctor = await Doctor.create({
    doc_name: name,
    SSF_ID: ssfID,
    Doctors_Registration_No: registrationID,
    Mobile: mobile,
    Address: adress,
    Gender: gender,
    Speciality: speciality,
    Availability: timeAvailable,
    blocked: false,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      registrationID: doctor.registrationID,
      ssfID: doctor.ssfID,
      timeAvailable: doctor.timeAvailable,
    });
  } else {
    res.status(400);
    throw new Error("failed to create a doctor");
  }
});

const findDoc = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  console.log(req.body);
  const doctor = await Doctor.findOne({ Doctors_Registration_No: userID });
  if (doctor) {
    res.send(doctor);
  } else {
    res.status(400);
    throw new Error("Doctor with this reg ID doesnt exist");
  }
});
const blockDoc = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  let doctor = await Doctor.findOne({ Doctors_Registration_No: userID });
  if (doctor) {
    try {
      doctor.blocked = !doctor.blocked;
      await doctor.save();
      res.status(201);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400);
    throw new Eroor("Doctor with this reg ID doesnt exist");
  }
});
const authDoctor = asyncHandler(async (req, res) => {
  const { registrationID } = req.body;

  const doctor = await Doctor.findOne({
    Doctors_Registration_No: registrationID,
  });
  // console.log(doctor)

  if (doctor && doctor.blocked == false) {
    const logReport = await Log.create({
      user: "Doctor",
      registrationId: registrationID,
      name: doctor.name,
      login: new Date(),
    });
    if (logReport) {
      res.status(201).json({
        _id: doctor._id,
        ssfID: doctor.SSF_ID,
        name: doctor.doc_name,
        registrationID: doctor.Doctors_Registration_No,
        timeAvailable: doctor.Availability,
        token: generateToken(doctor._id),
        logId: logReport._id,
      });
    } else {
      throw new Error("error");
    }
  } else {
    if (doctor.blocked) {
      res.status(400).json({
        message: "Contact Admin you are blocked",
      });
      throw new Error("Contact Admin");
    }
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const fetchTotalDoctors = asyncHandler(async (req, res) => {
  const count = await Doctor.countDocuments({});
  if (count) {
    res.status(201).json({
      count: count,
    });
  } else {
    res.status(400);
    throw new Error("check your internet");
  }
});

const editDoc = asyncHandler(async (req, res) => {
  const { infoData } = req.body;
  console.log(req.body);
  const doctor = await Doctor.findOne({
    Doctors_Registration_No: infoData.Doctors_Registration_No,
  });
  if (doctor) {
    console.log(doctor);
    doctor.doc_name = infoData.doc_name;
    doctor.SSF_ID = infoData.SSF_ID;
    doctor.Address = infoData.Address;
    doctor.Mobile = infoData.Mobile;
    doctor.Gender = infoData.Gender;
    doctor.Speciality = infoData.Speciality;
    await doctor.save();
  } else {
    res.send(400);
    throw new Error("Docotr with given Registration Id doesnt exist");
  }
});
const getDoctors = asyncHandler(async (req, res) => {
  const data = await Doctor.find();
  res.send(data);
});

const searchDoctor = asyncHandler(async (req, res) => {
  const { regId } = req.body;
  const doctor = await Doctor.findOne({ Doctors_Registration_No: regId });
  if (doctor) {
    res.send(doctor);
  } else {
    res.status(400);
    throw new Error("check your internet");
  }
});

const popQ = asyncHandler(async (req, res) => {
  const { doc_name } = req.body;
  console.log(doc_name);
  const queue = await PatientQ.findOne({ doc_name });
  console.log("pop initiated");
  if (queue) {
    queue.Patients.shift();
    await queue.save();
    res.status(201).json({
      name: queue.doc_name,
      TicketId: queue.Patients,
    });
  } else {
    res.status(400);
    throw new Error("Couldnt submit properly");
  }
});
const getQ = asyncHandler(async (req, res) => {
  const { doc_name } = req.body;
  console.log("GetQ Init");
  const queue = await PatientQ.findOne({ doc_name });
  // console.log(queue)
  if (queue) {
    res.send(queue.Patients);
  } else {
    const doc = await PatientQ.create({
      doc_name: doc_name,
      Patients: [],
    });
    if (doc) {
      res.status(201).json({
        name: doc.doc_name,
        TicketId: doc.Patients,
      });
    } else {
      res.status(400);
      throw new Error("Couldnt load Patients queue");
    }
  }
});
const modifyQ = asyncHandler(async (req, res) => {
  const { doc_name, queue } = req.body;
  const doctor = await PatientQ.findOne({ doc_name });
  // console.log(queue)
  if (doctor) {
    doctor.Patients = queue;
    await doctor.save();
    res.status(201).json({
      name: doctor.doc_name,
      TicketId: doctor.Patients,
    });
  } else {
    const doc = await PatientQ.create({
      doc_name: doc_name,
      Patients: queue,
    });
    if (doc) {
      res.status(201).json({
        name: doc.doc_name,
        TicketId: doc.Patients,
      });
    } else {
      res.status(400);
      throw new Error("failed to modify queue");
    }
  }
});

const fetchQ = asyncHandler(async (req, res) => {
  const { docName } = req.body;
  if (!docName) {
    res.status(400).send("not found");
  }
  const queue = await PatientQ.findOne({ doc_name: docName });
  if (queue) {
    res.status(201).json({
      Patients: queue.Patients,
    });
  } else {
    res.status(400);
    throw new Error("failed");
  }
});
module.exports = {
  registerDoctor,
  authDoctor,
  fetchTotalDoctors,
  getDoctors,
  searchDoctor,
  findDoc,
  blockDoc,
  editDoc,
  modifyQ,
  getQ,
  popQ,
  fetchQ,
};
