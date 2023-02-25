const express = require('express')
const router = express.Router()
const bankdetaicontroller = require("../controllers/bankdetailscontroller")
const { bankDetails } = require("../validations/bankdetails")
const { validate } = require("../validations/validate")
const checkAuth = require("../middleware/check-auth")

router.param("bankId", bankdetaicontroller.getbankdetails)

router.post("/bank", checkAuth.getLogedInUser, bankDetails(), validate, bankdetaicontroller.create)

router.get("/bank", checkAuth.getLogedInUser, bankdetaicontroller.findOne)

router.patch("/bank/:bankId", checkAuth.getLogedInUser, bankdetaicontroller.update)

router.delete("/bank/:bankId", checkAuth.getLogedInUser, bankdetaicontroller.delete)

module.exports = router