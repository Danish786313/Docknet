const express = require('express');
const router = express.Router();
const patientcontroller = require("../controllers/patientcontroller")
const multer = require("../middleware/upload-docs")

router.param("patientId", patientcontroller.getpatient)

router.get("/patient", patientcontroller.findAll)

router.get("/patient/:patientId", patientcontroller.findOne)

router.patch("/patient/:patientId", multer.upload.single("banner_image"), patientcontroller.update)

router.delete("/patient/:patientId", patientcontroller.delete)

/* Duplicate Profile */

router.post("/duplicate",  multer.upload.single("photo"), patientcontroller.duplicate)

router.get("/duplicate/:patientId", patientcontroller.getDuplicateProfile)


module.exports = router
