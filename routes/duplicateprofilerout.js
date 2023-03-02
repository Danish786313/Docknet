const express = require("express");
const router = express.Router()
const duplicateprofilecont = require("../controllers/duplicateprofile")
const multer = require("../middleware/upload-docs")
const { createDuplicate } = require("../validations/duplicateprofile")
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")

router.post("/duplicate", checkAuth.getLogedInPatient, multer.upload.single("profilePicture"), createDuplicate(), validate, duplicateprofilecont.duplicateProfile)

router.get("/duplicate",checkAuth.getLogedInPatient, duplicateprofilecont.getDuplicateProfile)

module.exports = router