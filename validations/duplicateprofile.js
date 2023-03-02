const { body } = require('express-validator');
const { patient } = require('../models')

exports.createDuplicate = (req, res) => {
    return [
        body('name', 'Name is Required').notEmpty().trim(),
        body('DOB','Date of birth is Required').notEmpty().isDate().trim(),
        body('gender','Gender is Required').notEmpty().isIn(["Male", "Female", "Other"]).trim(),
        body("profilePicture").custom(async (value, {req}) => {
            if (!req.file) {
                return Promise.reject('Profile picture is required')
            }
        })
    ]
}