const { body, param, check } = require('express-validator');
const { docter } = require("../models");

exports.docterUpdateValidation = (req, res) => {
  return [
    body('fullName', 'Name is Required').notEmpty().trim().optional(),
    body('gender', 'Gender should be Male female or other').notEmpty().isIn(["Male", "Female", "Other"]).trim().optional(),
    body('email','Email is Required').notEmpty().isEmail().trim().optional(),
    body('phone','Phone number is Required').notEmpty().isLength({ min: 10, max: 10 }).trim().optional(),
    // body('password', 'Strong password required').notEmpty().trim().isStrongPassword(),
    body('degree','Degree is Required').notEmpty().trim().optional(),
    body('isPharmacist','Please answer the question are you Pharmacist ?').notEmpty().isBoolean().trim().optional(),
    body('phone').custom(async (value, {req}) => {
        return await docter.findOne({ where: { phone: value }, raw: true }).then(docter => {
          if (docter) {
            return Promise.reject('This number Already exists. Please choose another')
          }
        })
    }).optional(),
    body('email').custom(async (value, {req}) => {
        return await docter.findOne({ where: { email: value }, raw: true }).then(docter => {
          if (docter) {
            return Promise.reject('This email Already exists. Please choose another')
          }
        })
    }).optional(),
    body("Docter").custom(async (value, {req}) => {
        if (req.body.isPharmacist == "false") {
            if (!req.body.clinicName) {
                return Promise.reject("Clinic name is required")
            }
            if (!req.body.clinicAddress) {
                return Promise.reject("Clinic Address is required")
            }
            if (!req.body.experience) {
                return Promise.reject("Please tell us your experience")
            }
            if (!req.body.achivement) {
                return Promise.reject("Please tell us your achivement")
            }
            if (!req.body.speciality) {
                return Promise.reject("Please tell us your speciality")
            }
            if (!req.body.state) {
                return Promise.reject("State is required")
            }
            if (!req.body.city) {
                return Promise.reject("City is required")
            }
            if (!req.body.consultCharge) {
                return Promise.reject("Consult charge is required")
            }
            if (!Object.keys(req.files).length) {
                return Promise.reject("Documents are required")
            }
            if (!req.files.logo) {
                return Promise.reject("Logo is required")
            }
            if (!req.files.profilePicture) {
                return Promise.reject("profilePicture is required")
            }
            if (!req.files.licenseFront) {
                return Promise.reject("Licence Front is required")
            }
            if (!req.files.identityCardFront) {
                return Promise.reject("Identity card Front is required")
            }
            if (!req.files.identityCardBack) {
                return Promise.reject("Identity card Back is required")
            }
            if (!req.files.clinicLicenseFront) {
                return Promise.reject("Clinic licence Front is required")
            } 
        }
    }),
    body("Docter").custom(async (value, {req}) => {
        if (!req.files.introVideo) {
            return Promise.reject("intro Video is required.")
        }
    }).isObject().optional()
  ]
}