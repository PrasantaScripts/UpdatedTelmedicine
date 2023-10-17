const asyncHandler = require('express-async-handler');
const Medicine = require('../model/medicineSchema');
const MedicineLogs = require('../model/medicineLogs');

const getMedicines=asyncHandler(async(req,res) => {
    const data=await Medicine.find()
    res.send(data)
})
const changeNumber = asyncHandler(async (req,res)=>{
    const {query,id} = req.body;
    const medicine = await Medicine.findOneAndUpdate({_id:id},{quantity:query})
    const medicines = await Medicine.find({});
    res.status(201).json(medicines);
})
const add = asyncHandler(async(req,res)=>{
    const {csvData,user} = req.body;
    for(var i = 1;i<csvData.length;i++){
        if(!csvData[i][0] || !csvData[i][1] || !csvData[i][2] || !csvData[i][3] || !csvData[i][4] || !csvData[i][5] || !csvData[i][6] || !csvData[i][7]){
            continue;
        }
        const med = {
            Product_code: csvData[i][0], 
            Product_name: csvData[i][1],
            Generic_name: csvData[i][2],
            CurStock_Level: csvData[i][3],
            Recorder_Level: csvData[i][4],
            LastPurchaseDate: csvData[i][5],
            RunningRR: csvData[i][6],
            Discard: csvData[i][7]
        }
        console.log(med.Product_code);
        if(!med.Product_code){
            continue;
        }
        const isPresent = await Medicine.find({Product_code:med.Product_code})
        var medicine;
        var logs;
        if(isPresent.length===0){
            medicine = await Medicine.create(med)
            logs = await MedicineLogs.create({
                name:med.Product_code,
                add:med.CurStock_Level,
                changer:user.userID,
            })
        }
        else{
            medicine = await Medicine.findOne({Product_code:med.Product_code});
            if(med.quantity!=medicine.quantity){
                logs = await MedicineLogs.create({
                    name:med.Product_code,
                    add:med.CurStock_Level-medicine.CurStock_Level,
                    changer:user.userID,
                })
            }
            medicine = await Medicine.findOneAndUpdate({Product_code:med.Product_code},{CurStock_Level:med.CurStock_Level})
        }
    }
    const medicines = await Medicine.find({})
    res.status(201).json(medicines)
})

const fetchLogs = asyncHandler(async (req,res)=>{
    const logs = await MedicineLogs.find({});
    if(logs){
        res.json(logs);
    }
    else{
        res.status(500);
        console.log("error");
    }
})

module.exports={getMedicines,fetchLogs,add,changeNumber}