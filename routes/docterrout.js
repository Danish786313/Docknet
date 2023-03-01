const express = require('express');
const router = express.Router();
const doctercontroller = require("../controllers/doctercontroller")
const multer = require("../middleware/upload-docs")
const { updateProfile } = require("../validations/authvalidation");
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")

router.param("docterId", doctercontroller.getdocter);

router.patch('/docter', checkAuth.getLogedInUser, multer.upload.fields(
    [
        {name: "logo", maxCount: 1},
        {name: "profilePicture", maxCount:1}, 
        {name: "licenseFront", maxCount:1},
        /* {name: "licenseBack", maxCount:1} */,
        {name: "identityCardFront", maxCount:1},
        {name: "identityCardBack", maxCount:1},
        {name: "clinicLicenseFront", maxCount:1},
        /* {name: "clinicLicenseBack", maxCount:1} */,
        {name: "introVideo", maxCount:1}
    ]), updateProfile(), validate, doctercontroller.docterUpdate);


router.get("/docter",  checkAuth.getLogedInUser, doctercontroller.findById)

router.delete("/docter", checkAuth.getLogedInUser, doctercontroller.deleteDocter)

router.get("/SearchPatient", doctercontroller.searchPatient)

module.exports = router