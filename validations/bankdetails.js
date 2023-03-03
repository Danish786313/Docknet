const { body } = require('express-validator');
const { bankdetail } = require("../models");

exports.bankDetailsValidation = (req, res) => {
    return [
        body('name', 'email is Required').notEmpty().trim(),
        body('branchName', 'Branch name is required').notEmpty().trim(),
        body('ifscCode', 'Ifsc code is Required').notEmpty().trim(),
        body('accountNo', 'Account no required').notEmpty().trim(),
        body('accountType', 'Account type is Required').notEmpty().trim(),
        body("docter_id").custom(async (value, {req}) => {
            return await bankdetail.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(bankdetail => {
                if (bankdetail) {
                  return Promise.reject('Bank details Already exists.')
                }
            })
        })
    ]
}

exports.bankDetailsUpdateValidation = (req, res) => {
    return [
        body('name', 'email is Required').notEmpty().trim().optional(),
        body('branchName', 'Branch name is required').notEmpty().trim().optional(),
        body('ifscCode', 'Ifsc code is Required').notEmpty().trim().optional(),
        body('accountNo', 'Account no required').notEmpty().trim().optional(),
        body('accountType', 'Account type is Required').notEmpty().trim().optional(),
    ]
}