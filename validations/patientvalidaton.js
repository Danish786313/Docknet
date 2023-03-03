const { body } = require('express-validator');
const { patient } = require('../models')
const { Op } = require("sequelize")

exports.updatePatientValidation = (req, res) => {
    return [
        body('name', 'Name is Required').notEmpty().trim().optional(),
        body('phone', 'Invalid number').isLength({ min: 10, max: 10 }).trim().optional(),
        body('DOB','Invalid Date').notEmpty().isDate().trim().optional(),
        body('gender','Gender is Required').notEmpty().isIn(["Male", "Female", "Other"]).trim().optional(),
        body('email', 'Email is password required').notEmpty().isEmail().trim().optional(),
        body('phone').custom(async (value, { req }) => {
            return await patient.findOne({
                where: {
                  id: {
                    [Op.ne]: req.body.phone
                  },
                  phone: value,
                }, raw: true
              })
                .then(patient => {
                  if (patient) {
                    return Promise.reject('This number is Already Taken')
                  }
              })
            
        }).optional(),
        body('email').custom(async (value, { req }) => {
            return await patient.findOne({
                where: {
                  id: {
                    [Op.ne]: req.body.email
                  },
                  email: value,
                }, raw: true
              })
                .then(patient => {
                  if (patient) {
                    return Promise.reject('This Email is Already Taken')
                  }
              })
        }).optional(),
        body('profilePicture').custom(async (value, { req }) => {
          if (!req.file) {
            return Promise.reject("Profile picture is required.")
        }
        }).isObject().optional()
    ]
}
