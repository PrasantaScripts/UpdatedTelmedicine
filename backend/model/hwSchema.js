const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hwSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userID:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    blocked:{
        type: Boolean,
        required:true
    }
},{
    timestamp:true,
    collection:'HealthWorker'
});

hwSchema.methods.matchPassword = async function (pass){
    return await bcrypt.compare(pass,this.password)
}

hwSchema.pre('save', async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const hw = mongoose.model('Hw',hwSchema);

module.exports = hw;
