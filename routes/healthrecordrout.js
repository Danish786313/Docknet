const express = require("express");
const router = express.Router()
const healthrecordcontroller = require("../controllers/healthrecordcontroller")
const { createHealthRecordValidation, updateHealthRecordValidation } = require("../validations/healthrecordValidation")
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")


router.param("healthRecordId", healthrecordcontroller.findHealthRecord)

router.post("/healthrecord", createHealthRecordValidation(), validate, checkAuth.getLogedInPatient, healthrecordcontroller.createHealthrecord)

router.get("/healthrecord", checkAuth.getLogedInPatient, healthrecordcontroller.getHealthRecordAll)

router.get("/healthrecord/:patientId", healthrecordcontroller.getHealthRecord)

router.patch("/healthrecord/:healthRecordId", updateHealthRecordValidation(), validate, checkAuth.getLogedInPatient, healthrecordcontroller.updateHealthrecord)

router.delete("/healthrecord/:healthRecordId", checkAuth.getLogedInPatient, healthrecordcontroller.deleteHealthRecord)

module.exports = router