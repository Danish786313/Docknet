const express = require('express');
const router = express.Router();
const admincontroller = require("../controllers/admincontroller")

router.post("/loginAdmin", admincontroller.adminLogin);


module.exports = router
