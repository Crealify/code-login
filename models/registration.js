const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        default: "Education",
    },
    description:{
        type:String,
    },

    date:{
        type : date,
        default: Date.now()
    },
});

const Registration = mongoose.model("Registration", RegistrationSchema);
module.exports = Registration;

