const express = require("express")
const router = express.Router()
const apointmentController = require("../controllers/apointmentcontroller")
const checkOuth = require("../middleware/check-auth")
const { apointCreate }  = require("../validations/apointmentvalidation")
const { validate } = require("../validations/validate")



// ========================  Docter  =================== //
// add validation here
router.get("/myApointment", checkOuth.getLogedInUser, apointmentController.myApointments)

router.patch("/AcceptApointment/:id", checkOuth.getLogedInUser, apointmentController.acceptApointments)

router.patch("/apointmentApprove/:id", apointmentController.approveApointment)

router.patch("/apointmentReshedule/:id", apointmentController.resheduleApointment)


// add validation here

router.post("/apointment", apointCreate(), validate, checkOuth.getLogedInPatient, apointmentController.createApointment)

router.get("/apointment", checkOuth.getLogedInUser, apointmentController.apointments)

router.patch("/apointment/:id", checkOuth.getLogedInUser, apointmentController.cancelApointment)




module.exports = router