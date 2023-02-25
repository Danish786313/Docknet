const { body } = require('express-validator');
const { bankdetail } = require("../models");

exports.bankDetails = (req, res) => {
    return [
        body('name', 'email is Required').notEmpty().trim(),
        body('branchName', 'Password id required').notEmpty().trim(),
        body('ifscCode', 'email is Required').notEmpty().trim(),
        body('accountNo', 'Password id required').notEmpty().trim(),
        body('accountType', 'email is Required').notEmpty().trim(),
        body("docter_id").custom(async (value, {req}) => {
            return await bankdetail.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(bankdetail => {
                if (bankdetail) {
                  return Promise.reject('Bank details Already exists.')
                }
            })
        })
    ]
}