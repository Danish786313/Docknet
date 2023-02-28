const { body } = require('express-validator');
const { appointment } = require("../models");

exports.apointCreate = (req, res) => {
    return [
        body('date', 'Date is Required').notEmpty().trim(),
        body('time', 'Time id required').notEmpty().trim(),
        body('patient_name', 'Patient name is Required').notEmpty().trim(),
        body('age', 'Age id required').notEmpty().trim(),
        body('gender', 'Genader is Required').notEmpty().trim(),
        body('problem_desc', 'Description is required').notEmpty().trim(),
        body('status', 'Status is Required').notEmpty().trim(),
    ]
}