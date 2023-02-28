const { body } = require('express-validator');
const { slottime } = require("../models");

exports.slots = (req, res) => {
    return [
        body('start', 'start time required').notEmpty().trim(),
        body('end', 'end time is Required').notEmpty().trim(),
        body('period', 'Password id required').notEmpty().trim(),
        // body("docter_id").custom(async (value, {req}) => {
        //     return await slottime.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(slottime => {
        //         if (slottime) {
        //           return Promise.reject('You have Already created slots.')
        //         }
        //     })
        // })
    ]
}