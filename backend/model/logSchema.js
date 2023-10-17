const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    user:{
        type:String,
    },
    registrationId:{
        type:String,
    },
    name:{
        type:String,
    },
    login:{
        type:Date,
    },
    logout:{
        type:String,
        default:'Online Now'
    },
},{
    timestamp:true,
    collection:'Log'
});

const Log = mongoose.model('Log',logSchema);

module.exports = Log;
