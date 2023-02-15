const express = require('express')
const router = express.Router()
const regioncontroller = require("../controllers/regioncontrolller")

router.get("/region",  regioncontroller.getregion)

module.exports = router