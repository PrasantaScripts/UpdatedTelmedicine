const asyncHandler = require('express-async-handler');
const Admin = require('../model/adminSchema');
const generateToken = require('../config/tokenGen');
const Log = require('../model/logSchema');

const authAdmin = asyncHandler(async (req,res)=>{
    const {registrationID,password} = req.body
    
    const admin = await Admin.findOne({registrationID: registrationID});
  
    // console.log(registrationID);
    // console.log(admin.registrationID);

    if(admin && (admin.password===password)){
        const logReport =await Log.create({
            user:'Admin',
            registrationId:registrationID,
            name:'Admin',
            login: new Date()
        })
        if(logReport){
            res.status(201).json({
                _id: admin._id,
                registrationID: admin.registrationID,
                password: admin.password,
                token: generateToken(admin._id),
                logId:logReport._id,
            })
        }
        else{
            throw new Error ('error')
        }

    }
    else{
        res.status(400)
        throw new Error ("invalid email or password")
    }
})

module.exports = {authAdmin};
