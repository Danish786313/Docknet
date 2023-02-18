const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const availabilityController = require("../controllers/availabilitycontroller")

router.post("/availability", checkOuth.getLogedInUser, availabilityController.CreateAvailability)

router.get("/availability",  checkOuth.getLogedInUser, availabilityController.getAvailability)

router.patch("/availability",  checkOuth.getLogedInUser, availabilityController.updateAvailability)

router.delete("/availability", checkOuth.getLogedInUser, availabilityController.deleteAvailability)

module.exports = router