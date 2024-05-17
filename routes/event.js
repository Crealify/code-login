const express = require("express");
const { getEvents, createEvent, deleteEvent,updateEvent } = require("../controller/event");

const router = express.Router();

router.get("/event",getEvents);
router.post("/event/new", createEvent);
router.delete("/event/delete/:id", deleteEvent);
router.put("/event/update/:id", updateEvent);

module.exports = router;
