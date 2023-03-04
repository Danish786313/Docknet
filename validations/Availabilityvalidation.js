const { body, header } = require('express-validator');
const { availability } = require("../models");

exports.availabity = (req, res) => {
    return [
        body('Sunday', 'Are you Sunday in sunday').notEmpty().isBoolean().trim(),
        body('Monday', 'Are you Monday in sunday').notEmpty().isBoolean().trim(),
        body('Tuesday', 'Are you Tuesday in sunday').notEmpty().isBoolean().trim(),
        body('Wednesday', 'Are you Wednesday in sunday').notEmpty().isBoolean().trim(),
        body('Thursday', 'Are you Thursday in sunday').notEmpty().isBoolean().trim(),
        body('Friday', 'Are you Friday in sunday').notEmpty().isBoolean().trim(),
        body('Saturday', 'Are you Saturday in sunday').notEmpty().isBoolean().trim(),
        body('available', 'Availability is is Required').notEmpty().isBoolean().trim(),
        body('emergency', 'Emergency is required').notEmpty().isBoolean().trim(),
        // body("docter_id").custom(async (value, {req}) => {
        //     return await availability.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(availability => {
        //         if (availability) {
        //           return Promise.reject('You have already created availability')
        //         }
        //     })
        // })
    ]
}

exports.updateAvailability = (req, res) => {
    return [
        body('days', 'Day are require required').notEmpty().isArray().optional(),
        body('available', 'Availability is is Required').notEmpty().isBoolean().trim().optional(),
        body('emergency', 'Emergency is required').notEmpty().isBoolean().trim().optional(),
    ]
}