const express = require('express');
const router = express.Router();
const authcontroller = require("../controllers/authcontroller")
const multer = require("../middleware/upload-docs")
const { docterRegisterValidation, docterloginValidation, ForgotPasswordValidation, newPasswordValidation, patientRegisterValidation, patientLoginValidation, verifyOtpValidation } = require("../validations/authvalidation");
const { profileApproveValidation } = require("../validations/approveprofile")
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")
const Fileupload = multer.upload.fields([ 
        {name: "logo", maxCount:1},
        {name: "profilePicture", maxCount:1 }, 
        {name: "licenseFront", maxCount:1},   
        {name: "identityCardFront", maxCount:1},
        {name: "identityCardBack", maxCount:1},
        {name: "clinicLicenseFront", maxCount:1}, 
    ])

router.post("/register", Fileupload, docterRegisterValidation(), validate, authcontroller.docterregister);

router.get("/approve", profileApproveValidation(), validate, checkAuth.isadmin, authcontroller.aproveDocter);

router.post('/docter/login', docterloginValidation(), validate, authcontroller.docterLogin);

router.post("/register/patient", multer.upload.single("profilePicture"), patientRegisterValidation(), validate, authcontroller.signupPatient);

router.post("/patient/login", patientLoginValidation(), validate, authcontroller.patientLogin);

router.patch('/verifyOtp', verifyOtpValidation(), validate, authcontroller.verifyOtp);

router.post("/forgotPasswordDocter", ForgotPasswordValidation(), validate, authcontroller.changePasswordDocter)

router.post('/newpasswordDocter', newPasswordValidation(), validate, authcontroller.newPasswordDocter);

router.post("/forgotPasswordPatinet", ForgotPasswordValidation(), validate, authcontroller.changePasswordPatient)

router.post('/newpasswordPatient', newPasswordValidation(), validate, authcontroller.newPasswordPatient);

router.get('/signOut', authcontroller.signout);

module.exports = router
