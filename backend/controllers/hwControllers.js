const asyncHandler = require('express-async-handler');
const Hw = require('../model/hwSchema');
const generateToken = require('../config/tokenGen');
const Log = require('../model/logSchema');

const registerHw = asyncHandler(async (req,res)=>{
    const { name, userID, password } = req.body;
    if (!name || !userID || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    
    const isExist = await Hw.findOne({userID});

    if(isExist){
        res.status(400)
        throw new Error ("Hw already exist")
    }
    
    const hw = await Hw.create({
        name,
        userID,
        password,
        blocked:false,
    });
    
    if(hw){
        const login = new Date()
        const logReport = await Log.create({
            user:"Health Worker",
            registrationId:hw.userID,
            name:hw.name,
            login: login,
        })
        if(logReport){
            res.status(201).json({
                _id: hw._id,
                name: hw.name,
                userID: hw.userID,
                password: hw.password,
                logId: logReport._id,
            })
        }
        else{
            res.status(400)
            throw new Error ("Error")
        }

    }
    else{
        res.status(400)
        throw new Error ("failed to create a hw")
    }

})

const findHw = asyncHandler(async (req,res) => {
    console.log(req.body)
    const {userID} = req.body
   
    const hw=await Hw.findOne({userID})

    if(hw){
        res.send(hw)
    }else{
        res.status(400)
        throw new Error ("HealthWorker doesnt exist with given ID")
    }
})


const authHw = asyncHandler(async (req,res)=>{
    const {userID,password} = req.body
    
    const hw = await Hw.findOne({userID});
    

    if(hw && hw.matchPassword(password) && hw.blocked===false){
        
        const login = new Date()
        const logReport = await Log.create({
            user:"Health Worker",
            registrationId:hw.userID,
            name:hw.name,
            login: login,
        })
        if(logReport){
            res.status(201).json({
                _id: hw._id,
                userID: hw.userID,
                password: hw.password,
                token: generateToken(hw._id),
                logId: logReport._id
            })
        }
        else{
            res.status(400)
            throw new Error ("Error")
        }
    }
    else{
        
       
        if(hw.blocked){
            res.status(400).json({
                message: "Contact Admin you are blocked"
            })
            throw new Error("Contact Healthw");
            
        }else{
        res.status(400)
        throw new Error ("invalid email or password")
        }
    }
})

const blockHw= asyncHandler( async (req,res) => {
    const {userID}=req.body
    let hw= await Hw.findOne({userID});
    if(hw){
        try{
            hw.blocked=(!hw.blocked)
            await hw.save()
            res.status(201)
        }catch(e){
            console.log(e)
        }
    }else{
        res.status(400)
        throw new Eroor ("HealthWorker with this reg ID doesnt exist")
    }
})

const editHw=asyncHandler(async(req,res) => {
    const {infoData}=req.body
    const hw= await Hw.findOne({userID:infoData.userID})
    if(hw){
        
        hw.name=infoData.name
        if(hw.password == ""){}
        else{
            hw.password = infoData.password;    
        }
        await hw.save()
    }else{
        res.send(400)
        throw new Error("HealthWorker with given Registration Id doesnt exist")
    }
})
const fetchTotalHw = asyncHandler(async (req,res)=>{
    const count = await Hw.countDocuments({}); 
    if(count){
        res.status(201).json({
            count:count,
        })
    }
    else{
        res.status(400)
        throw new Error("check your internet"); 
    }
})

module.exports = {registerHw,authHw,fetchTotalHw,findHw,blockHw,editHw};
