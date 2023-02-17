const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const availabilityController = require("../controllers/availabilitycontroller")

// router.params()

router.post("/availability", checkOuth.getLogedInUser, availabilityController.CreateAvailability)

router.get("/availability",  checkOuth.getLogedInUser, availabilityController.getAvailability)

router.patch("/availability",  checkOuth.getLogedInUser, availabilityController.updateAvailability)

router.post("/slots/:id", checkOuth.getLogedInUser, availabilityController.createslots)

router.patch("/slots/:id", checkOuth.getLogedInUser, availabilityController.updateAvailability)

module.exports = router