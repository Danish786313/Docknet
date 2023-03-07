const express = require("express")
const router = express.Router()
const apointmentController = require("../controllers/apointmentcontroller")
const checkOuth = require("../middleware/check-auth")
const { apointCreateValidation, getApointmentValidation, UpdateApointmentValidation }  = require("../validations/apointmentvalidation")
const { validate } = require("../validations/validate")


// ========================  Docter  =================== //
// add validation here

router.get("/myApointment", getApointmentValidation(), validate, checkOuth.getLogedInUser, apointmentController.myApointments)

router.patch("/myApointment", UpdateApointmentValidation(), validate, checkOuth.getLogedInUser, apointmentController.UpdatemyApointments)

// ========================  Patient  =================== //
// add validation here

router.post("/apointment", apointCreateValidation(), validate, checkOuth.getLogedInPatient, apointmentController.createApointment)

router.get("/apointment", checkOuth.getLogedInPatient, apointmentController.apointments)

module.exports = router

/*

Request,
Reshedule
Upcoming [paid, unpaid]
Cancelled

 */