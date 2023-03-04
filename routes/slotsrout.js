const express = require("express")
const router = express.Router()
const checkOuth = require("../middleware/check-auth") 
const slotController = require("../controllers/slotsController")
const { CreateSlotValidation, checkTimeValidation } = require("../validations/slotsValidation");
const { validate } = require("../validations/validate")

router.param("slotId", slotController.getSlots)

router.post("/slots", checkOuth.getLogedInUser, CreateSlotValidation(), validate, slotController.createslots)

router.post("/addtime/:slotId", checkTimeValidation(), slotController.addTime)

router.delete("/removeTime/:slotId", slotController.removeTime)

router.get("/slots",  checkOuth.getLogedInUser, slotController.findAll)

router.patch("/slots/:slotId", checkOuth.getLogedInUser, slotController.updateSlots)

router.delete("/slots/:slotId", checkOuth.getLogedInUser, slotController.deleteSlots)

module.exports = router