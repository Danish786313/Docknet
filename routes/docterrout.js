const express = require('express');
const router = express.Router();
const doctercontroller = require("../controllers/doctercontroller")
const multer = require("../middleware/upload-docs")
const { docterUpdateValidation } = require("../validations/doctervalidation");
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")
const registerFilesUpload = multer.upload.fields(
    [
        {name: "logo", maxCount: 1},
        {name: "profilePicture", maxCount:1}, 
        {name: "licenseFront", maxCount:1},
        {name: "identityCardFront", maxCount:1},
        {name: "identityCardBack", maxCount:1},
        {name: "clinicLicenseFront", maxCount:1},
        {name: "introVideo", maxCount:1}
    ])

router.patch('/docter', checkAuth.getLogedInUser, registerFilesUpload, docterUpdateValidation(), validate, doctercontroller.docterUpdate);

router.get("/docter",  checkAuth.getLogedInUser, doctercontroller.findById)

router.delete("/docter", checkAuth.getLogedInUser, doctercontroller.deleteDocter)

router.get("/SearchPatient", doctercontroller.searchPatient)

module.exports = router