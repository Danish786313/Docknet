const express = require('express')
const router = express.Router()
const bankdetaicontroller = require("../controllers/bankdetailscontroller")
const checkAuth = require("../middleware/check-auth")

router.post("/bank", checkAuth.getLogedInUser, bankdetaicontroller.create)

router.get("/bank", checkAuth.getLogedInUser, bankdetaicontroller.findOne)

router.patch("/bank", checkAuth.getLogedInUser, bankdetaicontroller.update)

router.delete("/bank", checkAuth.getLogedInUser, bankdetaicontroller.delete)

module.exports = router