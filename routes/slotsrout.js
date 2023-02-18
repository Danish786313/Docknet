const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const slotController = require("../controllers/slotsController")

router.param("slotId", slotController.getSlots)

router.post("/slots", checkOuth.getLogedInUser, slotController.createslots)

router.get("/slots",  checkOuth.getLogedInUser, slotController.findOne)

// // router.patch("/slots", checkOuth.getLogedInUser, slotController.updateSlots)

router.delete("/slots/:slotId", checkOuth.getLogedInUser, slotController.deleteSlots)

module.exports = router