const { body, param, check } = require('express-validator');
const { docter, patient } = require("../models");

exports.docterRegisterValidation = (req, res) => {
  return [
    body('fullName', 'Name is Required').notEmpty().trim(),
    body('gender', 'Gender should be Male female or other').notEmpty().isIn(["Male", "Female", "Other"]).trim(),
    body('email','Email is Required').notEmpty().isEmail().trim(),
    body('phone','Phone number is Required').notEmpty().isLength({ min: 10, max: 10 }).trim().trim(),
    body('password', 'Strong password required').notEmpty().trim().isStrongPassword(),
    body('degree','Degree is Required').notEmpty().trim(),
    body('isPharmacist','Please answer the question are you Pharmacist ?').notEmpty().trim(),
    body('phone').custom(async (value, {req}) => {
        if (req.method == "POST") {
            return await docter.findOne({ where: { phone: value }, raw: true }).then(docter => {
              if (docter) {
                return Promise.reject('This number Already exists. Please choose another')
              }
            })
        }
    }),
    body('email').custom(async (value, {req}) => {
        if (req.method == "POST") {
            return await docter.findOne({ where: { email: value }, raw: true }).then(docter => {
              if (docter) {
                return Promise.reject('This email Already exists. Please choose another')
              }
            })
        }
    }),
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
            if (!req.body.region) {
                return Promise.reject("Region is required")
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
            // if (!req.files.licenseBack) {
            //     return Promise.reject("Licence Back is required")
            // }
            if (!req.files.identityCardFront) {
                return Promise.reject("Identity card Front is required")
            }
            if (!req.files.identityCardBack) {
                return Promise.reject("Identity card Back is required")
            }
            if (!req.files.clinicLicenseFront) {
                return Promise.reject("Clinic licence Front is required")
            }
            if (req.method === "PATCH") {
                if (!req.files.introVideo) {
                    return Promise.reject("Intro Video is required required")
                }
            }
        }
    }),
  ]
}

exports.docterlogin = (req, res) => {
    return [
        body('email','Email is Required').notEmpty().trim(),
        body('password', 'password is required').notEmpty().trim(),
    ]
}

exports.ForgotPassword = (req, res) => {
    return [
        body('email','Email is Required').notEmpty().trim(),
    ]
}

exports.newPassword = (req, res) => {
    return [
        body('newPassword','New Password is Required It should be strong').notEmpty().isStrongPassword().trim(),
        body('otp','Otp is Required').notEmpty().trim(),
    ]
}

exports.patientRegister = (req, res) => {
    return [
        body('name', 'Name is Required').notEmpty().trim(),
        body('phone', 'Phone should be Male female or other').isLength({ min: 10, max: 10 }).trim(),
        body('DOB','Date of birth is Required').notEmpty().isDate().trim(),
        body('gender','Gender is Required').notEmpty().isIn(["Male", "Female", "Other"]).trim(),
        body('email', 'Email is password required').notEmpty().isEmail().trim(),
        body('password','Password is Required').notEmpty().isStrongPassword().trim(),
        body('phone').custom(async value => {
            return await patient.findOne({ where: { phone: value }, raw: true }).then(patient => {
              if (patient) {
                return Promise.reject('This number Already exists. Please choose another')
              }
            })
        }),
        body('email').custom(async value => {
            return await patient.findOne({ where: { email: value }, raw: true }).then(patient => {
              if (patient) {
                return Promise.reject('This email Already exists. Please choose another')
              }
            })
        }),
        body("Docter").custom(async (value, {req}) => {
            if (!req.file) {
                return Promise.reject('Profile picture is required')
            }
        })
    ]
}

exports.patientLogin = (req, res) => {
    return [
        check('email', 'email is Required').notEmpty().trim(),
        check('password', 'Password id required').notEmpty().trim(),
    ]
}

exports.verifyOtp = (req, res) => {
    return [
        body('Params').custom(async (value, { req }) => {
            if (!req.query.otp) {
                return Promise.reject('Otp is required')
            }
            if (!req.query.email) {
                return Promise.reject('Email is required')
            }
        }),
    ]
}

exports.updateProfile = (req, res) => {
    return [
        body('fullName', 'Name is Required').notEmpty().trim(),
        body('gender', 'Gender should be Male female or other').notEmpty().isIn(["Male", "Female", "Other"]).trim(),
        body('email','Email is Required').notEmpty().isEmail().trim(),
        body('phone','Phone number is Required').notEmpty().isLength({ min: 10, max: 10 }).trim().trim(),
        body('degree','Degree is Required').notEmpty().trim(),
        body('isPharmacist','Please answer the question are you Pharmacist ?').notEmpty().trim(),
        body('phone').custom(async (value, {req}) => {
            if (req.method == "POST") {
                return await docter.findOne({ where: { phone: value }, raw: true }).then(docter => {
                  if (docter) {
                    return Promise.reject('This number Already exists. Please choose another')
                  }
                })
            }
        }),
        body('email').custom(async (value, {req}) => {
            if (req.method == "POST") {
                return await docter.findOne({ where: { email: value }, raw: true }).then(docter => {
                  if (docter) {
                    return Promise.reject('This email Already exists. Please choose another')
                  }
                })
            }
        }),
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
                if (!req.body.region) {
                    return Promise.reject("Region is required")
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
                // if (!req.files.licenseBack) {
                //     return Promise.reject("Licence Back is required")
                // }
                if (!req.files.identityCardFront) {
                    return Promise.reject("Identity card Front is required")
                }
                if (!req.files.identityCardBack) {
                    return Promise.reject("Identity card Back is required")
                }
                if (!req.files.clinicLicenseFront) {
                    return Promise.reject("Clinic licence Front is required")
                }
                if (req.method === "PATCH") {
                    if (!req.files.introVideo) {
                        return Promise.reject("Intro Video is required required")
                    }
                }
            }
        }),
      ]
}