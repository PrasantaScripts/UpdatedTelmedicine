const asyncHandler = require('express-async-handler');
const Log = require('../model/logSchema');

const fetchLogs = asyncHandler(async (req,res)=>{
    const logs =await Log.find();
    if(logs){
        res.status(201).json(logs);
    }
    else{
        throw new Error ("error");
    }
})

const handelLogout = asyncHandler(async(req,res)=>{
    const {logId} = req.body;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const log = await Log.updateOne({_id:logId},{logout:date})
    if(log){
        res.status(201).json(log);
    }
})

module.exports = {fetchLogs,handelLogout}