const Event = require("../models/event");

exports.getEvents = async (req,res) =>{
    Event.find().then((events)=>{
        res.status(200).json({
            events,
        })
    })
}

exports.createEvent = async (req,res) =>{
    try{
        const{
            title,
            type,
            description,
        } = req.body;

        const event = new Event({
            title,
            type,
            description,
        });

        const savedEvent = await event.save();
        res.json(savedEvent);

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
};

exports.deleteEvent = async(req,res) => {
    try {
        let event = Event.findById(req.params.id);
        if(!event){
            res.send("No event found");
        }
        else{
            event = await Event.findByIdAndDelete(req.params.id);
            res.status(200).json({
                "message":"Data deleted successfully",
                success:true
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server error")
        
    }
}

exports.updateEvent = async (req,res) =>{
    const {title, type, description } = req.body
    try {
        const newEvent = {};
        if(title){newEvent.title = title};
        if(type){newEvent.type = type};
        if(description){newEvent.description = description};

        let event = Event.findById(req.params.id);
        if(!event){
            res.status(404).send("Data to be updated not found");
        }
        else{
            event = await Event.findByIdAndUpdate(req.params.id, {$set:newEvent},{new:true});
            res.status(200).json({
                "message":"Update Successfull",
                event
            })
        }
    } catch (error) {
        res.status(500).send("internal server error");   
    }
}
