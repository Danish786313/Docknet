const express = require('express')
const router = express.Router()
const regioncontroller = require("../controllers/regioncontrolller")

router.get("/region",  regioncontroller.getregion)

router.get("/state", regioncontroller.getstate)

router.get("/city/:stateId", regioncontroller.getcity)

module.exports = router