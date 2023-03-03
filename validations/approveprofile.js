const { query } = require('express-validator');
const { docter, patient } = require("../models");
const { Op } = require("sequelize");

exports.profileApproveValidation = (req, res) => {
    return [
        query('email', 'Email is required').notEmpty().isEmail(),
        query('email').custom(async (value, {req}) => {
            return await docter.findOne({ where: { email: value }, raw: true }).then(docter => {
              if (docter) {
                if (docter.is_aprove == true) {
                    return Promise.reject('This user is already approved.')
                }
              } else {
                Promise.reject("Email does not exist.")
              }
            })
        }),
    ]
}