const { body } = require('express-validator');
const { slottime } = require("../models");

exports.CreateSlotValidation = (req, res) => {
    return [
        body('start', 'start time required').notEmpty().isTime(),//.trim(),
        body('end', 'end time is Required').notEmpty().isTime()//.trim(),
    ]
}

exports.checkTimeValidation = (req, res) => {
    return [
        // body('slot').custom(async (value, {req}) => {
        //     return await slottime.findOne({ where: { id: req.params.slotId }, raw: true }).then(data => {
        //         let arr = JSON.parse(data.slots);
        //         for (let i = 0; i <= arr.length; i++) {
        //             if (arr[0] === value) {
        //                 Promise.reject("The time already exists.");
        //             }
        //         }
        //     })
        // }),
    ]
}