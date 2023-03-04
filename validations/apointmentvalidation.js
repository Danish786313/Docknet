const { body } = require('express-validator');
const { appointment, docter } = require("../models");

exports.apointCreate = (req, res) => {
    return [
       body("docter_id").custom(async (value, {req}) => {
            return await docter.findOne({ where: { id: value }, raw: true }).then(docter => {
                if (!docter) {
                  return Promise.reject('Docter does not exist.')
                }
            })
        }),
        body('date', 'Date is Required').notEmpty().isDate().trim(),
        body('time', 'Time id required').notEmpty().isTime().trim(),
        body('patient_name', 'Patient name is Required').notEmpty().trim(),
        body('age', 'Age id required').notEmpty().isInt().trim(),
        body('gender', 'Genader is Required').notEmpty().isIn(["Male", "Female", "Other"]).trim(),
        body('problem_desc', 'Description is required').notEmpty().isLength({ min: 0, max: 350 }).trim(),
        body('status', 'Status is Required').notEmpty().trim(),
    ]
}