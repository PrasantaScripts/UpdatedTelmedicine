const mongoose = require('mongoose');

const AvailabilitySchema=mongoose.Schema({
    day:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    }

})
const doctorSchema = mongoose.Schema({
    doc_name:{
        type: String,
        required: true,
    },
    SSF_ID:{
        type: String,
        required: true,
    },
    Doctors_Registration_No:{
        type: String,
        required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    Mobile:{
        type:String,
        required: true,
    },
    Gender:{
        type:String,
        required:true,
    },
    Speciality:{
        type:String,
        required:true,       
    },
    Availability:[AvailabilitySchema],
    blocked:{
        type:Boolean,
        required:true,
    }
},{timestamp:'true',collection:'Doctor'});


const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;
