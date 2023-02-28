const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const availabilityController = require("../controllers/availabilitycontroller")
const { availabity, updateAvailability } = require("../validations/Availabilityvalidation")
const { validate } = require("../validations/validate") 

router.post("/availability", checkOuth.getLogedInUser, availabity(), validate, availabilityController.CreateAvailability)

router.get("/availability",  checkOuth.getLogedInUser, availabilityController.getAvailability)

router.patch("/availability", checkOuth.getLogedInUser, updateAvailability(), validate, availabilityController.updateAvailability)

router.delete("/availability", checkOuth.getLogedInUser, availabilityController.deleteAvailability)

module.exports = router