const { body, header } = require('express-validator');
const { availability } = require("../models");

exports.availabity = (req, res) => {
    return [
        body('days', 'Day are require required').notEmpty().trim(),
        body('available', 'Availability is is Required').notEmpty().trim(),
        body('emergency', 'Emergency is required').notEmpty().trim(),
        body("docter_id").custom(async (value, {req}) => {
            return await availability.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(availability => {
                if (availability) {
                  return Promise.reject('You have already created availability')
                }
            })
        })
    ]
}

exports.getAvailabity = (req, res) => {
    return [
        header()
    ]
}