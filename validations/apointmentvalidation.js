const { body, query, params } = require('express-validator');
const { appointment, docter } = require("../models");

exports.apointCreateValidation = (req, res) => {
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

exports.getApointmentValidation = (req, res) => {
    return [
        query('status', 'Status is Required').notEmpty().isIn(["Cancelled", "Upcoming", "Reshedule", "Request"]).trim(),
        query('_page', '_Page is Required').notEmpty().isInt().trim(),
        query('_limit', '_limit is Required').notEmpty().isInt().trim(),
    ]
}

exports.UpdateApointmentValidation = (req, res) => {
    return [
        query('status', 'Status is Required').notEmpty().isIn(["Cancelled", "Upcoming", "Reshedule", "Request"]).trim(),
        query('ApointmentId', 'ApointmentId is Required').notEmpty().isInt().trim(),
        body('date', 'Date is Required').notEmpty().isDate().trim().optional(),
        body('time', 'Time id required').notEmpty().isTime().trim().optional(),
        query("status").custom(async (value, {req}) => {
            return await appointment.findOne({ where: { id: req.query.ApointmentId }, raw: true }).then(appointment => {
                if (appointment.status == value) {
                    return Promise.reject(`You have already added ${req.query.status} to your application`)
                }
            })
        })
    ]
}