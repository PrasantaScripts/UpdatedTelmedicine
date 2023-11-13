const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    registrationID:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamp:true,
    collection:'Admin'
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;
