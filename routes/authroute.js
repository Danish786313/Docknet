const express = require('express');
const router = express.Router();
const authcontroller = require("../controllers/authcontroller")
const multer = require("../middleware/upload-docs")
const { docterRegisterValidation, docterlogin, ForgotPassword, newPassword, patientRegister, patientLogin } = require("../validations/authvalidation");
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")
const parser = require("../helper/helper")


router.post("/register", parser.json, multer.upload.fields([ {name: "logo", maxCount:1}, {name: "profilePicture", maxCount:1 },  {name: "licenseFront", maxCount:1}, {name: "licenseBack", maxCount:1}, {name: "identityCardFront", maxCount:1}, {name: "identityCardBack", maxCount:1}, {name: "clinicLicenseFront", maxCount:1}, {name: "clinicLicenseBack", maxCount:1}]), docterRegisterValidation(), validate, parser.json, authcontroller.docterregister);

router.get("/approve", authcontroller.aproveDocter);

router.post('/docter/login', docterlogin(), validate, authcontroller.docterLogin);

router.post("/register/patient", multer.upload.single("profilePicture"), patientRegister(), validate, authcontroller.signupPatient);

router.post("/patient/login", patientLogin(), validate, authcontroller.patientLogin);

router.patch('/verifyOtp', authcontroller.verifyOtp);

router.post("/forgotPasswordDocter", ForgotPassword(), validate,  checkAuth.getLogedInUser, authcontroller.changePasswordDocter)

router.post('/newpasswordDocter', newPassword(), validate, checkAuth.getLogedInUser, authcontroller.newPasswordDocter);

router.post("/forgotPasswordPatinet", ForgotPassword(), validate, checkAuth.getLogedInPatient, authcontroller.changePasswordPatient)

router.post('/newpasswordPatient', newPassword(), validate, checkAuth.getLogedInPatient,  authcontroller.newPasswordPatient);

router.get('/signOut', authcontroller.signout);

module.exports = router
