const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const availabilityController = require("../controllers/availabilitycontroller")

router.post("/availability", /* checkOuth.getLogedInUser, */ availabilityController.CreateAvailability)

router.get("/availability/:id", availabilityController.getAvailability)

module.exports = router