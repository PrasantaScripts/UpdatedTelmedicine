const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
    },
    address:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    locationCode:{
        type: String,
        required: true,
    },
    members:[{
        name:{
            type: String,
            required: true,
        },
        relationship:{
            type: String,
            required: true,
        },
        id:{
            type:String,
            required:true,
        }
    }],
    // additionalMembers:[{
    //     name:{
    //         type:String,
    //         required:true,
    //     },
    //     id:{
    //         type:String,
    //         required:true,
    //     },
    //     relationship:{
    //         type:String,
    //         default: 'relative',
    //     },
    // }],
    education:{
        type:String,
        required:true,
    },
    familyIncome:{
        type:String,
        required:true,
    },
    maritalStatus:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    }
},{
    timestamp:true,
    collection:'Family'
});

familySchema.statics.byDate = function(date){
      
}

const Family = mongoose.model('Family',familySchema);

module.exports = Family;
