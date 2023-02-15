const express = require('express')
const router = express.Router()
const specialitycontroller = require("../controllers/specialitycontroller")

router.param("specialityId", specialitycontroller.getspeciality)

router.post("/speciality",  specialitycontroller.create)

router.get("/speciality", specialitycontroller.findAll)

router.get("/speciality/:specialityId", specialitycontroller.findOne)

router.put("/speciality/:specialityId", specialitycontroller.update)

router.delete("/speciality/:specialityId", specialitycontroller.delete)

module.exports = router


