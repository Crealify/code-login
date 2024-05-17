const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    type:{
        type: String,
    },
    description:{
        type:String,
    },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

