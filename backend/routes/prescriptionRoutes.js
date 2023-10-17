const express = require("express");
const { fetchAll } = require("../controllers/patientController");
const {
  addPrescription,
  fetchPrescription,
  fetchAllPres,
  exportTotalPrescription,
} = require("../controllers/prescriptionController");

const router = express.Router();

router.post("/add", addPrescription);
router.post("/fetch", fetchPrescription);
router.post("/fetchAll", fetchAllPres);
router.get("/exportAll", exportTotalPrescription);
module.exports = router;
