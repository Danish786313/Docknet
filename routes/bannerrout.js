const express = require('express')
const router = express.Router()
const bannercontroller = require("../controllers/bannercontroller")
const multer = require("../middleware/upload-docs")

router.param("bannerId", bannercontroller.getbanner)

router.post("/banner",  multer.upload.single("banner_image"), bannercontroller.create)

router.get("/banner", bannercontroller.findAll)

router.get("/banner/:bannerId", bannercontroller.findOne)

router.patch("/banner/:bannerId", multer.upload.single("banner_image"), bannercontroller.update)

router.delete("/banner/:bannerId", bannercontroller.delete)

module.exports = router

