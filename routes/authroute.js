const express = require('express');
const router = express.Router();
const authcontroller = require("../controllers/authcontroller")
const multer = require("../middleware/upload-docs")


router.post("/register", multer.upload.fields([ {name: "profilePicture", maxCount:1 },  {name: "licenseFront", maxCount:1}, {name: "licenseBack", maxCount:1}, {name: "identityCardFront", maxCount:1}, {name: "identityCardBack", maxCount:1}, {name: "clinicLicenseFront", maxCount:1}, {name: "clinicLicenseBack", maxCount:1}]), authcontroller.docterregister);

router.get("/approve", authcontroller.aproveDocter);

router.post('/docter/login', authcontroller.docterLogin);

router.post("/register/patient", multer.upload.single("profilePicture"), authcontroller.signupPatient);

router.post("/patient/login", authcontroller.patientLogin);

router.patch('/verifyOtp', authcontroller.verifyOtp);

router.post("/forgotPassword", authcontroller.changePassword)

router.post('/newpassword', authcontroller.newPassword);

router.get('/signOut', authcontroller.signout);

module.exports = router
