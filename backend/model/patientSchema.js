const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    patientData:{
        name:{
            type: String,
            required: true,
        },
        relationship:{
            type:String,
            required: true,
        },
        registrationP:{
            type: String,
            required: true,
        },
        registrationNumber:{
            type: String,
            required: true,
        },
        ticketId:{
            type:String,
            required:true,
        },
    },
    marital:{
        type: String,
    },
    gender:{
        type: String,
    },
    DOB:{
        type: String,
    },
    education:{
        type: String,
    },
    profession:{
        type: String,
    },
    mobile:{
        type: String,
    },
    medical:{
        height:{
            type:String,
            required:true,
        },
        weight:{
            type:String,
            required:true,
        },
        temperature:{
            type:String,
            required:true,
        },
        pulse:{
            type:String,
            required:true,
        },
        sbp:{
            type:String,
            // required:true,
        },
        dbp:{
            type:String,
            // required:true,
        },
        alcohol:{
            type:String,
            // required:true,
        },
        asthama:{
            type:String,
            // required:true,
        },
        diabetes:{
            type:String,
            // required:true,
        },
        familyIll:{
            type:String,
            // required:true,
        },
        smoking:{
            type:String,
            // required:true,
        },
        spo2:{
            type:String,
            // required:true,
        },
        others:{
            type:String,
        },
    },
    pastHistory :{
        admitted:{
            type:String,
            // required:true,
        },
        currentMed:{
            type:String,
            // required:true,
        },
        healthCondition:{
            type:String,
            // required:true,
        },
        injuries:{
            type:String,
            // required:true,
        },
        otherHistory:{
            type:String,
        },
        pastDiseases:{
            type:String,
        },
    },
    gynocoligical:{
        abortion:{
            type:String,
        },
        numberOfChild:{
            type:String,
        },
        otherComplications:{
            type:String,
        },
        totalPregnancies:{
            type:String,
        },
    },
    appointedTime:{
        type:Date,
    },
    doctor:{
        type:String,
        default:"0",
    },
    isVisited:{
        type:String,
        default:'false',
    },
    nextAppointedDate:{
        type:Date,
        default:''
    },
    reason:[{
        type:String,
    }],
},{
    timestamp:true,
    collection:'PatientRegistration'
});

patientSchema.statics.findByDate = function (from,to){
    return this.find({
        $gte: from,
        $lte: to,
    })
}

const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;
