const asyncHandler = require('express-async-handler');
const Consult=require('../model/consultantcySchema')


const fetchPatients =asyncHandler(async (req,res) => {
    const {docName}=req.body
    const data = await Consult.find({Assigned_Doctor:docName})
    
})