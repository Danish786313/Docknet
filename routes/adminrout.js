const express = require('express');
const router = express.Router();
const admincontroller = require("../controllers/admincontroller")

const {} = 
router.post("/loginAdmin", admincontroller.adminLogin);

router.get("/adminDashboard", admincontroller.analytics);

router.get("/docters", admincontroller.getAlldocters)

router.get("/patients", admincontroller.getAllpatients)

module.exports = router
