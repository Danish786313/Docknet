const { query } = require("express-validator")

exports.getApointmentValidation = (req, res) => {
    return [
        query('startDate', 'Status is Required').notEmpty().isDate().trim(),
        query('endDate', '_Page is Required').notEmpty().isDate().trim(),
    ]
}