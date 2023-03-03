const express = require('express');
const router = express.Router();
const patientcontroller = require("../controllers/patientcontroller")
const multer = require("../middleware/upload-docs")
const checkAuth = require("../middleware/check-auth")
const { updatePatientValidation } = require("../validations/patientvalidaton")
const { validate } = require("../validations/validate")
const fileupload = multer.upload.single("profilePicture")

router.get("/patient", checkAuth.getLogedInPatient, patientcontroller.findOne)

router.patch("/patient", checkAuth.getLogedInPatient, multer.upload.single("profilePicture"), updatePatientValidation(), validate, patientcontroller.update)

router.delete("/patient", checkAuth.getLogedInPatient, patientcontroller.delete)

module.exports = router
