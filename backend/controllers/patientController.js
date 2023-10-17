const asyncHandler = require('express-async-handler');
const Patient = require('../model/patientSchema');
const Family = require('../model/familySchema');
const Consult=require('../model/consultantcySchema')
const fetchPatient = asyncHandler(async (req,res)=>{
    const {regId} = req.body;
    const fId = regId.substring(0,regId.length-2);
    const family = await Family.findOne({id:fId});
    var mem = family.members.filter((item)=>{
        return item.id == regId
    })
    if(!mem[0]){
        mem = family.additionalMembers.filter((item)=>{
            return item.id == regId
        })
    }
    if(mem[0]){
        const listPatient = await Patient.find({registrationP:regId})
        var count = listPatient.length;
        var number="";
        if(count+1<10){
            number = "000" + (count+1);
        }
        else if(count+1<100){
            number = "00"+(count+1);
        }
        else if(count+1<1000){
            number = '0'+(count+1);
        }
        else{
            number = (count+1)+"";
        }
        const ticket = mem[0].id + number+ "";
        const patient = await Patient.findOne({'patientData.registrationP':regId});
        if(!patient){
            res.status(201).json({
                registrationP: mem[0].id,
                registrationNumber:fId,
                name:mem[0].name,
                ticketId:ticket,
                relationship:mem[0].relationship,
                DOB:"",
                mobile:"",
            })
        }
        else{
            res.status(201).json({
                registrationP: mem[0].id,
                registrationNumber:fId,
                name:mem[0].name,
                ticketId:ticket,
                relationship:mem[0].relationship,
                DOB:patient.DOB,
                mobile:patient.mobile,
            })
        }
    }
})

const addPatient = asyncHandler(async(req,res)=>{
    const {marital,DOB,education,profession,height,weight,temperature,pulse,sbp,dbp,alcohol,asthama,diabetes,familyIll,smoking,spo2,admitted,currentMed,healthCondition,injuries,pastDiseases,abortion,numberOfChild,otherComplications,totalPregnancies,others,otherHistory,patientData,mobile,gender,medReasons} = req.body;
    const medical={
        height:height,
        weight:weight,
        temperature:temperature,
        pulse:pulse,
        sbp:sbp,
        dbp:dbp,
        alcohol:alcohol,
        asthama:asthama,
        diabetes:diabetes,
        familyIll:familyIll,
        smoking:smoking,
        spo2:spo2,
        others:others,
    };
    const pastHistory={
        admitted:admitted,
        currentMed:currentMed,
        healthCondition:healthCondition,
        injuries:injuries,
        otherHistory:otherHistory,
        pastDiseases:pastDiseases,
    };
    const gynocoligical={
        abortion:abortion,
        numberOfChild:numberOfChild,
        otherComplications:otherComplications,
        totalPregnancies:totalPregnancies,
    };
    const exist = await Patient.findOne({'patientData.registrationP':patientData.registrationP});
    if(!exist){
        const patient = await Patient.create({
            patientData,
            marital,
            gender,
            DOB,
            education,
            profession,
            mobile,
            medical,
            pastHistory,
            gynocoligical,
            reason:medReasons,
        });
        console.log(patient);
        if(patient){
            res.status(201).json(patient);
        }
    }
    else{
        const update = await Patient.updateOne({'patientData.registrationP':patientData.registrationP},{
            patientData,
            marital,
            gender,
            DOB,
            education,
            profession,
            mobile,
            medical,
            pastHistory,
            gynocoligical,
            reason:medReasons,
            doctor:"0",
            isVisited:'false',
        });

        const patient = await Patient.findOne({'patientData.registrationP':patientData.registrationP});
        if(patient){
            res.status(201).json(patient);
        }
    }
})
const medicinalConsultant=asyncHandler(async (req,res) =>{
    // var {from,to}=req.body;
    // if(!from || !to){
    //     from = new Date(1111,12,12);
    //     to = new Date(4000,12,12);
    // }
    // const patients = await Consult.find({
    //     Consultation_Date:{$gte:from},
    // }).find({
    //     Consultation_Date:{$lte:to},
    // }).find({
    //     isVisited:'false'
    // })
    const patients=Consult.find()
    console.log(patients)
    res.send(patients)
    // if(patients){
    //     res.status(201).json(patients);
    // }
    // else{
    //     res.statu=s(400)
    //     throw new Error ("Error")
    // }
}
)
const appointedPatients = asyncHandler(async (req,res)=>{
    var  {from,to,doc_name} = req.body;
    if(!from || !to ){
        from = new Date(2020,12,12);
        to = new Date(4000,12,12);
    }
    if (!doc_name || doc_name=='') {
        doc_name = /.*/;
      }
    console.log(from,to);
    const patients = await Patient.find({
        nextAppointedDate:{$gte:from},
    }).find({
        nextAppointedDate:{$lte:to},
    }).find({
       doctor:{$regex:doc_name}
    }).find({
        isVisited:"false"
    })
    // const patients=await Patient.find();
    res.send(patients)
    if(patients){
        res.status(201).json(patients);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
    
})

const setAppointedDate = asyncHandler(async (req,res)=>{
    const {date,id,doctor} = req.body;
    // const [day,month,year] = date.split('/');
    // const appointedDate = new Date(year,month - 1,day);
    console.log(doctor);
    const patient = await Patient.updateOne({'patientData.ticketId':id},{nextAppointedDate:date,doctor:doctor})
    if(patient){
        const updated = await Patient.findOne({'patientData.ticketId':id})
        console.log(updated);
        res.status(201).json(updated);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
})

const changeVisited = asyncHandler (async (req,res)=>{
    const {id} = req.body; 
    const patient = await Patient.findOneAndUpdate({'patientData.registrationP':id},{isVisited:true})
    if(patient){
        res.status(201).json(patient)
    }
})

const fetchAll = asyncHandler(async (req,res)=>{
    const patients = await Patient.find({doctor:"0"})
    if(patients){
        res.status(201).json(patients)
    }
})

const searchPatient= asyncHandler( async (req,res) => {
    const {regNo}=req.body
    console.log(regNo)
    const patient=await Patient.findOne({'patientData.registrationNumber':regNo})
    if(patient){
        res.send(patient)
    }else{
        res.status(400)
        throw new Error("Patient doesnt exist with the given registration Number")
    }
})


const editPat=asyncHandler(async(req,res) => {
    const {infoData}=req.body
    const Pat= await Patient.findOne({'patientData.registrationNumber':infoData.patientData.registrationNumber})
    if(Pat){
        Object.assign(Pat,infoData);
        await Pat.save()
    }else{
        res.send(400).send("HealthWorker with given Registration Id doesnt exist")
        throw new Error("HealthWorker with given Registration Id doesnt exist")
    }
})
const trueFetch = asyncHandler(async (req,res)=>{
    const {id} = req.body;
    console.log(id);
    const patient = await Patient.findOne({'patientData.registrationP':id})
    if(patient){
        res.json(patient)
    }
    else{
        res.send('not found')
    }
})
const ticketFetch = asyncHandler(async (req,res)=>{
    const {id} = req.body;
    console.log(id);
    const patient = await Patient.findOne({'patientData.ticketId':id})
    if(patient){
        res.json(patient)
    }
    else{
        res.send('not found')
    }
})

module.exports = {fetchPatient,addPatient,appointedPatients,setAppointedDate,fetchAll,changeVisited,trueFetch,medicinalConsultant,searchPatient,editPat,ticketFetch};
