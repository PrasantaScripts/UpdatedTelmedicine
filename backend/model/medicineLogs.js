const mongoose = require('mongoose');

const medicineLogSchema = mongoose.Schema({
    name:{
        type:String,
    },
    add:{
        type:String,
    },
    changer:{
        type:String,
    },
},{
    timestamp:true,
});

const MedicineLogs = mongoose.model('medicineLog',medicineLogSchema);

module.exports = MedicineLogs;