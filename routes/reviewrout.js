const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")
const reviewcontroller = require("../controllers/reviewcontroller")

router.param("reviewId", reviewcontroller.getReview)

router.post("/review", checkAuth.getLogedInPatient, reviewcontroller.createReview)

router.get("/review/:docterId", reviewcontroller.getReviewStars)

router.patch("/review/:reviewId", checkAuth.getLogedInPatient, reviewcontroller.updateReview)

router.delete("/review/:reviewId", checkAuth.getLogedInPatient, reviewcontroller.deleteReview)

module.exports = router