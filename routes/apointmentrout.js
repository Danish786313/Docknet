const express = require("express")
const router = express.Router()
const apointmentController = require("../controllers/apointmentcontroller")
const checkOuth = require("../middleware/check-auth")
const { apointCreate }  = require("../validations/apointmentvalidation")
const { validate } = require("../validations/validate")

router.post("/apointment", /* apointCreate(), validate, */ checkOuth.getLogedInPatient, apointmentController.createApointment)

router.get("/apointment", checkOuth.getLogedInUser, apointmentController.apointments)

router.patch("/apointment/:id", checkOuth.getLogedInUser, apointmentController.cancelApointment)


// ========================  Docter  =================== //
router.get("/myApointment", checkOuth.getLogedInUser, apointmentController.myApointments)

router.patch("/apointmentApprove/:id", apointmentController.approveApointment)

router.patch("/apointmentReshedule/:id", apointmentController.resheduleApointment)





module.exports = router