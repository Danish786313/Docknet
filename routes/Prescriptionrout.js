const { prescription } = require("../models")
const express = require("express")
const router = express.Router()
const prescriptioncontroller = require("../controllers/prescriptioncontroller")
const checkAuth = require("../middleware/check-auth")
const createPrescription = require("../controllers/pdfmaker")
const multer = require("../middleware/upload-docs")
fs = require("fs")

router.param("prescriptionSettingId", prescriptioncontroller.getSetting)

router.post('/prescriptionSetting', checkAuth.getLogedInUser, prescriptioncontroller.prescriptionSetting)

router.get("/prescriptionSetting", checkAuth.getLogedInUser, prescriptioncontroller.getPrescriptionSetting)

router.patch("/prescriptionSetting", checkAuth.getLogedInUser, prescriptioncontroller.updatePrescriptionSetting)

router.get('/invoice', checkAuth.getLogedInUser, multer.upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "qrCode", maxCount: 1 },
  { name: "signature", maxCount: 1 }
]), (req, res, next) => {

  const fileName = new Date().getTime() + "_invoice" + ".pdf"
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=${fileName}`,
  })
  
  createPrescription.buildPDF2(req, res,
    (chunk) => stream.write(chunk),
    () => stream.end()
  ).then(async () => {
    await prescription.create({docter_id: req.profile.id, patient_id: req.body.patient_id, prescription_file: fileName})
  }).catch((err) => {
    console.log(err);
  });
});

router.delete("/prescriptionSetting/:prescriptionSettingId", checkAuth.getLogedInUser, prescriptioncontroller.deletePrescriptionSetting)

module.exports = router